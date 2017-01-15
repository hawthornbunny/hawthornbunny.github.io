import hashlib, json, os, os.path, re, sys, time, urllib
import requests
from bs4 import BeautifulSoup

TIMESTAMPS = {
    'Started script': time.time()
}

CONFIG = {
    'protocol': 'https',
    'site_domain': 'fimfiction.net',
    'cache_dir_name': 'cache',
    'path_separator': '/',
    'punctuation_chars': [',','.','?','!',';',':','\'','"','(',')','[',']','<','>','/','-','…','—','’','“','”'],
    'fancy_char_replacements': {'’': '\'', '“': '"', '”': '"'},
    'frequency_lower_limit': 3,
    'paths': {
        'current': os.path.dirname(os.path.abspath(__file__)),
        'common_words_file': 'data/common_words.txt',
        'contractions_file': 'data/contractions.txt',
        'permitted_phrases_file': 'data/permitted_phrases.txt',
    },
    'excluded_story_ids': [],
}

PS = CONFIG['path_separator']

CONFIG['paths']['cache_dir'] = CONFIG['paths']['current']+PS+CONFIG['cache_dir_name']
CONFIG['base_url'] = CONFIG['protocol']+'://'+CONFIG['site_domain']

try:
    os.mkdir(CONFIG['paths']['cache_dir'])
except IOError:
    pass

########################################################################################################################
# FUNCTIONS
########################################################################################################################

# Fetches data for the given URL. A check is first made to see if the URL data has been cached; if it has, the cached
# version will be used, otherwise an HTTP request will be sent to the URL to retrieve the data. If `force` is `True`,
# then the cache will be bypassed and an HTTP request will always be made.
def fetch_url(url, force=False):
    cache_file_path = get_cache_file_path(url)

    if force is False and is_url_cached(url, 60*60*24):
        print_stderr('Using cached version of "'+url+'"')
        print_stderr('    ('+cache_file_path+')')
        return open(cache_file_path, 'r').read()
    
    print_stderr('Requesting data from "'+url+'"')

    # Include the `view_mature` cookie. For completeness.
    requests_cookie_jar = requests.cookies.RequestsCookieJar()
    requests_cookie_jar.set('view_mature', 'true', domain='www.fimfiction.net', path='/')
    
    response = requests.get(url, cookies=requests_cookie_jar)
    response_text = response.text

    response_text = replace_fancy_chars(response_text)

    if force is False:
        cache_file = open(cache_file_path, 'w')
        cache_file.write(response_text)
    
    return response_text

def username_escape(username):
    return '+'.join(username.split(' '))

# Return True if the given URL has been cached on the filesystem and isn't older than `expiry_age` (in seconds)
def is_url_cached(url, expiry_age=0):
    # If there's no file matching this URL's name, then it hasn't been cached.
    cache_file_path = get_cache_file_path(url)

    if os.path.exists(cache_file_path):
        cache_file_mtime = os.path.getmtime(cache_file_path)
        cache_file_age = time.time() - cache_file_mtime
        return cache_file_age < expiry_age
    return False

# Return the path of the file that `url` would be cached at.
def get_cache_file_path(url):
    cache_file_name = get_cache_file_name(url)
    cache_file_path = CONFIG['paths']['cache_dir']+PS+cache_file_name
    return cache_file_path

# Return the name of the file that `url` would be cached as.
def get_cache_file_name(url):
    return hashlib.sha1(url.encode('utf-8')).hexdigest()

# Return True if a string has at least one alphabetic character in it.
def has_prose(string):
    prose_regex = '[a-zA-Z]'
    prose_match = re.search(prose_regex, string)
    if prose_match is None:
        return False
    return True

# Replaces "fancy" chars like decorative quotes with more regular versions.
def replace_fancy_chars(string):
    modified_string = string
    for fancy_char in CONFIG['fancy_char_replacements']:
        if fancy_char not in modified_string:
            continue
        modified_string = modified_string.replace(fancy_char, CONFIG['fancy_char_replacements'][fancy_char])
    return modified_string
    
