# Renders an SVG followers chart from JSON data.
import colorsys, datetime, json, math, svgwrite, sys

def date_to_timestamp(date):
    return datetime.datetime.strptime(date, '%Y-%m-%d %H:%M:%S').timestamp()

# Given a date, and a pair of lower/upper bounds, return a normalized figure indicating the position of that date relative to the bounds.
# Example:
#
#     # Should return approximately 0.5, since 2nd July is roughly in the middle of the year
#     normalize_date('2018-07-02 00:00:00', '2018-01-01 00:00:00', '2019-01-01 00:00:00')
#
# This method should give negative values if the date is earlier than the lower bound, and values greater than 1 if the date exceeds the upper bound.
def normalize_date(date, lower_date, upper_date):
    date_timestamp = date_to_timestamp(date)
    lower_date_timestamp = date_to_timestamp(lower_date)
    upper_date_timestamp = date_to_timestamp(upper_date)

    # Shift the timestamps so that the lower date becomes the zero value.
    date_timestamp -= lower_date_timestamp

    # Scale the timestamps so that the upper date is equal to 1.
    normalized_date = date_timestamp / (upper_date_timestamp - lower_date_timestamp)
    return normalized_date

if len(sys.argv) == 2:
    output_path = sys.argv[1]
else:
    print('python {} OUTPUT_PATH'.format(sys.argv[0]))
    sys.exit()

# Read JSON follower data from standard input and parse it into a dictionary.
data_json = sys.stdin.read()
data = json.loads(data_json)

# Convert the Fimfiction data (dates) into graph data (normalized timestamps).
lower_date = data['user']['date_joined']
upper_date = data['user']['date_last_online']

graph_data = {}
graph_data['user'] = {}
graph_data['user']['name'] = data['user']['name']
graph_data['user']['from'] = normalize_date(data['user']['date_joined'], lower_date, upper_date)
graph_data['user']['to'] = normalize_date(data['user']['date_last_online'], lower_date, upper_date)
graph_data['user']['date_joined'] = data['user']['date_joined']
graph_data['user']['date_last_online'] = data['user']['date_last_online']

graph_data['followers'] = []
for follower_data in data['followers']:
    follower_graph_data = {}
    follower_graph_data['name'] = follower_data['name']
    follower_graph_data['from'] = normalize_date(follower_data['date_joined'], lower_date, upper_date)
    follower_graph_data['to'] = normalize_date(follower_data['date_last_online'], lower_date, upper_date)
    graph_data['followers'].append(follower_graph_data)

# Convert the graph data into geometric information that can be used to draw it (at a particular size). We define the
# graph to be a rectangular area, where the top represents 0 (date joined) and the bottom represents 1 (now).

graph_size = (4000, 4000)
separation = graph_size[1] / len(graph_data['followers'])
extension = graph_size[0] * 0.05
line_thickness = separation / 2
bobble_radius = separation * 0.75

geometry = {
    'lines': {
        'dates': {
            'lower': ('Joined', 0, 0, 0, graph_size[1], 4, 'rgb(64, 64, 64)'),
            'upper': ('Now', graph_size[0], 0, graph_size[0], graph_size[1], 4, 'rgb(64, 64, 64)'),
            'years': [],
        },
        'followers': [],
    },
    'rects': {
        'followers': [],
    }
}

# Get the geometry for a list of horizontal lines indicating calendar years within the period represented by the graph.
first_year = int(graph_data['user']['date_joined'][0:4]) + 1
last_year = int(graph_data['user']['date_last_online'][0:4])

for year in range(first_year, last_year+1):
    date = '{}-01-01 00:00:00'.format(year)
    pos = normalize_date(date, lower_date, upper_date) * graph_size[1]
    line = (year, pos, 0, pos, graph_size[1], 1, 'rgb(128, 128, 128)')
    geometry['lines']['dates']['years'].append(line)

for i in range(len(graph_data['followers'])):
    datum = graph_data['followers'][i]
    hue = i / len(graph_data['followers'])
    hue += 0.5 * (i % 2)
    if hue > 1:
        hue -= 1

    lightness = 0.75
    saturation = 0.75
    r,g,b = colorsys.hls_to_rgb(hue, lightness, saturation)
    r = math.floor(r * 255)
    g = math.floor(g * 255)
    b = math.floor(b * 255)

    color = 'rgb({}, {}, {})'.format(r, g, b)

    pos = (separation / 2) + (i * separation)
    start = graph_size[0] * datum['from']
    end = graph_size[0] * datum['to']
    length = graph_size[0] * (datum['to'] - datum['from'])
    label = datum['name']
    line = (label, start, pos, end, pos, line_thickness, color)
    rect = (label, (start, pos - (separation / 2)), (length, separation), color)
    geometry['lines']['followers'].append(line)
    geometry['rects']['followers'].append(rect)


svg_size = (graph_size[0] * 1.25, graph_size[1] * 1.25)
svg = svgwrite.Drawing(output_path, size=svg_size)
svg.add(svg.rect(insert=(0, 0), size=svg_size, fill='rgb(255, 255, 255)'))
graph_group = svg.add(
    svg.g(
        class_='graph',
        transform='translate({}, {})'.format(
            (svg_size[0] - graph_size[0]) / 2,
            (svg_size[1] - graph_size[1]) / 2,
        )
    )
)

graph_group.add(
    svg.line(
        start = (geometry['lines']['dates']['lower'][1], geometry['lines']['dates']['lower'][2] - 16),
        end = (geometry['lines']['dates']['lower'][3], geometry['lines']['dates']['lower'][4]),
        stroke_width = geometry['lines']['dates']['lower'][5],
        stroke = geometry['lines']['dates']['lower'][6]
    )
)

graph_group.add(
    svg.line(
        start = (geometry['lines']['dates']['upper'][1], geometry['lines']['dates']['upper'][2] - 16),
        end = (geometry['lines']['dates']['upper'][3], geometry['lines']['dates']['upper'][4]),
        stroke_width = geometry['lines']['dates']['upper'][5],
        stroke = geometry['lines']['dates']['upper'][6]
    )
)

for line in geometry['lines']['dates']['years']:
    graph_group.add(
        svg.line(
            start = (line[1], line[2] - 16),
            end = (line[3], line[4]),
            stroke_width = line[5],
            stroke = line[6]
        )
    )

    graph_group.add(
        svg.text(line[0], (line[1], line[2] - 20), font_size='24px', text_anchor='middle', alignment_baseline='central')
    )

for rect in geometry['rects']['followers']:
    graph_group.add(
        svg.rect(
            insert = rect[1],
            size = rect[2],
            fill = rect[3]
        )
    )

for line in geometry['lines']['followers']:
    #graph_group.add(
        #svg.line(
            #start = (line[1], line[2]),
            #end = (line[3], line[4]),
            #stroke_width = line[5],
            #stroke = line[6]
        #)
    #)

    graph_group.add(
        svg.circle(
            center = (line[1], line[2]),
            r = bobble_radius,
            fill = line[6]
        )
    )

    graph_group.add(
        svg.circle(
            center = (line[3], line[4]),
            r = bobble_radius,
            fill = line[6]
        )
    )

    text_group = graph_group.add(
        svg.g(
            class_='label-'+line[0],
            transform='translate({}, {})'.format(line[3] + 16, line[4] + 4)
        )
    )

    text_group.add(
        svg.text(
            line[0],
            (0, 0),
            font_size='12px',
            text_anchor='start',
            alignment_baseline='central',
            font_family='sans-serif',
            font_weight='bold'
        )
    )

svg.save()
