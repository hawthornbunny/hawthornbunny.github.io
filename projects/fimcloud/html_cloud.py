# Given a JSON-formatted input containing frequency data, this script generates an HTML file with some embedded
# Javascript which will generate an SVG word cloud from that frequency data.
#
# The input is expected to be a JSON-formatted object containing only key-value pairs, where each property name is a
# string and each property value is the frequency of that string. For example:
#
#     {
#         "Applejack": 97,
#         "Fluttershy": 39,
#         "Pinkie": 63,
#         "Rarity": 86,
#         "Rainbow": 43,
#         "Twilight": 55,
#     }

import json, re, sys

# Path to a simple HTML template which sets up the container for the word cloud, and includes necessary Javascript
# scripts.
TEMPLATE_PATH = 'templates/cloud.html'

input_string = sys.stdin.read()
frequencies = json.loads(input_string)

sorted_strings = sorted(frequencies, key=frequencies.__getitem__, reverse=True)

js = ''
js += "produceStringCloud(\n"
js += "    document.querySelector('#container'),\n"
js += "    [\n"

for string in sorted_strings:
    # If the string contains a backslash, this needs to be escaped, otherwise javascript might interpret it as an escape
    # character.
    escaped_string = string
    escaped_string = escaped_string.replace("\\", "\\\\")
    escaped_string = escaped_string.replace("'", "\\'")
    js += "        {\n"
    js += "            'content': '{}',\n".format(escaped_string)
    js += "            'weight': {},\n".format(frequencies[string])
    js += "        },\n"
js += "    ]\n"
js += ");\n"


html = open(TEMPLATE_PATH, 'r').read().format(js)

sys.stdout.write(html)