def get_phrase_frequencies(word_list, phrase_length):
    phrase_frequencies = {}

    for i in range(len(stories_words) - phrase_length - 1):
        phrase_words = word_list[i:i+phrase_length]
        phrase = ' '.join(phrase_words)
        if phrase not in phrase_frequencies:
            phrase_frequencies[phrase] = 0
        phrase_frequencies[phrase] += 1

    return phrase_frequencies
    
def print_stderr(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)

########################################################################################################################

# Fetch the profile page for the given user, and from it, obtain the URL of their stories page.
username = sys.argv[1]
user_profile_url = CONFIG['base_url']+'/user/'+username_escape(username)
user_profile_html = fetch_url(user_profile_url)

soup = BeautifulSoup(user_profile_html, 'html.parser')
stories_page_link = soup.find(class_='tab-stories').find('a')
stories_page_url = CONFIG['base_url']+stories_page_link['href']
stories_page_html = fetch_url(stories_page_url)

# From the stories page, fetch all text download links for all stories on the page.
story_download_urls = []
while True:
    soup = BeautifulSoup(stories_page_html, 'html.parser')
    for chapters_uls in soup(class_='chapters'):
        story_download_urls.append(CONFIG['base_url']+chapters_uls.find(class_='bottom').find(title='Download Story (.txt)')['href'])

    # Check the navigation at the bottom to see if there's a "▶" button, which indicates a next page of stories. If
    # there is, get the URL of the next page, and fetch that.
    next_stories_page_link = soup.find(class_='page_list').find('ul').find('a', string='▶')
    if next_stories_page_link:
        next_stories_page_url = CONFIG['base_url']+next_stories_page_link['href']
        print_stderr('Checking next stories page:')
        print_stderr('    ('+next_stories_page_url+')')
        stories_page_html = fetch_url(next_stories_page_url)
    else:
        break

print_stderr('Found '+str(len(story_download_urls))+' story download URLs.')

# If any `excluded_story_ids` have been specified, exclude them from being fetched. We identify the story id by checking
# the end of the download URL.
if 'excluded_story_ids' in CONFIG and len(CONFIG['excluded_story_ids']) > 0:
    filtered_story_download_urls = []
    excluded_story_download_urls = []
    for story_download_url in story_download_urls:
        is_story_excluded = False 
        for excluded_story_id in CONFIG['excluded_story_ids']:
            if re.search(r'\?story={}$'.format(excluded_story_id), story_download_url):
                is_story_excluded = True
                print_stderr('Story id {} was excluded and will not be fetched.'.format(excluded_story_id))
                excluded_story_download_urls.append(story_download_url)
                break
        if not is_story_excluded:
            filtered_story_download_urls.append(story_download_url)
    story_download_urls = filtered_story_download_urls

# Fetch all text data from all story download URLs obtained.
print_stderr('Fetching stories text...')
stories_text = ''
for story_download_url in story_download_urls:
    stories_text += fetch_url(story_download_url)

# One pre-processing step: Remove any lines that contain a string like "//------------------------------//". These are
# story title/chapter headings and are not part of the stories.

print_stderr('Removing headings...')
stories_text = '\n'.join([line for line in stories_text.split('\n') if not re.search(r'//-+//', line)])

# Obtain lists of common words and contractions that we intend to ignore in our results.
common_words_file = open(CONFIG['paths']['common_words_file'], 'r')
common_words = [line.strip().lower() for line in common_words_file]
contractions_file = open(CONFIG['paths']['contractions_file'], 'r')
contractions = [line.strip().lower() for line in contractions_file]

ignored_words = common_words + contractions

# Account for permitted phrases - these are words/phrases that may be common, but which we've verified as being
# appropriate to include in results. (This prevents some common words from being lost, like "Diamond", which is the name
# of a significant character).
permitted_phrases_file = open(CONFIG['paths']['permitted_phrases_file'], 'r')
permitted_phrases = [line.strip().lower() for line in permitted_phrases_file]

# Permitted phrases may have more than one word (eg. "Nightmare Moon"). We'd like to be able to account for all words in
# the phrase, rather than just the whole phrase, so we'll split it.
permitted_words = []
for permitted_phrase in permitted_phrases:
    permitted_phrase_words = permitted_phrase.split()
    for permitted_phrase_word in permitted_phrase_words:
        permitted_words.append(permitted_phrase_word)

