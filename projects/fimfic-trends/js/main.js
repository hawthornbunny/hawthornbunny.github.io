var global = {
    'colors': {
        'chart': {
            'background': '#f8f8f8',
        },
    },
    'chartData': {
        'loaded': {
            'fics': undefined,
            'episodes': undefined
        },
        'derived': {
            'timeIntervals': undefined
        }
    },
    'dataSources': {
        'fimfarchive': {
            'name': 'Fimfarchive',
            'url': 'https://www.fimfiction.net/user/116950/Fimfarchive',
            'file': 'data/compact-index.json',
        }
    },
    'elements': {
    },
    'elementIds': [
        'main',
        'chartContainer',
        'chartOptionsContainer',
        'chartTypeLine',
        'chartTypeStacked',
        'infoMessage',
        'loadingMessage',
        'subtitle',
        'tagsContainer',
    ],
    'parameters': {
        'intervalLength': 60 * 60 * 24, // 1 day in seconds
        //'cacheExpiryTime': 90 * 24 * 60 * 60 * 1000, // 90 days in milliseconds
    },
    'svgNamespace': 'http://www.w3.org/2000/svg',
    'eventMarkerTags': {
        'eventFim': 'Friendship is Magic',
        'eventEqg': 'Equestria Girls',
        'eventPl': 'Pony Life',
        'eventG5': 'Generation 5',
    },
    'urls': {
        'episodesData': 'data/episode-dates.json'
    }
};

/**
 * Initialize the app, load fic data, set up event handlers. This function is
 * called first after the window has loaded.
 */
const initialize = async function initialize() {
    // Run unit tests.
    UTIL_TESTS.test();
    test();

    // Obtain global references to relevant elements.
    for (let i=0; i < global.elementIds.length; i++) {
        const elementId = global.elementIds[i];
        global.elements[elementId] = document.querySelector('#'+elementId);
    }

    // var showTrendsButton = document.querySelector('#showTrendsButton');
    // showTrendsButton.onclick = showTrends;

    const analysisTypeInputs = document.querySelectorAll(
        'input[name=analysisType]'
    );
    analysisTypeInputs.forEach(
        function (analysisTypeInput) {
            analysisTypeInput.onclick = showTrends;
        }
    );

    const periodInputs = document.querySelectorAll('input[name=period]');
    periodInputs.forEach(
        function (periodInput) {
            periodInput.onclick = showTrends;
        }
    );

    /*
    const chartTypeInputs = document.querySelectorAll('input[name=chartType]');
    chartTypeInputs.forEach(
        chartTypeInput => {
            chartTypeInput.onclick = showTrends;
        }
    );
    */

    const eventMarkerCheckboxes = document.querySelectorAll(
        '#eventMarkers > input'
    );

    console.log(eventMarkerCheckboxes);
    eventMarkerCheckboxes.forEach(
        eventMarkerCheckbox => {
            eventMarkerCheckbox.onclick = showTrends;
        }
    );

    // Add a simple loading progress message.
    const progressFunc = function(progressEvent) {
        const progress = Math.floor(
            (progressEvent.loaded / progressEvent.total) * 100
        );
        global.elements.loadingMessage.innerHTML
            = `Loading fic data (<strong>${progress}%</strong>)`;
    };

    UTIL.loadUrl(global.dataSources.fimfarchive.file, progressFunc).then(
        fileJson => {
            global.chartData.fics = JSON.parse(fileJson);

            global.elements.loadingMessage.style.display = 'none';
            global.elements.tagsContainer.style.display = 'block';
            global.elements.chartOptionsContainer.style.display = 'block';

            start();
        },
        fileJson => {
            console.log('Error');
        }
    );

    const episodesData = await fetchEpisodesData();
    global.chartData.episodes = episodesData;
};

const fetchEpisodesData = async function fetchEpisodesData() {
    return await fetch(global.urls.episodesData).then(response => response.json());
};

/**
 * Analyze and process the fic data. This function is called after the fic data
 * has finished loading.
 */
