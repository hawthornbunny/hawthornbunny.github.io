window.onload = initialize;

var global = {
    'elements': {
    },
    'elementIds': [
        'main',
        'chartContainer',
    ],
    'paths': {
        'reducedIndex': 'data/reduced-index.json',
    }
};

function initialize() {
    // Run unit tests.
    UTIL.tests.test();
    test();

    // Obtain global references to relevant elements.
    for (var i=0; i < global.elementIds.length; i++) {
        var elementId = global.elementIds[i];
        global.elements[elementId] = document.querySelector('#'+elementId);
    }

    UTIL.loadFile(global.paths.reducedIndex).then(
        function(file) {
            global.data = JSON.parse(file);
            begin();
        },
        function(file) {
            console.log('Error');
        }
    );

    var showTrendsButton = document.querySelector('#showTrendsButton');
    showTrendsButton.onclick = showTrends;
}

function begin() {
    var tags = global.data.tags;
    var fics = global.data.fics;

    // Get a sorted list of all tag objects.
    var options = Object.values(tags);
    options = UTIL.sortByProperties(options, ['name']);

    // Convert the tags drop-down into a selectize.js dropdown, using the tag
    // objects list to supply the data. This allows the user to select tags more
    // intuitively by typing them in.
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
                    return '<div style="background-image: none;'
                        + 'font-family: serif; font-size: 1.25em;'
                        + 'color: rgb(0, 0, 0);' + 'background-color: hsla('
                        + color.h + ', ' + color.s + '%, ' + color.l
                        + '%, 0.5)">' + escapeFunc(item.name) + '</div>';
                }
            }
        }
    );

    // Process the fic tags into time intervals (days).
    var intervalLength = 60 * 60 * 24;
    global.data.timeIntervals = groupTagsByTimeIntervals(fics, intervalLength);
}

