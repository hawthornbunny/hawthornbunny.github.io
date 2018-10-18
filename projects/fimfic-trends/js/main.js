window.onload = initialize;

var global = {
    'colors': {
        'chart': {
            'background': '#f8f8f8',
        },
    },
    'dataSources': {
        'fimfarchive': {
            'name': 'Fimfarchive',
            'url': 'https://www.fimfiction.net/user/116950/Fimfarchive',
            'file': 'data/reduced-index.json',
        }
    },
    'elements': {
    },
    'elementIds': [
        'main',
        'chartContainer',
        'chartTypeLine',
        'chartTypeStacked',
        'infoMessage',
        'loadingMessage',
        'subtitle',
        'tagsContainer',
    ],
    'svgNamespace': 'http://www.w3.org/2000/svg',
};

/**
 * Initialize the app, load fic data, set up event handlers. This function is
 * called first after the window has loaded.
 */
function initialize() {
    // Run unit tests.
    UTIL_TESTS.test();
    test();

    // Obtain global references to relevant elements.
    for (var i=0; i < global.elementIds.length; i++) {
        var elementId = global.elementIds[i];
        global.elements[elementId] = document.querySelector('#'+elementId);
    }

    UTIL.loadFile(global.dataSources.fimfarchive.file).then(
        function(file) {
            global.data = JSON.parse(file);
            global.elements.loadingMessage.style.display = 'none';
            global.elements.tagsContainer.style.display = 'block';
            begin();
        },
        function(file) {
            console.log('Error');
        }
    );

    var showTrendsButton = document.querySelector('#showTrendsButton');
    showTrendsButton.onclick = showTrends;
}

/**
 * Analyze and process the fic data. This function is called after the fic data
 * has finished loaded.
 */
function begin() {
    var tags = global.data.tags;
    var fics = global.data.fics;

    // Update the tags collection with a little extra information that we can
    // derive from the fic data - namely, how many times each tag is used. This
    // information can help indicate to the user which tags are more popular
    // than others.
    for (var storyId in fics) {
        var ficData = fics[storyId];
        for (var i = 0; i < ficData.tags.length; i++) {
            var tagId = ficData.tags[i];
            var tagData = tags[tagId];
            if (tagData.numberOfUsages === undefined) {
                tagData.numberOfUsages = 0;
            }
            tagData.numberOfUsages++;
        }
    }

    // Get a sorted list of all tag objects.
    var options = Object.values(tags);
    options = UTIL.sortByProperties(options, ['name']);

    // Convert the tags drop-down into a selectize.js dropdown, using the tag
    // objects list to supply the data. This allows the user to select tags
    // more intuitively by typing them in.
    $('#tags').selectize(
        {
            'options': options,
            'maxItems': null,
            'persist': false,
            'closeAfterSelect': true,
            'valueField': 'id',
            'labelField': 'name',
            'searchField': 'name',
            'render': {
                'item': function (item, escapeFunc) {
                    var color = getTagColor(item.name);
                    return '<div class="tag" style="background-image: none;'
                        + 'color: rgb(0, 0, 0)">'
                        + escapeFunc(item.name)
                        + ' <span style="font-size: 0.75em;font-weight:bold">('
                        + escapeFunc(item.numberOfUsages) + ')</span></div>';
                },
                'option': function (item, escapeFunc) {
                    return '<div class="option">'
                        + escapeFunc(item.name)
                        + ' <span style="font-size: 0.75em;font-weight:bold">('
                        + escapeFunc(item.numberOfUsages) + ')</span></div>';
                }
            },
            'onChange': function (value) {
                var itemElements = $('.selectize-input').find('.tag');
                var numberOfItems = itemElements.length;
                var colors = getColorSpread(numberOfItems);
                itemElements.each(
                    function(index, item) {
                        color = colors[index];
                        item.style.backgroundColor = 'hsla(' + color.h + ', '
                            + color.s + '%, ' + color.l + '%, 0.75)';

                        item.custom = {
                            'tagColor': color,
                        };
                    }
                );
            }
        }
    );

    // Process the fic tags into time intervals (days).
    var intervalLength = 60 * 60 * 24;
    global.data.timeIntervals = groupTagsByTimeIntervals(fics, intervalLength);

    var times = Object.keys(global.data.timeIntervals);
    var beginTime = UTIL.getArrayMin(times);
    var endTime = UTIL.getArrayMax(times);
    var beginDate = new Date(beginTime * 1000);
    var endDate = new Date(endTime * 1000);
    var dateFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };

    var beginDateFormatted = beginDate.toLocaleDateString(
        'en-GB', dateFormatOptions
    );
    var endDateFormatted = endDate.toLocaleDateString(
        'en-GB', dateFormatOptions
    );

    // Add a subtitle that displays some information about the data; where it
    // came from, and the range of dates that it covers.
    global.elements.subtitle.innerHTML = 'Powered by '
        + '<a href="' + global.dataSources.fimfarchive.url + '">'
        + global.dataSources.fimfarchive.name + '</a> data ('
        + beginDateFormatted + ' \u2014 ' + endDateFormatted + ')';
}

