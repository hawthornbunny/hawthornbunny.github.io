import datetime, json, sys

DATETIME_FORMAT='%Y-%m-%dT%H:%M:%S+00:00'

def convert_date_to_timestamp(date: str) -> int:
    """Convert a date in Fimfarchive's date format to an integer timestamp."""
    timestamp = datetime.datetime.strptime(date, DATETIME_FORMAT).timestamp()
    return int(round(timestamp))

def get_index_line_json(line: str) -> str:
    """Given a line of a Fimfarchive index.json file, return the JSON string
    from that line. Note that a single line of a Fimfarchive index.json file
    is a key:value pair, ie. of the form the form `id: {...},`
    """

    first_colon = line.index(':')
    fic_id = line[:first_colon]
    fic_json = line[first_colon+1:]
    fic_json = fic_json.strip()
    fic_json = fic_json.rstrip(',')
    return fic_json

def flatten_fic_record(fic_record: list) -> list:
    """Given an object containing fic data from a line of a Fimfarchive
    index.json file, return a flat list of integers in which the first element
    is the timestamp of publication, and all other elements are the fic's tag
    ids.
    """

    flattened_fic_record = []

    timestamp = None
    if fic_record['date_published'] is not None:
        timestamp = convert_date_to_timestamp(fic_record['date_published'])

    flattened_fic_record.append(timestamp)

    for tag in fic_record['tags']:
        flattened_fic_record.append(tag['id'])

    return flattened_fic_record

if len(sys.argv) < 2:
    print(f"python {sys.argv[0]} INDEX_FILE")
    print("""
Read in a Fimfarchive index.json file and output a compact JSON file which
contains fic date and tag data, minimized as much as possible.
""")
    sys.exit()

index_file_path = sys.argv[1]

compact_index = {
    'fics': {},
    'tags': {},
}

with open(index_file_path) as file:
    for line in file:
        line = line.strip()
        if line in ['{', '}']:
            continue

        fic_json = get_index_line_json(line)
        fic_record = json.loads(fic_json)
        fic_id = fic_record['id']

        # Ignore anything that doesn't have a publication date.
        if fic_record['date_published'] is None:
            continue

        flattened_fic_record = flatten_fic_record(fic_record)
        compact_index['fics'][fic_id] = flattened_fic_record

        for tag in fic_record['tags']:
            # Keep a list of all unique tags encountered.
            if tag['id'] not in compact_index['tags']:
                compact_index['tags'][tag['id']] = tag

json.dump(compact_index, sys.stdout)
