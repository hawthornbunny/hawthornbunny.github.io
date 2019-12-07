# Reads a reduced version of the Fimfarchive index file (an index of all stories
# in the Fimfarchive) and outputs a compact version with only the information
# required by the tag trend viewer (ie. timestamps and tags).
#
# Note that you can't just pipe the Fimfarchive `index.json` straight into this
# script; it's way too big for that. Instead, use the `jq` filter in
# `sh/jq-index-json.sh` to reduce it to a simplified array, and use that
# instead.

import datetime, json, re, sys
#from index_reducer import *

DATETIME_FORMAT='%Y-%m-%dT%H:%M:%S+00:00'

index = json.load(sys.stdin)

# Compact the reduced index file to a more useful form for the web app.
# This will contain a list of all fics, their publication dates, and their tags,
# as well as a list of all tags. Tags are a simple array of tag ids attached to
# each fic entry; a separate `tags` array maps tags ids to names.
compact_index = {
    'fics': {},
    'tags': {},
}

for entry in index:
    # Ignore anything that doesn't have a publication date.
    if entry['date_published'] is None:
        continue

    # Convert the publication date to an integer timestamp.
    date_published = round(
        datetime.datetime.strptime(
            entry['date_published'],
            DATETIME_FORMAT
        ).timestamp()
    )
    
    compact_fic_data = {
        'tags': [],
        'date': date_published,
    }

    for tag in entry['tags']:
        # Keep a list of all unique tags encountered.
        if tag['id'] not in compact_index['tags']:
            compact_index['tags'][tag['id']] = tag

        compact_fic_data['tags'].append(tag['id'])

    compact_index['fics'][entry['id']] = compact_fic_data

json.dump(compact_index, sys.stdout)
