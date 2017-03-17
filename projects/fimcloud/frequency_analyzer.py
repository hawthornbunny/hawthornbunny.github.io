########################################################################################################################
# Fimfiction author word frequency analyzer                                                                            #
# by hawthornbunny (<https://fimfiction.net/user/hawthornbunny>)                                                       #
#                                                                                                                      #
# Usage:                                                                                                               #
#     python author_words AUTHOR_USERNAME [CONFIG_FILE_PATH]                                                           #
#                                                                                                                      #
########################################################################################################################

import argparse, json, os.path, re, sys, time
from general import print_stderr


########################################################################################################################
# CONFIGURATION
########################################################################################################################

# Default configuration. Any of these settings can be overridden by supplying an optional JSON file containing new
# definitions.
CONFIG = {
    'punctuation_chars': [',','.','?','!',';',':','\'','"','(',')','[',']','<','>','/','-','…','—','’','“','”'],
    # `frequency_lower_limit`: Strings with a frequency less than this will be omitted from the output.
    'frequency_lower_limit': 1,
    # `blacklists`: A list of paths to files that contain wordlists. Any words in those wordlists will be disregarded
    # when counting frequencies.
    'blacklists': [
        'data/blacklists/common_words.txt',
        'data/blacklists/contractions.txt'
    ],
    # `whitelists`: A list of paths to files that contain wordlists. Any words in those wordlists are considered safe
    # and will always be included in frequency counts. Whitelists override blacklists, so a word in the whitelist will
    # always be included even if it's in a blacklist.
    'whitelists': [
        'data/whitelists/permitted_phrases.txt',
    ],
    'ranges': {
        # `phrase_length`: Limits the maximum number of words in phrases that will be counted by the script. For
        # example, if `max_phrase_length` is 2, the script will count single words and two-word phrases. To count just
        # single words, use a `max_phrase_length` of 1.
        'phrase_length': {
            'min': 1,
            'max': 2,
        },
    },
    # `regex_filters`: If supplied, only strings that match these regular expressions will appear in the results. The
    # regex filters are applied sequentially.
    'regex_filters': [],
}

########################################################################################################################
# FUNCTION DEFINITIONS
########################################################################################################################

# Return True if a string has at least one alphabetic character in it.
def has_prose(string):
    prose_regex = '[a-zA-Z]'
    prose_match = re.search(prose_regex, string)
    if prose_match is None:
        return False
    return True

def get_phrase_frequencies(word_list, phrase_length):
    phrase_frequencies = {}

    for i in range(len(stories_words) - phrase_length - 1):
        phrase_words = word_list[i:i+phrase_length]
        phrase = ' '.join(phrase_words)
        if phrase not in phrase_frequencies:
            phrase_frequencies[phrase] = 0
        phrase_frequencies[phrase] += 1

    return phrase_frequencies
    
########################################################################################################################
# MAIN SCRIPT
########################################################################################################################

parser = argparse.ArgumentParser(
    description='''
Outputs a JSON-encoded object containing word frequency data for the specified Fimfiction author.

The default configuration can be optionally overridden with the `-c` option, which should be given the path to a JSON-formatted file defining an object with configuration key/value pairs.
    '''
)

parser.add_argument(
    '-c',
    '--config',
    type=str,
    help='The path to a JSON-formatted configuration file'
)

args = parser.parse_args()

config_file_path = args.config

# Record timestamps at various places in the script to provide timing information.
TIMESTAMPS = {}
TIMESTAMPS['Started script'] = time.time()

# Allow config override if a config file path is supplied.
if config_file_path is not None:
    config_file = open(config_file_path, 'r')
    config = json.loads(config_file.read())

    for setting in config:
        if setting in CONFIG:
            CONFIG[setting] = config[setting]

# Fetch all text data from all story download URLs obtained.
print_stderr('Fetching stories text...')
stories_text = sys.stdin.read()

# Read in any lists of blacklisted and whitelisted strings.
blacklisted_strings = []
for blacklist_file_path in CONFIG['blacklists']:
    blacklist_file = open(blacklist_file_path, 'r')
    blacklisted_strings += [line.strip().lower() for line in blacklist_file]

whitelisted_strings = []
for whitelist_file_path in CONFIG['whitelists']:
    whitelist_file = open(whitelist_file_path, 'r')
    whitelisted_strings += [line.strip().lower() for line in whitelist_file]

# For our purposes, we're considering all words in a given blacklisted or whitelisted string to be blacklisted or
# whitelisted too.
blacklisted_words = []
for blacklisted_string in blacklisted_strings:
    blacklisted_words += [word for word in blacklisted_string.split()]

whitelisted_words = []
for whitelisted_string in whitelisted_strings:
    whitelisted_words += [word for word in whitelisted_string.split()]

#################
# PROCESSING STEP
#################

TIMESTAMPS['Started processing'] = time.time()

# Split the text data on whitespace. By supplying a capturing group to split on, we can also capture the whitespace
# between the splits, which helps us later when we want to identify multi-word phrases.
#
# After splitting and extracting the whitespace, we should have a list of strings, most of which we expect are either
# already legitimate words, or at least contain a legitimate word once punctuation is stripped from them.
print_stderr('Extracting words...')
stories_strings = re.split('(\s)', stories_text)