/**
 * Controller for the "Show trends" button. This checks which type of chart the
 * user has selected before deciding what to display.
 */
function showTrends() {
    global.elements.infoMessage.style.display = 'none';
    // Get the list of selected tags (as IDs)
    var tagsSelect = $('#tags');
    var selectedTagIds = tagsSelect.val();
    
    // For consistency, sort the selected tag ids alphabetically by tag name.
    selectedTagIds.sort(
        function (tagIdA, tagIdB) {
            var tagNameA = global.data.tags[tagIdA].name;
            var tagNameB = global.data.tags[tagIdB].name;
            return tagNameA.localeCompare(tagNameB);
        }
    );

    if (selectedTagIds.length == 0) {
        global.elements.infoMessage.innerHTML
            = 'Please select at least one tag.';
        global.elements.infoMessage.style.display = 'block';
        return;
    }

    var tagCounts = global.data.timeIntervals;

    // Convert the tag counts into a collection of data series for the selected
    // tags.
    var seriesCollection = getTagSeriesCollection(selectedTagIds, tagCounts);

    // For each series, produce a corresponding cumulative series, where each
    // data-point includes the sum of all preceding data points. In the context
    // of our tag counts, this means that for each tag, we will get a series
    // representing the total number of usages of the tag up to that point in
    // time.
    var cumulativeSeriesCollection = {};
    for (var tagId in seriesCollection) {
        var series = seriesCollection[tagId];
        cumulativeSeriesCollection[tagId] = UTIL.getCumulativeSeries(series)
    }

    var chartType = undefined;
    var chartTypeElementIds = ['chartTypeLine', 'chartTypeStacked'];
    for (var i = 0; i < chartTypeElementIds.length; i++) {
        var chartTypeElementId = chartTypeElementIds[i];
        var chartTypeElement = document.querySelector(
            '#' + chartTypeElementId
        );

        if (chartTypeElement.checked) {
            chartType = chartTypeElementId;
            break;
        }
    }

    switch (chartType) {
        case 'chartTypeLine':
            showLineChart(cumulativeSeriesCollection);
            break;
        case 'chartTypeStacked':
            // Normalize all the series, such that at each point in time, the
            // combined total of all values equals 1. Or in other words, instead
            // of tag counts at each point in time, we instead get the
            // proportion of tag usage in relation to all the other selected
            // tags.
            //
            // In order to do this, we need to have data on every tag at every
            // time point; fortunately, we do, since each series has the same
            // number of time points, allowing us to map them all one-to-one.
            var normalizedSeriesCollection = UTIL.normalizeSeriesCollection(
                cumulativeSeriesCollection
            );
            
            // Query the DOM to find the ordering of the tags in the tags
            // drop-down. It's important that we retain this ordering for the
            // stacking. The tag id is stored in the `data-value` attribute on
            // each tag item element.
            var orderedTagIds = [];
            var tagItemElements = $('.selectize-input').find('.tag');
            tagItemElements.each(
                function (index, tagItemElement) {
                    orderedTagIds.push(tagItemElement.dataset.value);
                }
            );

            showStackedChart(normalizedSeriesCollection, orderedTagIds);
            break;
        default:
            throw 'Chart type not recognized';
            break;
    }
}

