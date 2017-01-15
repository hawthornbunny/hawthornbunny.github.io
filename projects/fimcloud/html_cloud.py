import json, math, sys

TEMPLATE_PATH = 'templates/cloud.html'
input_string = sys.stdin.read()
frequency_data = json.loads(input_string)
cloud_generator_min_weight_threshold = 10

body = ''
metadata = frequency_data['metadata']
frequencies = frequency_data['data']
sorted_strings = sorted(frequencies, key=frequencies.__getitem__, reverse=True)

js = ''
js += "produceStringCloud(\n"
js += "    document.querySelector('#container'),\n"
js += "    [\n"

for string in sorted_strings:
    js += "        {\n"
    js += "            'content': '{}',\n".format(string.replace("'", "\\'"))
    js += "            'weight': {},\n".format(frequencies[string])
    js += "        },\n"
js += "    ],\n"
js += "    {}\n".format(cloud_generator_min_weight_threshold)
js += ");\n"


html = open(TEMPLATE_PATH, 'r').read().format(metadata['author'], js)

sys.stdout.write(html)