const start = function start() {
    const tags = global.chartData.fics.tags;
    const fics = global.chartData.fics.fics;

    // Update the tags collection with a little extra information that we can
    // derive from the fic data - namely, how many times each tag is used. This
    // information can help indicate to the user which tags are more popular
    // than others.
    for (let storyId in fics) {
        const ficData = fics[storyId];
        for (var i = 0; i < ficData.tags.length; i++) {
            const tagId = ficData.tags[i];
            const tagData = tags[tagId];
            if (tagData.numberOfUsages === undefined) {
                tagData.numberOfUsages = 0;
            }
            tagData.numberOfUsages++;
        }
    }

    // Get a sorted list of all tag objects.
    let options = Object.values(tags);
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
                    const color = getTagColor(item.name);
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
                const itemElements = $('.selectize-input').find('.tag');
                const numberOfItems = itemElements.length;
                const colors = getColorSpread(numberOfItems);
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

                showTrends();
            }
        }
    );

    // Process the fic tags into time intervals (days), such that for each day
    // of Fimfiction's life, we have a list of counts of all tags used on that
    // day. (As of 2021, I don't think that there has ever been a day on
    // Fimfiction without at least one fic being published, so there must be at
    // least one tag count for every day - although we are not assuming that's
    // the case).
    global.chartData.timeIntervals = groupTagsByTimeIntervals(
        fics,
        global.parameters.intervalLength
    );

    // Add a subtitle that displays some information about the data; where it
    // came from, and the range of dates that it covers.
    const times = Object.keys(global.chartData.timeIntervals);
    const beginTime = UTIL.getArrayMin(times);
    const endTime = UTIL.getArrayMax(times);
    const beginDate = new Date(beginTime * 1000);
    const endDate = new Date(endTime * 1000);
    const dateFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };

    const beginDateFormatted = beginDate.toLocaleDateString(
        'en-GB', dateFormatOptions
    );
    const endDateFormatted = endDate.toLocaleDateString(
        'en-GB', dateFormatOptions
    );

    global.elements.subtitle.innerHTML = 'Powered by '
        + '<a href="' + global.dataSources.fimfarchive.url + '"'
        + ' target="_blank">'
        + global.dataSources.fimfarchive.name + '</a> data ('
        + beginDateFormatted + ' \u2014 ' + endDateFormatted + ')';
    showEmptyChart();
}

/**
 * Clear the current chart and generate and display a new one, based on the
 * options selected by the user.
 */
const showTrends = function showTrends() {
    global.elements.infoMessage.style.display = 'none';

    // Get the list of selected tags (as ids)
    const tagsSelect = $('#tags');
    const selectedTagIds = tagsSelect.val();
    
    // For consistency, sort the selected tag ids alphabetically by tag name.
    selectedTagIds.sort(
        function (tagIdA, tagIdB) {
            const tagNameA = global.chartData.fics.tags[tagIdA].name;
            const tagNameB = global.chartData.fics.tags[tagIdB].name;
            return tagNameA.localeCompare(tagNameB);
        }
    );

    // If no tags were selected, show the default empty chart.
    if (selectedTagIds.length == 0) {
        showEmptyChart();
        return;
    }

    const tagCounts = global.chartData.timeIntervals;

    // Convert the tag counts into a collection of data series for the selected
    // tags.
    const seriesCollection = getTagSeriesCollection(selectedTagIds, tagCounts);

    // Get a list of episodes (or just timeline events, really, but we're
    // calling them episodes) to display as vertical lines on the chart, to
    // provide historical points of reference.

    const eventMarkerCheckboxes = document.querySelectorAll(
        '#eventMarkers > input'
    );

    const selectedEventTags = [];

    eventMarkerCheckboxes.forEach(
        eventMarkerCheckbox => {
            if (eventMarkerCheckbox.checked) {
                const tag = global.eventMarkerTags[eventMarkerCheckbox.name];
                selectedEventTags.push(tag);
            }
        }
    );
    let episodes = global.chartData.episodes;
    episodes = episodes.filter(
        episode => {
            const tags = episode.tags;
            if (tags === undefined) {
                return false;
            }

            const matchingSelectedTags = tags.filter(
                tag => selectedEventTags.includes(tag)
            ); 

            return matchingSelectedTags.length > 0;
        }
    );

    // Get the selected chart type.
//    var chartType = undefined;
//    var chartTypeInputs = document.querySelectorAll('input[name=chartType]');
//    for (var i = 0; i < chartTypeInputs.length; i++) {
//        var chartTypeInput = chartTypeInputs[i];
//        if (chartTypeInput.checked) {
//            chartType = chartTypeInput.dataset.value;
//            break;
//        }
//    }

    // Get the selected analysis type. There are currently 3 types: rolling
    // total, rolling average, and rolling average derivative.
    // 2022-06-04 - Rolling average and derivative are disabled.
    let analysisType = undefined;
    analysisType = 'rollingTotal';
    /*
    const inputs = document.querySelectorAll('input[name=analysisType]');
    for (var i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        if (input.checked) {
            analysisType = input.dataset.value;
            if (analysisType === null) {
                analysisType = undefined;
            }
            break;
        }
    }
    */

    // Get the selected "period" (equivalent to the cumulative cutoff).
    let period = undefined;
    const periodInputs = document.querySelectorAll('input[name=period]');
    for (var i = 0; i < periodInputs.length; i++) {
        const periodInput = periodInputs[i];
        if (periodInput.checked) {
            period = periodInput.dataset.value;
            if (period === null) {
                period = undefined;
            }
            break;
        }
    }

    // Show the selected chart.
//    switch (chartType) {
//        case 'line':
//            showLineChart(seriesCollection, period);
//            break;
//        case 'stacked':
//            showStackedChart(seriesCollection, period);
//            break;
//        default:
//            throw 'Chart type not recognized';
//            break;
//    }

    if (!period) {
        const tagIds = Object.keys(seriesCollection);
        const firstSeries = seriesCollection[tagIds[0]];
        period = firstSeries.length;
    }

    switch (analysisType) {
        case 'rollingTotal':
            const rollingTotalSeriesCollection = {};
            for (let tagId in seriesCollection) {
                const series = seriesCollection[tagId];
                rollingTotalSeriesCollection[tagId] = getRollingTotalSeries(
                    series,
                    period
                );
            }

            showLineChart(rollingTotalSeriesCollection, period, episodes);
            break;
/*
        case 'rollingAverage':
            const rollingAverageSeriesCollection = {};
            for (let tagId in seriesCollection) {
                const series = seriesCollection[tagId];
                rollingAverageSeriesCollection[tagId] = getRollingAverageSeries(
                    series,
                    period
                );
                //console.log(series);
                //console.log(rollingAverageSeriesCollection[tagId]);
            }

            showLineChart(rollingAverageSeriesCollection, period, episodes);
            break;
        case 'rollingAverageDerivative':
            const rollingAverageDerivativeSeriesCollection = {};
            for (let tagId in seriesCollection) {
                const series = seriesCollection[tagId];
                const rollingAverageSeries = getRollingAverageSeries(series, period);
                rollingAverageDerivativeSeriesCollection[tagId] = getDerivativeSeries(rollingAverageSeries);
            }
            showLineChart(rollingAverageDerivativeSeriesCollection, period, episodes);
            break;
*/
    }
}