/**
 * Clear the chart area and draw a new line chart for the given tags.
 *
 * @param object seriesCollection
 * @param int[] tagIds
 */
function showLineChart(seriesCollection) {
    // Create an SVG to hold the chart.
    var svg = createChartSvg();

    // Create linear mapping functions to map the x- and y- domains (time and
    // count) into x- and y- ranges (pixel positions).
    //
    // Since all series should have the same time indices, we'll just take them
    // from the first series.
    var tagIds = Object.keys(seriesCollection);
    var firstSeries = seriesCollection[tagIds[0]];
    var timeLower = firstSeries[0][0];
    var timeUpper = firstSeries[firstSeries.length - 1][0];

    var allCounts = [];
    for (var tagId in seriesCollection) {
        var series = seriesCollection[tagId];
        var counts = series.map(
            function (coord) {
                return coord[1];
            }
        );
        allCounts = allCounts.concat(counts);
    }

    var countMin = UTIL.getArrayMin(allCounts);
    var countMax = UTIL.getArrayMax(allCounts);

    var svgBoundingRect = svg.getBoundingClientRect();

    var xDomainToRange = UTIL.scaleLinear(
        timeLower,
        timeUpper,
        0,
        svgBoundingRect.width
    );

    // Note that for the y-coordinate mapping, we reverse the min and max (ie.
    // 0 is the "max" value); this is because otherwise, the scales get drawn
    // with 0 at the top.
    var yDomainToRange = UTIL.scaleLinear(
        countMin,
        countMax,
        svgBoundingRect.height,
        0
    );

    // Calculate the actual coordinate values where the chart will be drawn on
    // the SVG.
    var seriesCoordsCollection = {};
    for (var tagId in seriesCollection) {
        var series = seriesCollection[tagId];
        var seriesCoords = [];
        for (var i = 0; i < series.length; i++) {
            var dataPoint = series[i];
            var x = dataPoint[0];
            var y = dataPoint[1];

            seriesCoords.push([xDomainToRange(x), yDomainToRange(y)]);
        }
        seriesCoordsCollection[tagId] = seriesCoords;
    }

    // Get the color for each series. We need to query the DOM here, since the
    // colors have already been decided while rendering the tag select dropdown;
    // in order to ensure that the colors match, we will have to take the colors
    // directly from there.
    var colors = {}; 
    var tagItemElements = $('.selectize-input').find('.tag');
    tagItemElements.each(
        function (index, tagItemElement) {
            colors[tagItemElement.dataset.value]
                = tagItemElement.custom.tagColor;
        }
    );

    // Draw the lines for each series on the chart.
    for (var i = 0; i < tagIds.length; i++) {
        var tagId = tagIds[i];
        var seriesCoords = seriesCoordsCollection[tagId];
        var pathDefinition = createPathDefinition(seriesCoords);

        // Create the path.
        var path = document.createElementNS(global.svgNamespace, 'path')
        path.setAttribute('d', pathDefinition);

        var tagName = global.data.tags[tagId].name;
        var color = colors[tagId];
        path.setAttribute('fill',  'none');
        path.setAttribute('stroke', 'hsl(' + color.h + ', ' + color.s + '%, '
            + color.l + '%)');
        path.setAttribute('stroke-width', '5');
        path.setAttribute('tag', tagName);
        var title = document.createElement('title');
        title.innerText = tagName;
        path.appendChild(title);
        svg.appendChild(path);
    }

    addYearIndicatorsToSvg(svg, timeLower, timeUpper, xDomainToRange);
}

/**
 * Clear the chart area and draw a new stacked area chart for the given tags.
 * Note that the ordering of the specified tagIds determines the order of
 * stacking.
 *
 * @param object seriesCollection
 * @param int[] tagIds
 */