function showTrends() {
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

    var tagCounts = global.data.timeIntervals;

    // Get an ordered list of keys for the time intervals, so that we can
    // process them in chronological order.
    var times = Object.keys(tagCounts);
    times.sort();

    // Process the collection of time intervals chronologically and produce a
    // collection of tag counts for the selected tags only. This ensures that we
    // have a count for all selected tags at every point in time, even if the
    // count is zero.
    var selectedTagCounts = {};
    for (var t = 0; t < times.length; t++) {
        var time = times[t];
        var tagCount = tagCounts[time];

        var selectedTagCount = {};
        for (var i = 0; i < selectedTagIds.length; i++) {
            var selectedTagId = selectedTagIds[i];
            if (tagCount[selectedTagId] === undefined) {
                selectedTagCount[selectedTagId] = 0;
            } else {
                selectedTagCount[selectedTagId] = tagCount[selectedTagId];
            }
        }
        selectedTagCounts[time] = selectedTagCount;
    }
    // With a complete set of tag counts for all selected tags at each time
    // interval, we can now convert the data into a more digestible series form.
    // We'll produce a collection of series, one for each tag, in which each
    // series consists of an ordered list of (time, count) data points.
    var seriesCollection = {};
    for (var i = 0; i < selectedTagIds.length; i++) {
        var selectedTagId = selectedTagIds[i];
        var series = [];

        for (var t = 0; t < times.length; t++) {
            var time = times[t];
            var selectedTagCount = selectedTagCounts[time];
            series.push([time, selectedTagCount[selectedTagId]]);
        }

        seriesCollection[selectedTagId] = series;
    }

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

    // Normalize all the series, such that at each point in time, the combined
    // total of all values equals 1. Or in other words, instead of tag counts at
    // each point in time, we instead get the proportion of tag usage in
    // relation to all the other selected tags.
    //
    // In order to do this, we need to have data on every tag at every time
    // point; fortunately, we do, since each series has the same number of time
    // points, allowing us to map them all one-to-one.
    var normalizedSeriesCollection = UTIL.normalizeSeriesCollection(
        cumulativeSeriesCollection
    );
    
    // Calculate a "stacked" collection of the series, where each series
    // y-values include the sum of the y-values of series beneath them. Since
    // we already sorted the tag ids alphabetically, we use that as the stack
    // ordering.
    var stackedSeriesCollection = UTIL.stackSeriesCollection(
        normalizedSeriesCollection,
        selectedTagIds
    );

    // Create an SVG to display the trends.
    var svgNamespace = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNamespace, 'svg');

    //svg.setAttribute('viewBox', '0 0 1000 10000');
    svg.style.width = '100%';
    svg.style.height = '100%';

    UTIL.emptyElement(global.elements.chartContainer);
    global.elements.chartContainer.appendChild(svg);
    global.elements.chartContainer.style.display = 'block';

    // Create linear mapping functions to map the x- and y- domains (time and
    // proportion) into x- and y- ranges (pixel positions). To do this, we get
    // the upper and lower bounds of time and (normalized and stacked) tag
    // counts. (If we did our calculations correctly above, all tag counts
    // should by now have an upper and lower bound of 1 and 0).
    //
    // Since all series should have the same time indices, we'll just take them
    // from the first series.
    var firstSeries = stackedSeriesCollection[selectedTagIds[0]];
    var timeLower = firstSeries[0][0];
    var timeUpper = firstSeries[firstSeries.length - 1][0];

    var svgBoundingRect = svg.getBoundingClientRect();

    var xDomainToRange = UTIL.scaleLinear(
        timeLower,
        timeUpper,
        0,
        svgBoundingRect.width
    );

    var yDomainToRange = UTIL.scaleLinear(0, 1, 0, svgBoundingRect.height);

    // Calculate the actual coordinate values where the chart will be drawn on
    // the SVG.
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

    // Draw the stacked areas on the chart. To draw filled areas for each
    // series, we compute two paths: the first for the series itself, the second
    // for the series underneath it (the "lower series"). Our filled shape is
    // then the region between these two paths.
    var lowerSeriesCoords = undefined;
    for (var i = 0; i < selectedTagIds.length; i++) {
        var selectedTagId = selectedTagIds[i];
        var seriesCoords = seriesCoordsCollection[selectedTagId];
        // For the first series, there is no lower series, so we create a fake
        // one with a constant y = 0 (ie. just a horizontal line).
        if (lowerSeriesCoords === undefined) {
            lowerSeriesCoords = [];
            for (var j = 0; j < seriesCoords.length; j++) {
                lowerSeriesCoords.push([seriesCoords[j][0], 0]);
            }
        }

        var pathDefinition = '';
        for (var j = 0; j < seriesCoords.length; j++) {
            var seriesCoord = seriesCoords[j];
            var x = seriesCoord[0];
            var y = seriesCoord[1];

            if (j === 0) {
                pathDefinition += 'M ' + x + ' ' + y + ' ';
            } else {
                pathDefinition += 'L ' + x + ' ' + y + ' ';
            }
        }

        // Reverse the lower set of coords (we're traversing the path backward,
        // so that we can create a filled shape between the two paths).
        lowerSeriesCoords = lowerSeriesCoords.reverse();

        for (var j = 0; j < lowerSeriesCoords.length; j++) {
            var lowerSeriesCoord = lowerSeriesCoords[j];
            var x = lowerSeriesCoord[0];
            var y = lowerSeriesCoord[1];

            pathDefinition += 'L ' + x + ' ' + y + ' ';
        }

        // Create the path.
        var path = document.createElementNS(svgNamespace, 'path')
        path.setAttribute('d', pathDefinition);

        var tagName = global.data.tags[selectedTagId].name;
        var color = getTagColor(tagName);
        path.setAttribute('fill',  'hsla(' + color.h + ', ' + color.s + '%, '
            + color.l + '%, ' + 0.5 + ')');
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
    var upperPath = document.createElementNS(svgNamespace, 'path')
    upperPath.setAttribute('d', upperPathDefinition);
    upperPath.setAttribute('fill',  'hsla(0, 0%, 0%, 0.75)');
    upperPath.setAttribute('stroke',  'hsla(0, 0%, 0%, 0.75)');
    upperPath.setAttribute('stroke-width', '1');
    svg.appendChild(upperPath);

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

function getTagColor(tagName) {
    var color = UTIL.md5ToHsl(md5(tagName));
    color.h = Math.floor(color.h);
    color.s = Math.floor(color.s);
    color.l = Math.floor(Math.min(75, color.l));
    return color;
}
