# ----------------------------------------------------------------------------------------------------------------------
# Functions for obtaining story data from Fimfiction.
# ----------------------------------------------------------------------------------------------------------------------
import urllib2, random, sys, re

# Set up a few constants for the Fimfiction site.
HTTP_PROTOCOL = 'http'
FIMFICTION_HOSTNAME = 'www.fimfiction.net'
FIMFICTION_DOWNLOAD_STORY_PATH = 'download_story.php'
FIMFICTION_VIEW_STORY_PATH = 'story'
FIMFICTION_STORY_PARAM_NAME = 'story'

# Fimfiction's highest story id is currently just over 300,000.
FIMFICTION_MAX_STORY_ID = 300000

# Fimfiction might block urllib2 by default, so we'll spoof Chrome's user agent header.
FAKE_USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'

# Returns True if a string has at least one alphabetic character in it. We can use this to filter out some strings that
# are obviously not prose.
def has_prose(string):
    prose_regex = '[a-zA-Z]'
    prose_match = re.search(prose_regex, string)
    if prose_match is None:
        return False
    return True


# Given a story id, return a URL at which the story can be viewed.
def convert_story_id_to_view_url(story_id):
    story_path = FIMFICTION_VIEW_STORY_PATH+'/'+str(story_id)
    story_url = HTTP_PROTOCOL+'://'+FIMFICTION_HOSTNAME+'/'+story_path
    return story_url

# Given a story id, return a URL at which the story can be downloaded (text download).
def convert_story_id_to_download_url(story_id):
    story_path = FIMFICTION_DOWNLOAD_STORY_PATH+'?'+FIMFICTION_STORY_PARAM_NAME+'='+str(story_id)
    story_url = HTTP_PROTOCOL+'://'+FIMFICTION_HOSTNAME+'/'+story_path
    return story_url

# Open an HTTP connection to Fimfiction and retrieve the text data for the given story id.
def get_story_data_from_fimfiction_by_id(story_id):
    story_url = convert_story_id_to_download_url(story_id)
    # Attempt to retrieve data from the URL.
    print 'Connecting to '+story_url
    try:
        # We need to spoof the User Agent header, as Fimfiction seems to block urllib2.
        request = urllib2.Request(story_url, headers={'User-Agent': FAKE_USER_AGENT})
        url_object = urllib2.urlopen(request)
    except urllib2.HTTPError, e:
        print e.fp.read()

    # Read the story data. It comes from Fimfiction encoded as UTF-8.
    utf8_story_data = url_object.read()

    # We can re-encode it as cp850 if we want to display it on the command line.
    decoded_story_data = utf8_story_data.decode('utf-8')
    cp850_story_data = decoded_story_data.encode(sys.stdout.encoding, errors='replace')

    # For now, however, we'll just leave it as UTF-8.
    story_data = utf8_story_data
    return story_data
    
# Get a combined id/story data object for the given story id. This is the format preferred by the processing function
# below.
def get_story_from_fimfiction_by_id(story_id):
    story_data = get_story_data_from_fimfiction_by_id(story_id)

    return {'id':story_id,'text':story_data}

# Get a random story from Fimfiction by repeatedly trying random story IDs until a result is obtained.
def get_random_story_from_fimfiction():
    random_story = None

    # Keep trying story download URLs using random IDs until story data is obtained. (Some IDs yield no results,
    # presumably because the story was deleted or is password-protected).    
    while random_story is None or len(random_story['text']) == 0:
        # Assemble the story download URL, using a random story ID.
        random_story_id = random.randint(0, FIMFICTION_MAX_STORY_ID)
        random_story = get_story_from_fimfiction_by_id(random_story_id)

    return random_story