function showStackedChart(seriesCollection, tagIds) {
    // Calculate a "stacked" collection of the series, where each series'
    // y-values include the sum of the y-values of series beneath them. Since we
    // already sorted the tag ids alphabetically, we use that
    // as the stack ordering.
    var stackedSeriesCollection = UTIL.stackSeriesCollection(
        seriesCollection,
        tagIds
    );

    var svg = createChartSvg();

    // Create linear mapping functions to map the x- and y- domains (time and
    // proportion) into x- and y- ranges (pixel positions). To do this, we get
    // the upper and lower bounds of time and (normalized and stacked) tag
    // counts. (If we did our calculations correctly above, all tag counts
    // should by now have an upper and lower bound of 1 and 0).
    var firstSeries = stackedSeriesCollection[tagIds[0]];
    var timeLower = firstSeries[0][0];
    var timeUpper = firstSeries[firstSeries.length - 1][0];

    var svgBoundingRect = svg.getBoundingClientRect();

    var xDomainToRange = UTIL.scaleLinear(
        timeLower,
        timeUpper,
        0,
        svgBoundingRect.width
    );

    var yDomainToRange = UTIL.scaleLinear(0, 1, svgBoundingRect.height, 0);

    var seriesCoordsCollection = {};
    for (var tagId in stackedSeriesCollection) {
        var series = stackedSeriesCollection[tagId];
        var seriesCoords = [];
        for (var i = 0; i < series.length; i++) {
            var dataPoint = series[i];
            var x = dataPoint[0];
            var y = dataPoint[1];

            seriesCoords.push([xDomainToRange(x), yDomainToRange(y)]);
        }
        seriesCoordsCollection[tagId] = seriesCoords;
    }

    var colors = {}; 
    var tagItemElements = $('.selectize-input').find('.tag');
    tagItemElements.each(
        function (index, tagItemElement) {
            colors[tagItemElement.dataset.value]
                = tagItemElement.custom.tagColor;
        }
    );

    // Draw the stacked areas on the chart. To draw filled areas for each
    // series, we compute two paths: the first for the series itself, the second
    // for the series underneath it (the "lower series"). Our filled shape is
    // then the region between these two paths.
    var lowerSeriesCoords = undefined;
    for (var i = 0; i < tagIds.length; i++) {
        var tagId = tagIds[i];
        var seriesCoords = seriesCoordsCollection[tagId];
        // For the first series, there is no lower series, so we create a fake
        // one with a constant y = 0 (ie. just a horizontal line).
        if (lowerSeriesCoords === undefined) {
            lowerSeriesCoords = [];
            for (var j = 0; j < seriesCoords.length; j++) {
                lowerSeriesCoords.push([seriesCoords[j][0], yDomainToRange(0)]);
            }
        }

        // Concatenate the series coordinates with the coordinates of the series
        // underneath it, making sure to reverse the lower set of coords so that
        // we can create a filled shape between the two paths. Then, turn this
        // into an SVG path definition string.
        var pathDefinition = createPathDefinition(
            seriesCoords.concat(lowerSeriesCoords.reverse())
        );

        // Create the path.
        var path = document.createElementNS(global.svgNamespace, 'path')
        path.setAttribute('d', pathDefinition);

        var tagName = global.data.tags[tagId].name;
        var color = colors[tagId];
        path.setAttribute('fill',  'hsla(' + color.h + ', ' + color.s + '%, '
            + color.l + '%, 0.75)');
        path.setAttribute('stroke', 'hsl(' + color.h + ', ' + color.s + '%, '
            + color.l + '%)');
        path.setAttribute('stroke-width', '1');
        path.setAttribute('tag', tagName);
        var title = document.createElement('title');
        title.innerText = tagName;
        path.appendChild(title);
        svg.appendChild(path);

        // The current series now becomes the lower series for the next one to
        // be drawn.
        lowerSeriesCoords = seriesCoords;
    }

    // Finally, we fill in the area between the uppermost series and the top of
    // the chart (where y = 1). While usually the whole height of the graph is
    // covered anyway, this is not always true; for example, two tags which
    // haven't always been present in Fimfiction since the beginning will have
    // no data for the first part of the graph, which therefore has zero height.
    // By filling in this area with a special color or pattern, we can make this
    // more evident.
    var upperPathY = yDomainToRange(1);
    var seriesEndX = seriesCoords[seriesCoords.length - 1][0];
    var seriesStartX = seriesCoords[0][0];
    var upperPathDefinition = '';
    upperPathDefinition += 'M ' + seriesEndX + ' ' + upperPathY + ' ';
    upperPathDefinition += 'L ' + seriesStartX + ' ' + upperPathY + ' ';
    for (var i = 0; i < seriesCoords.length; i++) {
        var seriesCoord = seriesCoords[i];
        var x = seriesCoord[0];
        var y = seriesCoord[1];

        upperPathDefinition += 'L ' + x + ' ' + y + ' ';
    }
    var upperPath = document.createElementNS(global.svgNamespace, 'path')
    upperPath.setAttribute('d', upperPathDefinition);
    upperPath.setAttribute('fill',  'url(#pattern-no-data)');
    upperPath.setAttribute('stroke',  'hsl(0, 0%, 0%)');
    upperPath.setAttribute('stroke-width', '1');
    svg.appendChild(upperPath);

    addYearIndicatorsToSvg(svg, timeLower, timeUpper, xDomainToRange);
}