/**
 * Show an empty chart, for when there's no tag data to display.
 */
const showEmptyChart = function showEmptyChart() {
    const svg = createChartSvg();
    const svgBoundingRect = svg.getBoundingClientRect();

    const message = document.createElementNS(global.svgNamespace, 'text');
    message.setAttribute('x', svgBoundingRect.width / 2);
    message.setAttribute('y', svgBoundingRect.height / 2);
    message.setAttribute('font-size', '2em');
    message.setAttribute('text-anchor', 'middle');
    //message.setAttribute('stroke',  'hsla(0, 0%, 10%, 0.25)');
    message.setAttribute('fill',  'hsla(0, 0%, 10%, 0.25)');
    message.innerHTML = 'No tags selected';
    svg.appendChild(message);
}

/**
 * Given a collection of data series, clear the chart area and draw a new line
 * chart of those series, showing the cumulative number of fics at each time
 * interval.
 *
 * If `cutoff` is given, then the graph will use a cutoff when calculating the
 * cumulative value at each time interval, and will only show the cumulative
 * total of all fics within a given period. For example, if period is 30, then
 * each time interval will show the number of fics containing each tag within
 * the last 30 days. This allows the user to see more transient, short-term
 * trends.
 *
 * @param object seriesCollection
 * @param int cutoff
 * @param int[] tagIds
 */