# Subtract permitted words from the ignored words, so that they don't get ignored.
ignored_words = [word for word in ignored_words if word not in permitted_words]

# PROCESSING STEP
TIMESTAMPS['Started processing'] = time.time()

# Split the text data on whitespace. This will produce a list of strings, most of which we expect are either legitimate
# words, or at least contain a legitimate word once punctuation is stripped from it.
stories_strings = stories_text.split()
stories_words = []
print_stderr('Stripping punctuation and filtering out non- words...')
for stories_string in stories_strings:
    # Ignore any strings that are obviously not words.
    if not has_prose(stories_string):
        continue

    stories_word = stories_string.strip(''.join(CONFIG['punctuation_chars']))
    stories_words.append(stories_word)

original_word_count = len(stories_words)
print_stderr('Number of words (before processing): {}'.format(original_word_count))

# At this point, we can collect frequency data for multi-word phrases.
print_stderr('Compiling 2-word frequency data...')
two_word_phrase_frequencies = get_phrase_frequencies(stories_words, 2)
# Filter out any 2-word phrases that contain common words or contractions.
print_stderr('Filtering out common words in 2-word phrases...')
filtered_two_word_phrase_frequencies = {}
for phrase in two_word_phrase_frequencies:
    # If the phrase appears in full in our permitted phrases list, then this is automatically accepted.
    if phrase in permitted_phrases:
        filtered_two_word_phrase_frequencies[phrase] = two_word_phrase_frequencies[phrase]
        continue

    # Otherwise, check the phrase to see if it contains any words that we would usually ignore. If it does, disregard
    # it.
    is_common_phrase = False
    for word in phrase.split(' '):
        if word.lower() in ignored_words:
            is_common_phrase = True
            break
    if not is_common_phrase:
        filtered_two_word_phrase_frequencies[phrase] = two_word_phrase_frequencies[phrase]

two_word_phrase_frequencies = filtered_two_word_phrase_frequencies

# Now we'll collect single-word frequency data.
print_stderr('Filtering out common words...')
stories_words = [word for word in stories_words if word.lower() not in ignored_words]

# In English, the possessive suffix "'s" is very common - common enough that we're going to make it a special case. For
# any word ending in "'s", we will remove the "'s" and treat the word as if it didn't have it. In other words, we are
# considering any word ending in "'s" to be the same as that word without the "'s".
print_stderr('Removing possessive suffixes...')

modified_stories_words = []

for word in stories_words:
    if word[-2:] == "'s":
        modified_stories_words.append(word[:-2])
    else:
        modified_stories_words.append(word)

stories_words = modified_stories_words
processed_word_count = len(stories_words)
print_stderr('Number of words (after processing): {}'.format(processed_word_count))

# Obtain a dictionary of single word frequencies.
print_stderr('Compiling single-word frequency data...')
single_word_frequencies = get_phrase_frequencies(stories_words, 1)

# Merge the single-word and two-word frequencies into one dictionary.
frequencies = {}
for word in single_word_frequencies:
    frequencies[word] = single_word_frequencies[word]
for phrase in two_word_phrase_frequencies:
    frequencies[phrase] = two_word_phrase_frequencies[phrase]

# Filter out all frequencies below a specified lower limit.
filtered_frequencies = {}
for string in frequencies:
    if frequencies[string] >= CONFIG['frequency_lower_limit']:
        filtered_frequencies[string] = frequencies[string]
frequencies = filtered_frequencies

# Put the frequency data into a dictionary along with some metadata.
metadata = {
    'author': username,
    'counts': {
        'stories': len(story_download_urls),
        'words': {
            'original': original_word_count,
            'processed': processed_word_count,
        },
    },
}

output_dict = {
    'data': frequencies,
    'metadata': metadata
}

sys.stdout.write(json.dumps(output_dict))
TIMESTAMPS['Finished processing'] = time.time()
processing_time = TIMESTAMPS['Finished processing'] - TIMESTAMPS['Started processing']

print_stderr('Finished (processing took {0:.2f}s).'.format(processing_time))