/**
 * Add year indicators to an SVG chart. In order to do this, some pieces of
 * information must be supplied:
 *
 * - the dates at which the chart begins and ends.
 * - a routine for mapping timestamps to x-positions on the chart.
 *
 * @param DOMElement svg
 * @param int beginTime
 * @param int endTime
 * @param function xDomainToRange
 */
function addYearIndicatorsToSvg(
    svg,
    beginTime,
    endTime,
    xDomainToRange,
) {
    // Add year indicators to the chart. We already have the timestamps of each
    // end of the chart, so we just need to determine year boundaries for all
    // years in between.

    // Find out what years the chart begins and ends.
    var beginDate = new Date(beginTime * 1000);
    var endDate = new Date(endTime * 1000);

    var beginYear = beginDate.getFullYear();
    var endYear = endDate.getFullYear();

    // Find time points for January 1st of all years in between.
    var yearTimes = {};
    for (var year = beginYear + 1; year <= endYear; year++) {
        var yearDate = new Date(year + '-01-01T00:00:00');
        yearTimes[year] = yearDate.getTime() / 1000;
    }
    
    // Draw vertical indicators for each year.

    var svgBoundingRect = svg.getBoundingClientRect();
    for (var year in yearTimes) {
        var yearTime = yearTimes[year];
        var yearLineX = xDomainToRange(yearTime);
        var yearLine = document.createElementNS(global.svgNamespace, 'line');
        yearLine.setAttribute('x1', yearLineX);
        yearLine.setAttribute('y1', 0);
        yearLine.setAttribute('x2', yearLineX);
        yearLine.setAttribute('y2', svgBoundingRect.height);
        yearLine.setAttribute('stroke',  'hsla(0, 0%, 10%, 0.5)');
        yearLine.setAttribute('stroke-width', '1');
        var yearLabelBacking = document.createElementNS(
            global.svgNamespace,
            'text'
        );
        yearLabelBacking.setAttribute('x', yearLineX);
        yearLabelBacking.setAttribute('y', svgBoundingRect.height * 0.975);
        yearLabelBacking.setAttribute('text-anchor', 'middle');
        yearLabelBacking.setAttribute('stroke',  'hsla(0, 0%, 100%, 0.5)');
        yearLabelBacking.setAttribute('stroke-width', '10');
        yearLabelBacking.setAttribute('stroke-linejoin', 'round');
        yearLabelBacking.setAttribute('fill',  'hsla(0, 0%, 10%, 0.5)');
        yearLabelBacking.innerHTML = year;
        var yearLabel = document.createElementNS(global.svgNamespace, 'text');
        yearLabel.setAttribute('x', yearLineX);
        yearLabel.setAttribute('y', svgBoundingRect.height * 0.975);
        yearLabel.setAttribute('text-anchor', 'middle');
        yearLabel.setAttribute('stroke',  'hsla(0, 0%, 10%, 0.5)');
        yearLabel.setAttribute('fill',  'hsla(0, 0%, 10%, 0.5)');
        yearLabel.innerHTML = year;
        svg.appendChild(yearLine);
        svg.appendChild(yearLabelBacking);
        svg.appendChild(yearLabel);
    }
}