const showLineChart = function showLineChart(seriesCollection, cutoff, episodes) {
    // For each series, produce a corresponding cumulative series, where each
    // data-point includes the sum of all preceding data points. In the context
    // of our tag counts, this means that for each tag, we will get a series
    // representing the total number of usages of the tag up to that point in
    // time.
//    const cumulativeSeriesCollection = {};
//    for (let tagId in seriesCollection) {
//        const series = seriesCollection[tagId];
//        cumulativeSeriesCollection[tagId] = UTIL.getCumulativeSeries(
//            series,
//            cutoff
//        );
//    }

    // Create an SVG to hold the chart.
    const svg = createChartSvg();

    // Create linear mapping functions to map the x- and y- domains (time and
    // count) into x- and y- ranges (pixel positions).
    //
    // Since all series should have the same time indices, we'll just take them
    // from the first series.
    const tagIds = Object.keys(seriesCollection);
    const firstSeries = seriesCollection[tagIds[0]];
    const timeLower = firstSeries[0][0];
    const timeUpper = firstSeries[firstSeries.length - 1][0];

    // Get a list of all count values for every timestamp and for every series
    // in the collection.
    let allCounts = [];
    for (const tagId in seriesCollection) {
        const series = seriesCollection[tagId];
        const counts = series.map(
            function (coord) {
                return coord[1];
            }
        );
        allCounts = allCounts.concat(counts);
    }

    // Get the largest count value (ie. the highest y-value that we will need to
    // display on the chart).
    //const countMin = UTIL.getArrayMin(allCounts);
    const countMin = 0;
    const countMax = UTIL.getArrayMax(allCounts);

    const svgBoundingRect = svg.getBoundingClientRect();

    const xDomainToRange = UTIL.scaleLinear(
        timeLower,
        timeUpper,
        0,
        svgBoundingRect.width
    );

    // Note that for the y-coordinate mapping, we reverse the min and max (ie.
    // 0 is the "max" value); this is because otherwise, the scales get drawn
    // with 0 at the top.
    const yDomainToRange = UTIL.scaleLinear(
        countMin,
        countMax,
        svgBoundingRect.height,
        0
    );

    // Calculate the actual coordinate values where the chart will be drawn on
    // the SVG.
    const seriesCoordsCollection = {};
    for (let tagId in seriesCollection) {
        const series = seriesCollection[tagId];
        const seriesCoords = [];
        for (let i = 0; i < series.length; i++) {
            const dataPoint = series[i];
            const x = dataPoint[0];
            const y = dataPoint[1];

            seriesCoords.push([xDomainToRange(x), yDomainToRange(y)]);
        }
        seriesCoordsCollection[tagId] = seriesCoords;
    }

    // Get the color for each series. We need to query the DOM here, since the
    // colors have already been decided while rendering the tag select dropdown;
    // in order to ensure that the colors match, we will have to take the colors
    // directly from there.
    const colors = {}; 
    const tagItemElements = $('.selectize-input').find('.tag');
    tagItemElements.each(
        function (index, tagItemElement) {
            colors[tagItemElement.dataset.value]
                = tagItemElement.custom.tagColor;
        }
    );

    // Draw the lines for each series on the chart.
    for (let i = 0; i < tagIds.length; i++) {
        const tagId = tagIds[i];
        const seriesCoords = seriesCoordsCollection[tagId];
        const pathDefinition = createPathDefinition(seriesCoords);

        // Create the path.
        const path = document.createElementNS(global.svgNamespace, 'path')
        path.setAttribute('d', pathDefinition);

        const tagName = global.chartData.fics.tags[tagId].name;
        const color = colors[tagId];
        path.setAttribute('fill',  'none');
        path.setAttribute('stroke', 'hsl(' + color.h + ', ' + color.s + '%, '
            + color.l + '%)');
        path.setAttribute('stroke-width', '5');
        path.setAttribute('tag', tagName);

        const title = document.createElement('title');
        title.innerText = tagName;
        path.appendChild(title);
        svg.appendChild(path);
    }

    addYAxisLabelsToSvg(svg, countMin, countMax, yDomainToRange);
    addEpisodeLabelsToSvg(svg, episodes, xDomainToRange);
    addYearIndicatorsToSvg(svg, timeLower, timeUpper, xDomainToRange);
}

/**
 * Clear the chart area and draw a new stacked area chart for the given tags.
 *
 * As with the line chart, if `cutoff` is given, the cumulative totals at each
 * point will only be for a spcific number of preceding time intervals.
 *
 * @param {object} seriesCollection
 * @param {number} cutoff
 * @param {number[]} tagIds
 */
