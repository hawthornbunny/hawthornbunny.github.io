# Reads the Fimfarchive index file (an index of all stories in the Fimfarchive)
# and outputs a reduced version with less information but a more manageable
# size.
#
# The Fimfarchive index file is a JSON file containing a single object which
# maps every story id to a data object. It's typically too large to read using
# Python's `json` module, so we instead read it line-by-line (each line, aside
# from the first and last, contains one key-value pair) and decode the
# individual story data objects, before reassembling them back into a reduced
# JSON object.
import datetime, json, re, sys
from index_reducer import *

INDEX_FILE_PATH = 'data/index.json'
DATETIME_FORMAT='%Y-%m-%dT%H:%M:%S+00:00'

index_file = open(INDEX_FILE_PATH, 'r')

# Reduce the index file to a less detailed form.
reducer = IndexReducer()

structure = {
    'id': {},
    'date_published': {},
    'tags': {},
}

reduced_index = reducer.reduce(index_file, structure)

# Simplify the reduced index file further to a more useful form for the web app.
# This will contain a list of all fics, their publication dates, and their tags,
# as well as a list of all tags.
simplified_index = {
    'fics': {},
    'tags': {},
}

for entry in reduced_index:
    # Ignore anything that doesn't have a publication date.
    if entry['date_published'] is None:
        continue

    # Convert the publication date to a generic timestamp.
    date_published = round(
        datetime.datetime.strptime(
            entry['date_published'],
            DATETIME_FORMAT
        ).timestamp()
    )
    
    simplified_fic_data = {
        'tags': [],
        'date': date_published,
    }

    for tag in entry['tags']:
        # Keep a list of all unique tags encountered.
        if tag['id'] not in simplified_index['tags']:
            simplified_index['tags'][tag['id']] = tag

        simplified_fic_data['tags'].append(tag['id'])

    simplified_index['fics'][entry['id']] = simplified_fic_data

json.dump(simplified_index, sys.stdout)