/**
 * Given an object containing tags grouped by story id, return an array
 * containing tags grouped by time interval.
 *
 * @param object fics
 * @param int intervalLength Time interval length, in seconds.
 * @return object
 */
function groupTagsByTimeIntervals(fics, intervalLength) {
    // Turn the fics object into an array, since we don't actually care about
    // the keys. At this point, we're not interested in what fic the tags came
    // from; only when it was published.
    var tagCollections = Object.values(fics);

    // Sort the tag collections by fic publication date.
    var tagCollections = UTIL.sortByProperties(tagCollections, ['date']);

    // Get the upper and lower bounds of the time range spanned by all fics.
    var timeLower = tagCollections[0].date;
    var timeUpper = tagCollections[tagCollections.length - 1].date;

    // Create an object to contain all time intervals (keyed by the interval's
    // start time).
    var timeIntervals = {};
    for (var t = timeLower; t < timeUpper; t += intervalLength) {
        timeIntervals[t] = {};
    }

    // Go through every tag collection and add each tag to the appropriate time
    // interval.
    for (var i = 0; i < tagCollections.length; i++) {
        var tagCollection = tagCollections[i];

        // Get the absolute time at which this tag collection appears.
        var time = tagCollection.date;

        // Get the time of this tag collection relative to the start of the time
        // range (ie. if it occurs at the very start, it has time 0).
        var relativeTime = time - timeLower;

        // Calculate the position of the interval that this tag collection is
        // in (ie. 1st, 2nd, 16th, etc.). For example, if the interval length
        // is 10 and the tag collection appears at a relative time of 27, then
        // it is in the 3rd interval. (For convenience, we're using zero-based
        // indexing, so that would actually be interval 2).
        var intervalPosition = Math.floor(relativeTime / intervalLength);

        // Calculate the start time of the tag collection's interval.
        var intervalStartTime = timeLower + (intervalPosition * intervalLength);

        // For each tag in the collection, add it to the interval. Since there
        // can be multiple tags in the same interval, we track a count of each
        // tag.
        var interval = timeIntervals[intervalStartTime];
        for (var j = 0; j < tagCollection.tags.length; j++) {
            var tag = tagCollection.tags[j];
            if (interval[tag] === undefined) {
                interval[tag] = 0;
            }
            interval[tag]++;
        }
    }
    return timeIntervals;
}

/**
 * Given a list of selected tag ids, and a collection of all tag counts grouped
 * by the time intervals they occur at, produce a collection of data series for
 * each tag. A series is an array of [x, y] data points; for our tag data, this
 * corresponds to [time, count].
 *
 * Note that the series produced by this function contain data points for every
 * time interval that the data covers, and that the data points are also in
 * chronological order. This makes it possible to compare data series directly,
 * since we can guarantee that each data point index occurs at the same
 * x-position.
 *
 * @param int[] tagIds
 * @param object tagCounts
 * @return object
 */
function getTagSeriesCollection(tagIds, tagCounts) {
    // Get an ordered list of keys for the time intervals, so that we can
    // process them in chronological order.
    var times = Object.keys(tagCounts);
    times.sort();

    // With a complete set of tag counts for all selected tags at each time
    // interval, we can now convert the data into a more digestible series form.
    // We'll produce a collection of series, one for each tag, in which each
    // series consists of an ordered list of (time, count) data points.
    var seriesCollection = {};
    for (var i = 0; i < tagIds.length; i++) {
        var tagId = tagIds[i];
        var series = [];

        for (var t = 0; t < times.length; t++) {
            var time = times[t];
            var counts = tagCounts[time];
            var count = 0;
            if (counts[tagId] !== undefined) {
                count = counts[tagId];
            }
            series.push([time, count]);
        }

        seriesCollection[tagId] = series;
    }

    return seriesCollection;
}