stories_strings = [stories_strings[i] for i in range(len(stories_strings)) if i % 2 == 0]

# Python's `re.split` guarantees that the between-split strings (the whitespace in our case) will be the odd-indexed
# strings, and that the pieces we want will be the even-indexed strings. This is true even if the string begins with
# whitespace; in that instance, piece 0 will be the empty string.
content_strings = {i: stories_strings[i] for i in range(len(stories_strings)) if i % 2 == 0}
whitespace_strings = {i: stories_strings[i] for i in range(len(stories_strings)) if i % 2 == 1}

print_stderr('Stripping punctuation and filtering out non- words...')
stories_words = []
for stories_string in stories_strings:
    # Ignore any strings that are obviously not words.
    if not has_prose(stories_string):
        continue

    stories_word = stories_string.strip(''.join(CONFIG['punctuation_chars']))
    stories_words.append(stories_word)

original_word_count = len(stories_words)
print_stderr('Number of words (before processing): {}'.format(original_word_count))

# Compile frequency data for phrases of certain lengths. We define a "phrase" to be a sequence of words, and the
# "phrase length" to be the number of words in a phrase. Single words are still considered to be phrases (they have a
# phrase length of 1).
phrase_frequencies = {}
min_phrase_length = CONFIG['ranges']['phrase_length']['min']
max_phrase_length = CONFIG['ranges']['phrase_length']['max']

for i in range(min_phrase_length, max_phrase_length+1):
    phrase_length = i
    print_stderr('Compiling frequency data for {}-word phrases...'.format(phrase_length))
    phrase_frequencies[phrase_length] = get_phrase_frequencies(stories_words, phrase_length)
    
# For single-word phrases only, we make a special exception for the common English possessive suffix "'s". For such
# words, we consider them to be the same as their non-possessive version (eg. "Maud's" is considered the same as "Maud",
# and is counted as an instance of "Maud" in the frequency count).
if 1 in phrase_frequencies:
    print_stderr('Merging possessive single words...')
    single_word_frequencies = phrase_frequencies[1]
    possessive_word_frequencies = {}

    # Count the frequencies of all possessive words (words ending in "'s").
    for word in single_word_frequencies:
        if word[-2:] == "'s":
            possessive_word = word
            if possessive_word not in possessive_word_frequencies:
                possessive_word_frequencies[possessive_word] = 0
            possessive_word_frequencies[possessive_word] += 1

    # Merge the possessive words into their non-possessive versions, dropping the suffix but combining their frequency
    # totals.
    for possessive_word in possessive_word_frequencies:
        non_possessive_word = possessive_word[:-2]
        if non_possessive_word not in phrase_frequencies[1]:
            phrase_frequencies[1][non_possessive_word] = 0
        phrase_frequencies[1][non_possessive_word] += possessive_word_frequencies[possessive_word]
        del phrase_frequencies[1][possessive_word]
        
# Filter out blacklisted words from the results.
for phrase_length in phrase_frequencies:
    accepted_phrases = []
    for phrase in phrase_frequencies[phrase_length]:
        if phrase in whitelisted_strings:
            accepted_phrases.append(phrase)
            continue
        does_contain_blacklisted_word = False
        for word in phrase.split(' '):
            if word.lower() in blacklisted_words and word.lower() not in whitelisted_words:
                does_contain_blacklisted_word = True
                break
        if not does_contain_blacklisted_word:
            accepted_phrases.append(phrase)

    accepted_phrase_frequencies = {}
    for phrase in accepted_phrases:
        accepted_phrase_frequencies[phrase] = phrase_frequencies[phrase_length][phrase]
    phrase_frequencies[phrase_length] = accepted_phrase_frequencies
    
# Collate all the frequencies for each phrase length into a single frequencies dictionary.
print_stderr('Collating all frequencies...')
frequencies = {}
for phrase_length in phrase_frequencies:
    for phrase in phrase_frequencies[phrase_length]:
        frequencies[phrase] = phrase_frequencies[phrase_length][phrase]

# Apply regex filters, if any, to restrict the results to those that only match particular patterns.
for pattern in CONFIG['regex_filters']:
    print_stderr('Applying regex filter {} to frequency data...'.format(pattern))
    frequencies = {string: frequencies[string] for string in frequencies if re.search(pattern, string)}

# Filter out all frequencies below a specified lower limit.
print_stderr('Filtering out all frequencies lower than {}...'.format(CONFIG['frequency_lower_limit']))
filtered_frequencies = {}
for string in frequencies:
    if frequencies[string] >= CONFIG['frequency_lower_limit']:
        filtered_frequencies[string] = frequencies[string]
frequencies = filtered_frequencies

print_stderr('Packaging as JSON object...')
sys.stdout.write(json.dumps(frequencies))

TIMESTAMPS['Finished processing'] = time.time()
processing_time = TIMESTAMPS['Finished processing'] - TIMESTAMPS['Started processing']

print_stderr('Finished (processing took {0:.2f}s).'.format(processing_time))

