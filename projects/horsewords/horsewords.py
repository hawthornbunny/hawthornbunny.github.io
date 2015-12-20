# ----------------------------------------------------------------------------------------------------------------------
# Random Horsewords Generator
# Version 5(-ish)
# Author: hawthornbunny
#
# Please don't kill me knighty
#
# Example command line usage: python horsewords.py example_output.txt example_frequency_data.json 5000
# ----------------------------------------------------------------------------------------------------------------------
import sys, json
from fimfiction_functions import *
from frequency_functions import *

# The maximum length of a run of characters that we will attempt to store in the frequency tree (ie. the depth to which
# the tree goes). Longer lengths improve the predictive accuracy, but increase the size of the tree.
MAX_CHARACTER_RUN_LENGTH = 8

# The maximum length of a run of words that we will attempt to store in the tree. Words aren't currently being used in
# story generation, but we're collecting and storing their frequencies anyway.
MAX_WORD_RUN_LENGTH = 2

if len(sys.argv) < 4:
    print 'python ' + sys.argv[0] + ' <story output path> <frequency data path> <story length> [story id]'
    print """
Selects a random Fimfiction story, analyses runs of characters in the story to generate a tree of frequencies of
character sequences, and then uses that to randomly generate a new story. If an existing frequency data file is given,
the script will add new frequency data to it, which means it will become more accurate the more that data file is used.

If a story id is given, the script will use that story, instead of randomly selecting one.
"""
    sys.exit()

# Collect parameters from the command line.
story_output_path = sys.argv[1]
save_file_path = sys.argv[2]
generated_story_length = int(sys.argv[3])
story_id = None
if len(sys.argv) == 5:
    story_id = sys.argv[4]

# Try to open the frequency data file. If it doesn't exist, we'll create it.
try:
    save_file = open(save_file_path, 'r')
except IOError:
    # The save file didn't exist, so we'll create one and reopen it.
    save_file = open(save_file_path, 'w')
    save_file = open(save_file_path, 'r') 
    print 'Created new tree file "'+save_file_path+'".'

# Read the frequency JSON data from the file.
print 'Loading frequency data from file "'+save_file_path+'"...'
save_data = save_file.read()
save_file.close()
print 'Frequency data loaded (length: '+str(len(save_data))+').'

# If we actually have some JSON data, load the frequency tree from it.
# First, initialize the character and word trees to their "empty" state (a length 2 list containing a zero frequency and
# an empty dictionary).
character_frequency_tree = [0,{}]
word_frequency_tree = [0,{}]

# Construct the tree object from the JSON data.
save_data_object = {}
if len(save_data) > 0:
    print "Parsing frequency data..."
    save_data_object = json.loads(save_data)
    print "Frequency data parsed."
    if 'frequency_trees' in save_data_object:
        if 'character' in save_data_object['frequency_trees']:
            character_frequency_tree = save_data_object['frequency_trees']['character']
        if 'word' in save_data_object['frequency_trees']:
            word_frequency_tree = save_data_object['frequency_trees']['word']

# Get a list of story ids for stories that we already have frequency data for. The chance of the program selecting the
# same story twice is very slim, but if it did so, it would skew the frequencies a bit, so we want to avoid that.
existing_story_ids = []
if 'stories' in save_data_object:
    existing_story_ids = [story['id'] for story in save_data_object['stories']]

# Load the story. If the user gave a story id on the command line, we'll use that; otherwise, we'll try to load a random
# one.
unprocessed_story = None
processed_story = None

if story_id is None:
    # Load a random story (which actually has chapters, and isn't totally empty) from Fimfiction.
    while True:
        unprocessed_story = get_random_story_from_fimfiction()

        # Process the story to clean it up a bit and get useful metadata from it.
        processed_story = process_fimfiction_text_download(unprocessed_story)
        if processed_story['id'] not in existing_story_ids:
            if len(processed_story['chapters']) > 0:
                break
else:
    unprocessed_story = get_story_from_fimfiction_by_id(story_id)
    processed_story = process_fimfiction_text_download(unprocessed_story)

print 'Downloaded "'+processed_story['title']+'" by '+processed_story['author']

# The processed story is divided up into chapters, and then into paragraphs. We want to work on a corpus of continuous
# text, so we'll join all this together.
chapter_texts = []
for chapter in processed_story['chapters']:
    chapter_texts.append('\r\n\r\n'.join(chapter['paragraphs']))
processed_corpus = '\r\n\r\n'.join(chapter_texts)

# Decode and re-encode the corpus from UTF-8 to ASCII. Python's JSON module doesn't deal with UTF-8 characters very
# well, so we won't bother with them for now.
processed_corpus = processed_corpus.decode('utf-8', 'ignore')
processed_corpus = processed_corpus.encode('ascii', 'ignore')

# Use the processed corpus of the story to update the character frequency tree.
print "Updating tree with new frequency data..."
character_frequency_tree = grow_frequency_tree(character_frequency_tree, processed_corpus, MAX_CHARACTER_RUN_LENGTH)
print "Tree updated."

# Now update the word frequency tree. To do this, we'll split the corpus on whitespace into what should mostly be
# individual words.
word_frequency_tree = grow_frequency_tree(word_frequency_tree, processed_corpus.split(), MAX_WORD_RUN_LENGTH)

# Generate the story. We're only using the character frequency tree at the moment.
print "Generating story..."
generated_story = generate_text_from_character_frequency_tree(character_frequency_tree, MAX_CHARACTER_RUN_LENGTH, generated_story_length)
#print generated_story

# Pack all the story data and frequency data into the save object.
# Store some metadata about the story in the save object, so that we have a record of which stories the frequency data
# has come from.
if 'stories' not in save_data_object:
    save_data_object['stories'] = []

story_metadata = {'title':processed_story['title'],'author':processed_story['author'],'id':processed_story['id'],'url':processed_story['url']}
save_data_object['stories'].append(story_metadata)

# Save the frequency tree data.
if 'frequency_trees' not in save_data_object:
    save_data_object['frequency_trees'] = {}

save_data_object['frequency_trees']['character'] = character_frequency_tree
save_data_object['frequency_trees']['word'] = word_frequency_tree

# Write the story to an output file.
# We'll also include a listing of all stories from which frequency data is being taken.
frequency_data_story_listings = ['"'+story['title']+'" by '+story['author']+' ('+story['url']+')' for story in save_data_object['stories']]
story_output = generated_story
story_output += '\r\n'
story_output += '-'*120
story_output += '\r\n'
story_output += 'This text was generated from frequency data obtained from '+str(len(frequency_data_story_listings))+' stories:'
story_output += '\r\n'
story_output += '\r\n'.join(frequency_data_story_listings)

story_output_file = open(story_output_path, 'w')
story_output_file.write(story_output)
story_output_file.close()
print 'Generated story written to '+story_output_path

# Encode the frequency data to JSON, and output it to a file.
save_data_json = json.dumps(save_data_object, ensure_ascii=False)
save_file = open(save_file_path, 'w')
save_file.write(save_data_json)
save_file.close()
print 'Frequency data JSON saved to '+save_file_path