/**
 * Given a list of [x, y] coordinates, return an SVG path definition string for
 * the resulting path.
 *
 * @param float[][] coords
 * @return string
 */
function createPathDefinition(coords) {
    var pathDefinition = '';
    for (var i = 0; i < coords.length; i++) {
        var coord = coords[i];
        var x = coord[0];
        var y = coord[1];

        if (i === 0) {
            pathDefinition += 'M ' + x + ' ' + y + ' ';
        } else {
            pathDefinition += 'L ' + x + ' ' + y + ' ';
        }
    }

    return pathDefinition;
}

/**
 * Create an empty SVG to hold the chart. The SVG is styled to fill its
 * container, and contains some pattern definitions for special fills such as
 * areas with no data.
 *
 * @return DOMElement
 */
function createChartSvg() {
    // Create an SVG to display the trends.
    var svg = document.createElementNS(global.svgNamespace, 'svg');

    //svg.setAttribute('viewBox', '0 0 1000 10000');
    svg.style.width = '100%';
    svg.style.height = '100%';

    UTIL.emptyElement(global.elements.chartContainer);
    global.elements.chartContainer.appendChild(svg);
    global.elements.chartContainer.style.display = 'block';

    // Create the striped "no-data" pattern for use later.
    var defs = document.createElementNS(global.svgNamespace, 'defs');
    var pattern = document.createElementNS(global.svgNamespace, 'pattern');

    pattern.setAttribute('id', 'pattern-no-data');
    pattern.setAttribute('width', 20);
    pattern.setAttribute('height', 20);
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    pattern.setAttribute('patternTransform', 'rotate(45)');

    var patternFill = document.createElementNS(global.svgNamespace, 'rect');
    patternFill.setAttribute('x', 0);
    patternFill.setAttribute('y', 0);
    patternFill.setAttribute('width', 20);
    patternFill.setAttribute('height', 20);
    patternFill.setAttribute('fill', 'hsl(0, 0%, 20%)');

    var patternLine = document.createElementNS(global.svgNamespace, 'rect');
    patternLine.setAttribute('x', 0);
    patternLine.setAttribute('y', 0);
    patternLine.setAttribute('width', 4);
    patternLine.setAttribute('height', 32);
    patternLine.setAttribute('fill', 'hsl(0, 0%, 15%)');

    pattern.appendChild(patternFill);
    pattern.appendChild(patternLine);
    defs.appendChild(pattern);
    svg.appendChild(defs);

    // Fill the full SVG area with a rectangular background.
    var backgroundRect = document.createElementNS(global.svgNamespace, 'rect');
    backgroundRect.setAttribute('x', 0);
    backgroundRect.setAttribute('y', 0);
    backgroundRect.setAttribute('width', '100%');
    backgroundRect.setAttribute('height', '100%');
    backgroundRect.setAttribute('fill', global.colors.chart.background);
    svg.appendChild(backgroundRect);

    return svg;
}

/**
 * Given a tag name, return an object representing a unique color for that tag
 * name, as an HSL triplet.
 *
 * @param string tagName
 * @return object
 */
function getTagColor(tagName) {
    var color = UTIL.md5ToHsl(md5(tagName));
    color.h = Math.floor(color.h);
    color.s = Math.floor(Math.max(25, color.s));
    color.l = Math.floor(Math.max(50, color.l));
    return color;
}

/**
 * Return a spread of colors as HSL triplet objects.
 *
 * @param int numberOfColors
 * @return object[]
 */
function getColorSpread(numberOfColors) {
    var colors = [];

    for (var i = 0; i < numberOfColors; i++) {
        var c = i / numberOfColors;
        colors.push(
            {
                'h': Math.floor(360 * c),
                's': Math.floor(50 + (50 / 3) * (i % 3)),
                'l': Math.floor(50 + (50 / 3) * (i % 3)),
            }
        );
    }
    return colors;
}
