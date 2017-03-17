########################################################################################################################
# Fimfiction author text fetcher                                                                                       #
# by hawthornbunny (<https://fimfiction.net/user/hawthornbunny>)                                                       #
#                                                                                                                      #
# Usage:                                                                                                               #
#     python fim_grabber.py AUTHOR_USERNAME [CONFIG_FILE_PATH]                                                         #
########################################################################################################################

import argparse, json, os.path, re, sys
import requests
from bs4 import BeautifulSoup
from url_fetcher import UrlFetcher
from general import print_stderr

########################################################################################################################
# CONFIGURATION
########################################################################################################################

# Default configuration. Any of these settings can be overridden by supplying an optional JSON file containing new
# definitions.
CONFIG = {
    'protocol': 'https',
    'site_domain': 'fimfiction.net',
    'cache_dir_name': 'cache',
    'path_separator': '/',
    'paths': {
        'current': os.path.dirname(os.path.abspath(__file__)),
    },
    # `include_mature`: If True, the fetcher will supply the appropriate cookies to request mature content.
    'include_mature': True,
    # `authors`: If usernames are supplied, all stories from the given users will be fetched.
    'authors': [],
    # `stories`: If ids are supplied, stories with these ids will be fetched.
    'stories': [],
    # `excluded_story_ids`: If ids are supplied, stories with these ids will be excluded from the results (if present).
    'excluded_stories': [],
}

PS = CONFIG['path_separator']

CONFIG['paths']['cache_dir'] = CONFIG['paths']['current']+PS+CONFIG['cache_dir_name']
CONFIG['base_url'] = CONFIG['protocol']+'://'+CONFIG['site_domain']

########################################################################################################################
# FUNCTION DEFINITIONS
########################################################################################################################

# Quick and simple escape to turn a username into its URL equivalent.
def username_escape(username):
    return '+'.join(username.split(' '))

########################################################################################################################
# MAIN SCRIPT
########################################################################################################################

parser = argparse.ArgumentParser(
    description='''
Fetches and outputs a concatentation of all published stories by the specified Fimfiction author.

The default configuration can be optionally overridden by supplying the `-c` option, which should be the path to a JSON-formatted file defining an object with configuration key/value pairs.
    '''
)

parser.add_argument(
    '-a',
    '--author',
    type=str,
    help='The username of a Fimfiction author'
)
parser.add_argument(
    '-c',
    '--config',
    type=str,
    help='The path to a JSON-formatted configuration file'
)

args = parser.parse_args()

author_username = args.author
config_file_path = args.config

# If no arguments are supplied, there's nothing to do, so print the help information and exit.
if not author_username and not config_file_path:
    parser.print_help()
    sys.exit()

# Allow config override if a config file path is supplied.
if config_file_path is not None:
    config_file = open(config_file_path, 'r')
    config = json.loads(config_file.read())

    for setting in config:
        if setting in CONFIG:
            CONFIG[setting] = config[setting]

# Create the data cache directory if it doesn't exist.
try:
    os.mkdir(CONFIG['paths']['cache_dir'])
except IOError:
    pass

# Assemble the list of authors to fetch story data from (if any).
authors = []
if author_username is not None:
    authors.append(author_username)

if 'authors' in CONFIG:
    authors += CONFIG['authors']

# Assemble the list of stories to fetch data from (if any).
stories = []
if 'stories' in CONFIG:
    stories += CONFIG['stories']

# Create a UrlFetcher class which will do all the fetching for us (using a cache to prevent hammering the server)
fetcher = UrlFetcher(CONFIG['paths']['cache_dir'])

# If `include_mature` was set, Create the `view_mature` cookie to send to Fimfiction.
requests_cookie_jar = None
if 'include_mature' in CONFIG and CONFIG['include_mature'] is True:
    requests_cookie_jar = requests.cookies.RequestsCookieJar()
    requests_cookie_jar.set('view_mature', 'true', domain='www.fimfiction.net', path='/')

# For all requested authors, crawl Fimfiction to find their stories and obtain a list of story ids.
for author in authors:
    print_stderr('Grabbing stories for author "{}"...'.format(author))
    # Fetch the profile page for the given user, and from it, obtain the URL of their stories page.
    user_profile_url = CONFIG['base_url']+'/user/'+username_escape(author_username)
    user_profile_html = fetcher.fetch_url(user_profile_url, cookie_jar=requests_cookie_jar)

    soup = BeautifulSoup(user_profile_html, 'html.parser')
    stories_page_link = soup.find(class_='tab-stories').find('a')
    stories_page_url = CONFIG['base_url']+stories_page_link['href']
    stories_page_html = fetcher.fetch_url(stories_page_url, cookie_jar=requests_cookie_jar)

    author_stories = []
    # From the author's stories page, fetch all text download links for all stories on the page.
    while True:
        soup = BeautifulSoup(stories_page_html, 'html.parser')
        for chapters_uls in soup(class_='chapters'):
            story_download_url = CONFIG['base_url']+chapters_uls.find(class_='bottom').find(title='Download Story (.txt)')['href']
            # Extract the story id from the download link. We'll download it later once we've collected up all the
            # stories we intend to download.
            story_id = re.search(r'\?story=(\d+)', story_download_url)[1]
            author_stories.append(int(story_id))

        # Check the navigation at the bottom to see if there's a "▶" button, which indicates a next page of stories. If
        # there is, get the URL of the next page, and fetch that.
        next_stories_page_link = soup.find(class_='page_list').find('ul').find('a', string='▶')
        if next_stories_page_link:
            next_stories_page_url = CONFIG['base_url']+next_stories_page_link['href']
            print_stderr('Checking next stories page...')
            print_stderr('    ('+next_stories_page_url+')')
            stories_page_html = fetcher.fetch_url(next_stories_page_url, cookie_jar=requests_cookie_jar)
        else:
            break

    print_stderr('Found {} stories for author {}.'.format(str(len(author_stories)), author))

    # Add all story ids found to the stories list.
    for story_id in author_stories:
        if story_id not in stories:
            stories.append(story_id)

print_stderr('Found {} stories in total.'.format(str(len(stories))))

# If any `excluded_stories` have been specified, exclude them from the stories list.
if 'excluded_stories' in CONFIG and len(CONFIG['excluded_stories']) > 0:
    print_stderr('{} stories were excluded and will not be fetched.'.format(len(CONFIG['excluded_stories'])))
    stories = [story_id for story_id in stories if story_id not in CONFIG['excluded_stories']]

# Construct all download URLs for all stories we're going to download.
story_download_urls = [
    '{}/{}?story={}'.format(CONFIG['base_url'], 'download_story.php', story_id) for story_id in stories
]

# Fetch and concatenate all text data from all story download URLs.
print_stderr('Fetching stories text for {} stories...'.format(len(stories)))
stories_text = ''
for story_download_url in story_download_urls:
    stories_text += fetcher.fetch_url(story_download_url, cookie_jar=requests_cookie_jar)

# Post-processing: remove any lines that contain a string like "//------------------------------//". These are story
# title/chapter headings and are not part of the story text.
print_stderr('Removing headings...')
stories_text = '\n'.join([line for line in stories_text.split('\n') if not re.search(r'//-+//', line)])

print_stderr('Finished.');

sys.stdout.write(stories_text)