function showStackedChart(seriesCollection, cutoff) {
    // For each series, produce a corresponding cumulative series, where each
    // data-point includes the sum of all preceding data points. In the context
    // of our tag counts, this means that for each tag, we will get a series
    // representing the total number of usages of the tag up to that point in
    // time.
    const cumulativeSeriesCollection = {};
    for (var tagId in seriesCollection) {
        const series = seriesCollection[tagId];
        cumulativeSeriesCollection[tagId] = UTIL.getCumulativeSeries(
            series,
            cutoff
        );
    }

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
    let tagItemElements = $('.selectize-input').find('.tag');
    tagItemElements.each(
        function (index, tagItemElement) {
            orderedTagIds.push(tagItemElement.dataset.value);
        }
    );

    // Calculate a "stacked" collection of the series, where each series'
    // y-values include the sum of the y-values of series beneath them.
    const stackedSeriesCollection = UTIL.stackSeriesCollection(
        normalizedSeriesCollection,
        orderedTagIds
    );

    const svg = createChartSvg();

    // Create linear mapping functions to map the x- and y- domains (time and
    // proportion) into x- and y- ranges (pixel positions). To do this, we get
    // the upper and lower bounds of time and (normalized and stacked) tag
    // counts. (If we did our calculations correctly above, all tag counts
    // should by now have an upper and lower bound of 1 and 0).
    const firstSeries = stackedSeriesCollection[orderedTagIds[0]];
    const timeLower = firstSeries[0][0];
    const timeUpper = firstSeries[firstSeries.length - 1][0];

    const svgBoundingRect = svg.getBoundingClientRect();

    const xDomainToRange = UTIL.scaleLinear(
        timeLower,
        timeUpper,
        0,
        svgBoundingRect.width
    );

    const yDomainToRange = UTIL.scaleLinear(0, 1, svgBoundingRect.height, 0);

    const seriesCoordsCollection = {};
    for (let tagId in stackedSeriesCollection) {
        const series = stackedSeriesCollection[tagId];
        const seriesCoords = [];
        for (let i = 0; i < series.length; i++) {
            const dataPoint = series[i];
            const x = dataPoint[0];
            const y = dataPoint[1];

            seriesCoords.push([xDomainToRange(x), yDomainToRange(y)]);
        }
        seriesCoordsCollection[tagId] = seriesCoords;
    }

    const colors = {}; 
    tagItemElements = $('.selectize-input').find('.tag');
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
    let lowerSeriesCoords = undefined;
    for (let i = 0; i < orderedTagIds.length; i++) {
        const tagId = orderedTagIds[i];
        var seriesCoords = seriesCoordsCollection[tagId];
        // For the first series, there is no lower series, so we create a fake
        // one with a constant y = 0 (ie. just a horizontal line).
        if (lowerSeriesCoords === undefined) {
            lowerSeriesCoords = [];
            for (let j = 0; j < seriesCoords.length; j++) {
                lowerSeriesCoords.push([seriesCoords[j][0], yDomainToRange(0)]);
            }
        }

        // Concatenate the series coordinates with the coordinates of the series
        // underneath it, making sure to reverse the lower set of coords so that
        // we can create a filled shape between the two paths. Then, turn this
        // into an SVG path definition string.
        const pathDefinition = createPathDefinition(
            seriesCoords.concat(lowerSeriesCoords.reverse())
        );

        // Create the path.
        const path = document.createElementNS(global.svgNamespace, 'path')
        path.setAttribute('d', pathDefinition);

        const tagName = global.data.tags[tagId].name;
        const color = colors[tagId];
        path.setAttribute('fill',  'hsla(' + color.h + ', ' + color.s + '%, '
            + color.l + '%, 0.75)');
        path.setAttribute('stroke', 'hsl(' + color.h + ', ' + color.s + '%, '
            + color.l + '%)');
        path.setAttribute('stroke-width', '1');
        path.setAttribute('tag', tagName);
        const title = document.createElement('title');
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
    const upperPathY = yDomainToRange(1);
    const seriesEndX = seriesCoords[seriesCoords.length - 1][0];
    const seriesStartX = seriesCoords[0][0];
    let upperPathDefinition = '';
    upperPathDefinition += 'M ' + seriesEndX + ' ' + upperPathY + ' ';
    upperPathDefinition += 'L ' + seriesStartX + ' ' + upperPathY + ' ';
    for (let i = 0; i < seriesCoords.length; i++) {
        const seriesCoord = seriesCoords[i];
        const x = seriesCoord[0];
        const y = seriesCoord[1];

        upperPathDefinition += 'L ' + x + ' ' + y + ' ';
    }
    const upperPath = document.createElementNS(global.svgNamespace, 'path')
    upperPath.setAttribute('d', upperPathDefinition);
    upperPath.setAttribute('fill',  'url(#pattern-no-data)');
    upperPath.setAttribute('stroke',  'hsl(0, 0%, 0%)');
    upperPath.setAttribute('stroke-width', '1');
    svg.appendChild(upperPath);

    addYearIndicatorsToSvg(svg, timeLower, timeUpper, xDomainToRange);
}

/**
 * Add y-axis value labels to an SVG chart. This method assumes that the
 * y-values are integers. In order to add correct labels, some pieces of
 * information must be supplied:
 *
 * - the min y-value
 * - the max y-value
 * - a routine for mapping y-values to y-positions on the chart.
 *
 * @param {Element} svg
 * @param {number} beginTime
 * @param {number} endTime
 * @param {function} yDomainToRange
 */
const addYAxisLabelsToSvg = function addYAxisLabelsToSvg(
    svg,
    minYValue,
    maxYValue,
    yDomainToRange
) {
    // Figure out an appropriate granularity for the y-labels. This depends on
    // the size of the domain that needs labelling. For example, if the axis
    // goes from 0 to 5000, there's no point in labelling every 1 tick, or even
    // every 10 ticks; it would be too many.

    // As a rule, we use the order of magnitude; so in our above example, the
    // order of magnitude is between 3 and 4 (ie. between 1000 and 10000). We
    // would round that down to 3, giving us ticks that are 10^3 = 1000 units
    // apart.
    const orderOfMagnitude = Math.floor(Math.log10(maxYValue - minYValue));
    const granularity = Math.pow(10, orderOfMagnitude);

    // Draw horizontal lines for each tick.
    const svgBoundingRect = svg.getBoundingClientRect();
    for (let y = minYValue; y <= maxYValue; y += granularity) {
        const tickY = yDomainToRange(y);
        const line = document.createElementNS(global.svgNamespace, 'line');
        line.setAttribute('x1', 0);
        line.setAttribute('y1', tickY);
        line.setAttribute('x2', svgBoundingRect.width);
        line.setAttribute('y2', tickY);
        line.setAttribute('stroke',  'hsla(0, 0%, 10%, 0.25)');
        line.setAttribute('stroke-width', '1');

        const tickLabelBacking = document.createElementNS(
            global.svgNamespace,
            'text'
        );
        tickLabelBacking.setAttribute('x', 2);
        tickLabelBacking.setAttribute('y', tickY + 4);
        tickLabelBacking.setAttribute('font-size', '0.75em');
        tickLabelBacking.setAttribute('text-anchor', 'start');
        tickLabelBacking.setAttribute('stroke',  'hsla(0, 0%, 100%, 0.5)');
        tickLabelBacking.setAttribute('stroke-width', '10');
        tickLabelBacking.setAttribute('stroke-linejoin', 'round');
        tickLabelBacking.setAttribute('fill',  'hsla(0, 0%, 10%, 0.5)');
        tickLabelBacking.innerHTML = y;

        const tickLabel = document.createElementNS(global.svgNamespace, 'text');
        tickLabel.setAttribute('x', 2);
        tickLabel.setAttribute('y', tickY + 4);
        tickLabel.setAttribute('font-size', '0.75em');
        tickLabel.setAttribute('text-anchor', 'start');
        tickLabel.setAttribute('stroke',  'hsla(0, 0%, 10%, 0.5)');
        tickLabel.setAttribute('fill',  'hsla(0, 0%, 10%, 0.5)');
        tickLabel.innerHTML = y;
        svg.appendChild(line);
        svg.appendChild(tickLabelBacking);
        svg.appendChild(tickLabel);
    }
}

/**
 * Add episode labels to an SVG chart.
 *
 * @param {Element} svg
 * @param {array} episodes
 * @param {function} xDomainToRange
 */
const addEpisodeLabelsToSvg = function addEpisodeLabelsToSvg(
    svg,
    episodes,
    xDomainToRange
) {
    const svgBoundingRect = svg.getBoundingClientRect();

    episodes.forEach(
        episode => {
            const episodeDate = new Date(episode.date);
            const timestamp = episodeDate.getTime() / 1000;
            const labelX = xDomainToRange(timestamp);

            const line = document.createElementNS(global.svgNamespace, 'line');
            line.setAttribute('x1', labelX);
            line.setAttribute('y1', 0);
            line.setAttribute('x2', labelX);
            line.setAttribute('y2', svgBoundingRect.height);
            line.setAttribute('stroke',  'hsla(0, 0%, 10%, 0.75)');
            line.setAttribute('stroke-width', '1');
            line.setAttribute('stroke-dasharray', '2');

            const label = document.createElementNS(global.svgNamespace, 'text');
            //label.setAttribute('x', labelX + 2);
            //label.setAttribute('y', 4);
            label.setAttribute('font-size', '0.75em');
            label.setAttribute('text-anchor', 'start');
            label.setAttribute('stroke',  'hsla(0, 0%, 10%, 0.5)');
            label.setAttribute('fill',  'hsla(0, 0%, 10%, 0.5)');
            label.setAttribute('transform',  `translate(${labelX + 2}, 4) rotate(90)`);
            label.innerHTML = episode.title;
            svg.appendChild(line);
            svg.appendChild(label);
        }
    );
}

/**
 * Add year indicators to an SVG chart. In order to do this, some pieces of
 * information must be supplied:
 *
 * - the dates at which the chart begins and ends.
 * - a routine for mapping timestamps to x-positions on the chart.
 *
 * @param {Element} svg
 * @param {number} beginTime
 * @param {number} endTime
 * @param {function} xDomainToRange
 */
const addYearIndicatorsToSvg = function addYearIndicatorsToSvg(
    svg,
    beginTime,
    endTime,
    xDomainToRange
) {
    // Add year indicators to the chart. We already have the timestamps of each
    // end of the chart, so we just need to determine year boundaries for all
    // years in between.

    // Find out what years the chart begins and ends.
    const beginDate = new Date(beginTime * 1000);
    const endDate = new Date(endTime * 1000);

    const beginYear = beginDate.getFullYear();
    const endYear = endDate.getFullYear();

    // Find time points for January 1st of all years in between.
    const yearTimes = {};
    for (let year = beginYear + 1; year <= endYear; year++) {
        const yearDate = new Date(year + '-01-01T00:00:00');
        yearTimes[year] = yearDate.getTime() / 1000;
    }
    
    // Draw vertical indicators for each year.

    const svgBoundingRect = svg.getBoundingClientRect();
    for (let year in yearTimes) {
        const yearTime = yearTimes[year];
        const yearLineX = xDomainToRange(yearTime);
        const yearLine = document.createElementNS(global.svgNamespace, 'line');
        yearLine.setAttribute('x1', yearLineX);
        yearLine.setAttribute('y1', 0);
        yearLine.setAttribute('x2', yearLineX);
        yearLine.setAttribute('y2', svgBoundingRect.height);
        yearLine.setAttribute('stroke',  'hsla(0, 0%, 10%, 0.25)');
        yearLine.setAttribute('stroke-width', '1');
        const yearLabelBacking = document.createElementNS(
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
        const yearLabel = document.createElementNS(global.svgNamespace, 'text');
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
 * @param {object} fics
 * @param {number} intervalLength Time interval length, in seconds.
 * @return {object}
 */
function groupTagsByTimeIntervals(fics, intervalLength) {
    // Turn the fics object into an array, since we don't actually care about
    // the keys. At this point, we're not interested in what fic the tags came
    // from; only when it was published.
    let tagCollections = Object.values(fics);

    // Sort the tag collections by fic publication date.
    tagCollections = UTIL.sortByProperties(tagCollections, ['date']);

    // Get the upper and lower bounds of the time range spanned by all fics.
    const timeLower = tagCollections[0].date;
    const timeUpper = tagCollections[tagCollections.length - 1].date;

    // Create an object to contain all time intervals (keyed by the interval's
    // start time).
    const timeIntervals = {};
    for (let t = timeLower; t < timeUpper; t += intervalLength) {
        timeIntervals[t] = {};
    }

    // Go through every tag collection and add each tag to the appropriate time
    // interval.
    for (let i = 0; i < tagCollections.length; i++) {
        const tagCollection = tagCollections[i];

        // Get the absolute time at which this tag collection appears.
        const time = tagCollection.date;

        // Get the time of this tag collection relative to the start of the time
        // range (ie. if it occurs at the very start, it has time 0).
        const relativeTime = time - timeLower;

        // Calculate the position of the interval that this tag collection is
        // in (ie. 1st, 2nd, 16th, etc.). For example, if the interval length
        // is 10 and the tag collection appears at a relative time of 27, then
        // it is in the 3rd interval. (For convenience, we're using zero-based
        // indexing, so that would actually be interval 2).
        const intervalPosition = Math.floor(relativeTime / intervalLength);

        // Calculate the start time of the tag collection's interval.
        const intervalStartTime = timeLower + (intervalPosition * intervalLength);

        // For each tag in the collection, add it to the interval. Since there
        // can be multiple tags in the same interval, we track a count of each
        // tag.
        const interval = timeIntervals[intervalStartTime];
        for (let j = 0; j < tagCollection.tags.length; j++) {
            const tag = tagCollection.tags[j];
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
 * @param {number[]} tagIds
 * @param {object} tagCounts
 * @return {object}
 */
function getTagSeriesCollection(tagIds, tagCounts) {
    // Get an ordered list of keys for the time intervals, so that we can
    // process them in chronological order.
    const times = Object.keys(tagCounts);
    times.sort();

    // With a complete set of tag counts for all selected tags at each time
    // interval, we can now convert the data into a more digestible series form.
    // We'll produce a collection of series, one for each tag, in which each
    // series consists of an ordered list of (time, count) data points.
    const seriesCollection = {};
    for (let i = 0; i < tagIds.length; i++) {
        const tagId = tagIds[i];
        const series = [];

        for (let t = 0; t < times.length; t++) {
            const time = times[t];
            const counts = tagCounts[time];
            let count = 0;
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
 * Given a list of [t, v] coordinates, where t is time and v is value at that
 * time, and given a period p, return an equal-length list of [t, a]
 * coordinates, where a is the rolling total of the last p values.
 *
 * It is assumed that the list of coordinates is in chronological order (ie.
 * every subsequent t value is larger than the last). If that is not true, this
 * method will produce incorrect results as it iterates through the points in
 * order.
 *
 * @param {number[][]} series
 * @param {number} period
 */
const getRollingTotalSeries = function getRollingTotalSeries(series, period) {
    const rollingTotalSeries = [];

    for (let i = 0; i < series.length; i++) {
        const dataPoint = series[i];
        const t = dataPoint[0];

        // Get the start and end of the period over which we will take the
        // rolling total. For values near the start of the range, we take care
        // to prevent the period for stretching backward into nonexistent
        // values. We can still give a rolling total for those values using the
        // limited data available.
        const periodEnd = i;
        const periodStart = Math.max(0, (i - period) + 1);

        // Take the sum of all values over the period.
        let periodSum = 0;
        for (let j = periodStart; j <= periodEnd; j++) {
            let periodDataPoint = series[j];
            const pv = periodDataPoint[1];

            periodSum += pv;
        }

        rollingTotalSeries.push([t, periodSum]);
    }

    return rollingTotalSeries;
};

/*
const getRollingAverageSeries = function getRollingAverageSeries(series, period) {
    const rollingAverageSeries = getRollingTotalSeries(series, period);

    for (let i = 0; i < rollingAverageSeries.length; i++) {
        //const periodLength = Math.min(i+1, period);
        const periodLength = period;
        rollingAverageSeries[i][1] /= periodLength;
    }

    return rollingAverageSeries;
};

const getDerivativeSeries = function getDerivativeSeries(series) {
    const derivativeSeries = [];

    for (let i = 0; i < series.length; i++) {
        const pointB = series[i];
        const tB = pointB[0];
        const vB = pointB[1];

        let pointA = undefined;

        if (i == 0) {
            pointA = pointB;
        } else {
            pointA = series[i-1];
        }

        const tA = pointA[0];
        const vA = pointA[1];

        const dv = vB - vA;
        const dt = tB - tA;

        const derivative = dv / dt;

        derivativeSeries.push([tB, derivative]) 
    }

    derivativeSeries[0][1] = derivativeSeries[1][1];

    return derivativeSeries;
};
*/

/**
 * Given a list of [x, y] coordinates, return an SVG path definition string for
 * the resulting path.
 *
 * @param float[][] coords
 * @return string
 */
function createPathDefinition(coords) {
    let pathDefinition = '';
    for (let i = 0; i < coords.length; i++) {
        const coord = coords[i];
        const x = coord[0];
        const y = coord[1];

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
    const svg = document.createElementNS(global.svgNamespace, 'svg');

    //svg.setAttribute('viewBox', '0 0 1000 10000');
    svg.style.width = '100%';
    svg.style.height = '100%';

    UTIL.emptyElement(global.elements.chartContainer);
    global.elements.chartContainer.appendChild(svg);
    global.elements.chartContainer.style.display = 'block';

    // Create the striped "no-data" pattern for use later.
    const defs = document.createElementNS(global.svgNamespace, 'defs');
    const pattern = document.createElementNS(global.svgNamespace, 'pattern');

    pattern.setAttribute('id', 'pattern-no-data');
    pattern.setAttribute('width', 20);
    pattern.setAttribute('height', 20);
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    pattern.setAttribute('patternTransform', 'rotate(45)');

    const patternFill = document.createElementNS(global.svgNamespace, 'rect');
    patternFill.setAttribute('x', 0);
    patternFill.setAttribute('y', 0);
    patternFill.setAttribute('width', 20);
    patternFill.setAttribute('height', 20);
    patternFill.setAttribute('fill', 'hsl(0, 0%, 20%)');

    const patternLine = document.createElementNS(global.svgNamespace, 'rect');
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
    const backgroundRect = document.createElementNS(global.svgNamespace, 'rect');
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
    const color = UTIL.md5ToHsl(md5(tagName));
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
    const colors = [];

    for (let i = 0; i < numberOfColors; i++) {
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

window.onload = initialize;
window.onresize = showTrends;