# Fimfiction's text downloads contain all the words we want, as well as some more information (title, author, chapter
# titles) that we'd like to extract.
# Process a fimfiction text download into a more useful form. Fimfiction's text downloads have the title, author,
# chapter information, and text embedded into them in a slightly broken way, so we'll be doing some processing on the
# text to extract all that out and package it into a more convenient object.
#
# `story` should be a dictionary containing the story id (`story['id']`) and its text (`story['text']`).
def process_fimfiction_text_download(story):
    story_id = story['id']
    text = story['text']
    # The first three lines of a Fimfiction text download are always the following:
    #
    # 1. A bar composed of text characters, like this: //------------------------------//
    # 2. A title and author line, followed directly by another bar like the one above
    # 3. An empty line.
    #
    # Example:
    #
    # //------------------------------//
    # // Story Title// by StoryAuthor//------------------------------//
    #
    #
    # It's pretty obvious that this is messed up; clearly, that second bar should be on the third line. But, we can only
    # work with the data we're given.
    #
    # The above lines are separated with newlines (\n). Note that this is not the case for the whole file.

    # Keep a copy of the original text just in case; we're going to be chopping up the text that was supplied.
    original_text = text
    processed_story = {}

    # We'll start by splitting the text on \n, and extracting the first three lines.
    text_pieces = text.split('\n')
    story_header_pieces = text_pieces[0:3]

    # Only the second of those lines contains anything of interest; the first is a bar of text characters, the third is
    # empty.
    story_header_line = story_header_pieces[1]

    # Now we'll split the story header line by //
    story_header_line_pieces = story_header_line.split('//')

    # Only the second and third pieces are relevant (the first is empty, and the rest is a text bar we can disregard).
    story_title_piece = story_header_line_pieces[1]
    story_author_piece = story_header_line_pieces[2]

    # Now a little post-processing on the title and author.
    # The title part begins with a space, so we'll just snip that off:
    story_title = story_title_piece[1:]

    # And the author part always begin with "by ", so we'll cut that off too.
    story_author = story_author_piece[4:]

    # Store the extracted title and author.
    processed_story['title'] = story_title
    processed_story['author'] = story_author

    # Store the story id, and also figure out the URL of the story from that.
    processed_story['id'] = story_id
    processed_story['url'] = convert_story_id_to_view_url(story_id)

    # Now that we're done with the story header, we can chop it off and concentrate on the rest of the story.
    text = '\n'.join(text_pieces[4:])

    # The rest of the text should be formatted in the following manner:
    # CHAPTER HEADER
    # STORY PARAGRAPHS
    # CHAPTER HEADER
    # STORY PARAGRAPHS
    # etc.

    # CHAPTER HEADER is similar to the story header:
    #
    # //------------------------------//
    # // Chapter Title//------------------------------//
    #

    # Again, you can see here that this is obviously messed up, but never mind. Like the story header, these are
    # separated by \n. Since every chapter begins with that text bar, and it's fairly unique, we'll split the whole
    # story on that to break it into chapters.

    # We'll perform stripping at the same time, as everything seems to have ugly \t characters attached to it all over
    # the place.
    text_pieces = [piece.strip() for piece in re.split(r'//-+//', text)]

    # Our collection of text pieces should now look something like the following:
    # "// Chapter 1"
    # Text of chapter 1
    # "// Chapter 2"
    # Text of chapter 2
    # etc.

    # So we're almost there! We can now iterate through this and sort everything into chapters, and we even get the
    # chapter titles if we want them.

    processed_story['chapters'] = []

    # It's possible that there may be no story after the story header, and not even any chapters. If that's the case,
    # then there's only one text piece remaining (an empty string). We can't do anything for that except return the
    # storyless story. Otherwise, we now process the text pieces into chapters.
    if len(text_pieces) > 1:
        for i in range(0, len(text_pieces), 2):
            chapter_title = text_pieces[i]

            # Because of how we split, the chapter title has "// " attached to the beginning, so we'll remove it.
            chapter_title = chapter_title[3:]

            chapter_content = text_pieces[i+1]

            # For the chapter's content, it's more useful to split up the paragraphs before storing them, so we'll do
            # that now. Chapter paragraphs can be delimited in two ways; by \n, or by \r\n.
            chapter_paragraphs = [paragraph for paragraph in chapter_content.split('\n')]

            # If the above split didn't work, try the alternative split.
            if len(chapter_paragraphs) == 1:
                chapter_paragraphs = [paragraph for paragraph in chapter_content.split('\r\n')]

            # If we still couldn't split it, we're giving up on this chapter entirely. We'll just blank it.
            if len(chapter_paragraphs) == 1:
                chapter_paragraphs = []

            # Tidy up the chapter paragraphs with some stripping of whitespace and filtering out any paragraphs that
            # don't look like prose. This will also catch the empty strings between repeated runs of paragraph
            # delimiters (eg. \n\n).
            chapter_paragraphs = [paragraph.strip() for paragraph in chapter_paragraphs if has_prose(paragraph)]

            processed_chapter = {}
            processed_chapter['title'] = chapter_title
            processed_chapter['paragraphs'] = chapter_paragraphs
            processed_story['chapters'].append(processed_chapter)
    
    return processed_story
