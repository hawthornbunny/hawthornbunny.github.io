import json, math, re, sys

# Reads in a Fimfarchive `index.json` file and reduces it according to the given
# structure specification. This allows the very large file to be condensed to
# something that contains only the fields of interest, which can then be more
# easily consumed by other scripts.
class IndexReducer:
    def __init__(self):
        self.number_of_progress_reports = 10
        pass

    # Read a Fimfarchive index JSON file, and reduce it to a set of objects with
    # the given structure.
    def reduce(self, index_file, structure):
        total_lines = sum(1 for line in index_file)
        index_file.seek(0)

        progress_interval = math.floor(
            total_lines / self.number_of_progress_reports
        )
        lines_processed = 0

        reduced_index = []
        for line in index_file:
            if lines_processed % progress_interval == 0:
                progress_percent = (lines_processed / total_lines) * 100
                sys.stderr.write(
                    'Processing... ({}% complete)\n'.format(
                        str(math.floor(progress_percent))
                    )
                )

            # Discard the opening and closing brackets that surround the entire
            # index.
            if line.strip() == '{' or line.strip() == '}':
                lines_processed += 1
                continue

            # Unpack the line's story data.
            story_data = self.unpack_ripped_json_line(line)

            reduced_story_data = self.reduce_data(story_data, structure)
            reduced_index.append(reduced_story_data)
            lines_processed += 1

        return reduced_index

    # Given a data dict and a "structure" dict indicating keys of interest,
    # return a "reduced" dict containing only those data values.
    def reduce_data(self, data, structure):
        if not isinstance(data, dict):
            return data
        return {
            k: self.reduce_data(data[k], v)
            for (k, v) in structure.items() if k in data
        }

    # Unpack a single "JSON line" read from the index. This is not true JSON,
    # but rather, a line ripped straight out of the file, which contains a key
    # (story id) and value (JSON array of story data). The key is redundant
    # since it's already contained within the story data, so we discard it and
    # take just the data, returning it as a dictionary.
    def unpack_ripped_json_line(self, line):
        entry_json = re.sub(r'^"\d+": (.*?),?$', r'\1', line)
        entry = json.loads(entry_json)
        return entry

def test():
    reducer = IndexReducer()

    # Test reducing an empty dict with an empty structure.
    assert_equals(
        reducer.reduce_data(
            {},
            {}
        ),
        {}
    )

    # Test reducing an empty dict with a structure (nothing should happen).
    assert_equals(
        reducer.reduce_data(
            {},
            {'a': 1}
        ),
        {}
    )

    # Test reducing a dict with an empty structure (should return an empty
    # dict).
    assert_equals(
        reducer.reduce_data(
            {'a': 1},
            {},
        ),
        {}
    )

    # Test reducing a flat dict with a flat structure.
    assert_equals(
        reducer.reduce_data(
            {'a': 1},
            {'a': {}}
        ),
        {'a': 1}
    )

    # Test reducing a nested dict using a flat structure.
    assert_equals(
        reducer.reduce_data(
            {
                'a': {
                    'b': {
                        'c': 3,
                        'd': 4
                    },
                    'e': 5
                },
                'f': {
                    'g': 7,
                    'h': 8,
                },
                'i': 9,
                'j': 10,
            },
            {
                'a': {
                    'b': {
                        'c': {}
                    },
                    'e': {}
                },
                'f': {
                    'h': {}
                },
                'j': {}
            }
        ),
        {
            'a': {
                'b': {
                    'c': 3
                },
                'e': 5,
            },
            'f': {
                'h': 8,
            },
            'j': 10
        },
    )

    # Test reducing a flat dict with a nested structure. In this case, the
    # structure's 'a' dict is ignored (since the data dict actually has a value
    # there), but since the structure did specify the 'a' key, we get that back
    # in the result.
    assert_equals(
        reducer.reduce_data(
            {'a': 1},
            {
                'a': {
                    'b': {}
                }
            }
        ),
        {'a': 1}
    )

# Simple assertion function just to make formatting easier.
def assert_equals(a, b):
    assert a == b
