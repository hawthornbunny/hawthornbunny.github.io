/**
 * @file Utility methods commonly used across all hawthornbunny projects.
 * @author hawthornbunny
 */
var UTIL = {};

////////////////////////////////////////////////////////////////////////////////
// Asynchronous functions
//
// These are all largely Promise-based. See the following material for guidance:
// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise>
// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises>
// <https://developers.google.com/web/fundamentals/primers/promises>
// <https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html>
////////////////////////////////////////////////////////////////////////////////

/**
 * Return a Promise that resolves after a user-defined timeout.
 *
 * @param {number} milliseconds
 * @return {Promise}
 */
UTIL.sleep = function(milliseconds) {
    return new Promise(
        function (resolve, reject) {
            setTimeout(resolve, milliseconds);
        }
    );
};

/**
 * Return a Promise to load the resource from the given URL. If `progressFunc`
 * is supplied, this will be fired when the loader sends a progress update; this
 * can be used to show loading progress visually.
 *
 * To use:
 *
 *     UTIL.loadFile('example.txt').then(
 *         function (loadedFile) {
 *            // do something with loaded file
 *         }
 *     );
 *
 *
 * @param {string} url
 * @param {function} progressFunc
 * @return Promise
 */
UTIL.loadUrl = function(url, progressFunc) {
    return new Promise(
        function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);

            xhr.onload = function() {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.statusText);
                }
            }
            
            xhr.onerror = function() {
                reject(Error('Could not load URL "'+ url + '"'));
            }
            
            if (progressFunc) {
                xhr.addEventListener("progress", progressFunc);
            }

            xhr.send();
        }
    );
};

////////////////////////////////////////////////////////////////////////////////
// Array and object functions
////////////////////////////////////////////////////////////////////////////////

/**
 * Given an object `object` containing key-value pairs, return a new object
 * containing only those key-value pairs for values for which `filterFunction`
 * returns true.
 *
 * @param {Object} object
 * @param {function(*): boolean} filterFunction
 * @return {Object}
 */
UTIL.filterObjectByValue = function(object, filterFunction) {
    var filteredObject = {};
    for (var key in object) {
        var value = object[key];
        if (filterFunction(value)) {
            filteredObject[key] = value;
        }
    }
    return filteredObject;
};

/**
 * Given a collection of objects `objects`, returns the collection sorted
 * alphabetically by the values of the specified object properties.
 *
 * Example: Suppose we have a collection of objects `cards`, in which each
 * object is known to have a `name` property and a `set` property. We could sort
 * the collection first by name and then by set by calling:
 *
 *    sortByProperties(cards, ['name', 'set']);
 *
 * If `ignoreCase` is true, all property values will be treated as if they are
 * lowercase when sorting.
 *
 * @param {Object[]} objects
 * @param {string[]} properties
 * @param {boolean} ignoreCase
 */
UTIL.sortByProperties = function (objects, properties, ignoreCase) {
    return objects.sort(
        function (objectA, objectB) {
            for (var i=0; i < properties.length; i++) {
                // Go through each of the listed properties, and attempt to
                // compare objectA and objectB by each property. If any property
                // comparison yields a definite "this is smaller" or "this is
                // larger" answer, then we return that. If it determines that
                // the two properties are the same, it moves on and tries to
                // compare the next property.
                var property = properties[i];
                var comparisonResult = undefined;

                // If the object does not have the specified property, assume
                // the value of that property to be the empty string.
                var objectPropertyA = '';
                var objectPropertyB = '';

                if (objectA[property] !== undefined) {
                    objectPropertyA = objectA[property];
                }
                if (objectB[property] !== undefined) {
                    objectPropertyB = objectB[property];
                }

                if (ignoreCase) {
                    // If set to ignore case, treat both object properties as if
                    // they were lowercase.
                    objectPropertyA = objectPropertyA.toLowerCase();
                    objectPropertyB = objectPropertyB.toLowerCase();
                }

                if (objectPropertyA < objectPropertyB) {
                    comparisonResult = -1;
                }
                else if (objectPropertyA > objectPropertyB) {
                    comparisonResult = 1;
                }
                
                if (comparisonResult !== undefined) {
                    // If we determined that the two properties are definitely
                    // different, we return the comparison result (smaller or
                    // larger). 
                    return comparisonResult;
                }

                // Otherwise, we move on to try comparing the next property in
                // the list.
            }

            // If after comparing every property, we still couldn't definitely
            // determine an ordering, the two objects must have exactly the same
            // values for all properties that we're interested in, so return 0.
            return 0;
        }
    );
};

/**
 * Return the sum of all elements in the given array.
 *
 * @param {Array} array
 * @return {(number|string)}
 */
UTIL.sum = function(array)  {
    return array.reduce(
        function (accumulator, currentValue) {
            return accumulator + currentValue;
        },
        0
    );
};

/**
 * Return the smallest value in the given array. While you can use a `reduce`
 * array function for this, MDN advises against doing so on very large arrays;
 * therefore, this does it the old-school iterative way.
 *
 * @param {number} array
 * @return {number}
 */
UTIL.getArrayMin = function(array) {
    var minValue = undefined;
    for (var i = 0; i < array.length; i++) {
        var value = array[i];

        if (minValue === undefined || value < minValue) {
            minValue = value;
        }
    }

    return minValue;
};

/**
 * Return the largest value in the given array.
 *
 * @param {number} array
 * @return {number}
 */
UTIL.getArrayMax = function(array) {
    var maxValue = undefined;
    for (var i = 0; i < array.length; i++) {
        var value = array[i];

        if (maxValue === undefined || value > maxValue) {
            maxValue = value;
        }
    }

    return maxValue;
};

////////////////////////////////////////////////////////////////////////////////
// Set functions
////////////////////////////////////////////////////////////////////////////////

/**
 * Return true if `setA` is a subset of `setB`.
 *
 * @param {Set} setA
 * @param {Set} setB
 * return {boolean}
 */
UTIL.isSubsetOf = function(setA, setB) {
    for (var element of setA) {
        if (!setB.has(element)) {
            return false;
        }
    }

    return true;
}

////////////////////////////////////////////////////////////////////////////////
// Assertion functions
////////////////////////////////////////////////////////////////////////////////

/**
 * Throw an exception if the two given values are not equal.
 *
 * @param {*} expectedValue
 * @param {*} actualValue
 * @param {string} message An optional message to include in the output.
 * @throws {Error}
 */
UTIL.assertEquals = function(expectedValue, actualValue, message) {
    if (expectedValue != actualValue) {
        var assertionMessage = 'Assertion failed: "' + expectedValue + '" != "'
            + actualValue + '"';

        if (message !== undefined) {
            assertionMessage += ' (' + message + ')';
        }

        throw new Error(assertionMessage);
    }
};

/**
 * Throw an exception if the two given values are equal.
 *
 * @param {*} expectedValue
 * @param {*} actualValue
 * @throws {Error}
 */
UTIL.assertNotEquals = function(expectedValue, actualValue) {
    if (expectedValue == actualValue) {
        throw new Error(
            'Assertion failed: "' + expectedValue + '" == "' + actualValue
            + '"'
        );
    }
};

/**
 * Throw an exception if the given array does not contain the expected value.
 *
 * @param {*} expectedValue
 * @param {Array} array
 * @throws {Error}
 */
UTIL.assertContains = function(expectedValue, array) {
    if (array.indexOf(expectedValue) === -1) {
        throw 'Assertion failed: (' + array.join(', ') + ') does not contain ' +
            expectedValue;
    }
};

////////////////////////////////////////////////////////////////////////////////
// Chart functions
////////////////////////////////////////////////////////////////////////////////

/**
 * D3-inspired simple linear scale. Return a mapping function that linearly maps
 * values in the given domain to the given range, which can then be used to
 * convert real values into pixel positions for drawing a chart.
 *
 * @param {number} domainMin
 * @param {number} domainMax
 * @param {number} rangeMin
 * @param {number} rangeMax
 * @return {function(number): number}
 */
UTIL.scaleLinear = function (domainMin, domainMax, rangeMin, rangeMax) {
    return function (domainValue) {
        if (domainMax - domainMin == 0) {
            // If the scale has zero length, just return 0.
            return 0;
        }
        var relativeValue = domainValue - domainMin;
        var domainCoefficient = relativeValue / (domainMax - domainMin);
        var rangeValue = rangeMin + ((rangeMax - rangeMin) * domainCoefficient);
        return rangeValue;
    };
};

/**
 * Given a series consisting of an ordered array of (x, y) data points, return a
 * corresponding cumulative series, where each y-value includes the sum of all
 * y-values that preceded it.
 *
 * Example:
 *
 *     UTIL.getCumulativeSeries(
 *         [
 *             [1, 2],
 *             [2, 0],
 *             [3, 5],
 *             [4, 1]
 *         ]
 *     );
 *
 * produces the series
 *
 *     [
 *         [1, 2],
 *         [2, 2],
 *         [3, 7],
 *         [4, 8],
 *     ]
 *
 * If `cutoff` is given, then the cumulative sum doesn't backtrack all the way
 * to the beginning of the series; instead, it only goes back a certain number
 * of data points, and then cuts off. This can be useful for showing short-term
 * trends in data.
 *
 * Another way to imagine cutoff is to suppose that each data point can only
 * "look back" a certain distance; for example, if the cutoff is 3, then each
 * data point can only take the cumulative sum from itself and the 2 data points
 * preceding it.
 *
 * @param {number[][]} series
 * @param {number} cutoff
 */
UTIL.getCumulativeSeries = function (series, cutoff) {
    var cumulativeSeries = [];
    var sum = 0;

    for (var i = 0; i < series.length; i++) {
        // Figure out the start and end of the range of values that we need to
        // sum, in order to give the cumulative value at this index.

        // Without cutoff, this is straightforward; the range always starts at
        // 0, and each cumulative data point is just the sum of all values up to
        // that point.
        var rangeStart = 0;

        if (cutoff !== undefined) {
            // If there is cutoff, we instead start the range a fixed x-distance
            // prior to the interval, taking care to clip the range if needed so
            // that it doesn't start at a negative index.
            rangeStart = Math.max(0, (i - cutoff) + 1);
        }
        var rangeSum = 0;
        for (var j = rangeStart; j <= i; j++) {
            var dataPoint = series[j];
            var x = dataPoint[0];
            var y = dataPoint[1];

            rangeSum += y;
        }

        cumulativeSeries.push([x, rangeSum]);
    }

    return cumulativeSeries;
}

/**
 * Given a collection of data series (where each series is an array of (x, y)
 * data points), return a normalized collection in which each data point's
 * y-value instead indicates the size of that value in relation to the total of
 * all y-values at that point. This can be used for stacked area graphs in which
 * you want to show changes in proportion between different things over time.
 *
 * This function only works if the series are all regular; that is, they all
 * have the same number of data points, and each data point can be mapped
 * one-to-one with the data point at the same index in another series. (Or to
 * put it another way: the x-value isn't used to determine whether data-points
 * are lined up; instead, we assume that all data-points at the same index in
 * each series have the same x-value).
 *
 * @param {Object<string, number[][]>} seriesCollection
 * @return {Object<string, number[][]>}
 */
UTIL.normalizeSeriesCollection = function(seriesCollection) {
    // Take the first series from the list. We're assuming that all the series
    // are mostly the same as this and differ only in their y-values, so we'll
    // just get the number of data points from this.
    var firstSeries = seriesCollection[Object.keys(seriesCollection)[0]];
    var numberOfDataPoints = firstSeries.length;

    // Get the total of all y-values at each series index. We also detect at
    // this point if there are any irregular or mismatching series, and throw an
    // error if so.
    var yValueTotals = [];
    for (var i = 0; i < numberOfDataPoints; i++) {
        var yValueTotal = 0;
        for (var key in seriesCollection) {
            var series = seriesCollection[key];
            UTIL.assertEquals(firstSeries.length, series.length);

            var dataPoint = series[i];
            var x = dataPoint[0];
            var y = dataPoint[1];
            UTIL.assertEquals(firstSeries[i][0], x);

            yValueTotal += y;
        }
        yValueTotals[i] = yValueTotal;
    }

    var normalizedSeriesCollection = {};
    for (var key in seriesCollection) {
        var series = seriesCollection[key];
        var normalizedSeries = [];
        for (var i = 0; i < numberOfDataPoints; i++) {
            var dataPoint = series[i];
            var x = dataPoint[0];
            var y = dataPoint[1];
            var yValueTotal = yValueTotals[i];

            var normalizedYValue = 0;
            if (yValueTotal !== 0) {
                var normalizedYValue = y / yValueTotal;
            }
            normalizedSeries.push([x, normalizedYValue]);
        }
        normalizedSeriesCollection[key] = normalizedSeries;
    }

    return normalizedSeriesCollection;
}

/**
 * Given a collection of data series (where each series is an array of (x, y)
 * data points), return a stacked collection in which each data point's
 * y-value includes the sum of the y-values of all series beneath it. This
 * allows for the creation of "stacked" data sets for things like area charts.
 *
 * A `keys` parameter must be supplied containing an array of series keys in the
 * order that they should be stacked.
 *
 * As with normalization, this function assumes that all series have the same
 * number of data points and matching x-values at each index.
 *
 * @param {Object<string, number[][]>} seriesCollection
 * @param {string[]} keys
 * @return {Object<string, number[][]>}
 */
UTIL.stackSeriesCollection = function(seriesCollection, keys) {
    UTIL.assertEquals(Object.keys(seriesCollection).length, keys.length);
    var firstSeries = seriesCollection[Object.keys(seriesCollection)[0]];
    var numberOfDataPoints = firstSeries.length;

    var yValues = [];
    var stackedSeriesCollection = {};
    for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        stackedSeriesCollection[key] = [];
    }

    for (var i = 0; i < numberOfDataPoints; i++) {
        var sum = 0;
        for (var j = 0; j < keys.length; j++) {
            var key = keys[j];
            var series = seriesCollection[key];
            UTIL.assertNotEquals(undefined, series);
            UTIL.assertEquals(firstSeries.length, series.length);

            var dataPoint = series[i];
            var x = dataPoint[0];
            var y = dataPoint[1];
            UTIL.assertEquals(firstSeries[i][0], x);

            sum += y;
            stackedSeriesCollection[key].push([x, sum]);
        }
    }

    return stackedSeriesCollection;
}

////////////////////////////////////////////////////////////////////////////////
// DOM functions
////////////////////////////////////////////////////////////////////////////////

/**
 * Remove an element from the DOM.
 *
 * @param {Element} element
 */
UTIL.deleteElement = function (element) {
    element.parentNode.removeChild(element);
};

/**
 * Remove all children from the given element.
 *
 * @param {Element} element
 */
UTIL.emptyElement = function (element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
};

/**
 * Convert a DOM NodeList to an array.
 *
 * Borrowed from <https://davidwalsh.name/nodelist-array>
 *
 * @param {NodeList} nodeList
 * @return array
 */
UTIL.nodeListToArray = function (nodeList) {
    return Array.prototype.slice.call(nodeList);
};
////////////////////////////////////////////////////////////////////////////////
// Random functions
////////////////////////////////////////////////////////////////////////////////

/**
 * Return a random float between `min` and `max`.
 *
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
UTIL.randomFloat = function(min, max) {
    return min + (Math.random() * (max - min));
};

/**
 * Return a random integer greater than or equal to `min`, and less than `max`.
 *
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
UTIL.randomInt = function(min, max) {
    return Math.floor(UTIL.randomFloat(min, max));
};

/**
 * Return a random integer greater than or equal to zero, and less than `max`.
 *
 * @param {number} max
 * @return {number}
 */
UTIL.rnd = function(max) {
    return UTIL.randomInt(0, max);
};

/**
 * Return true with probability `p`, where p is a number between 0 and 1.
 *
 * @param {number} p
 * return {boolean}
 */
UTIL.probability = function(p) {
    return p > UTIL.randomFloat(0, 1);
}

/**
 * Randomize the ordering of an array.
 *
 * @param {Array} array
 * @return {Array} The shuffled array
 */
UTIL.shuffle = function(array) {
    var shuffledArray = [];
    for (var i=0; i < array.length; i++) {
        var element = array[i];
        var insertIndex = UTIL.randomInt(0, shuffledArray.length+1);
        shuffledArray.splice(insertIndex, 0, element);
    }
    return shuffledArray;
};

/**
 * Return a random integer between `min` and `max-1` inclusive.
 *
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
UTIL.rndMinMax = function(min, max) {
    return min + Math.floor(Math.random() * (max - min));
};

/**
 * Simulate an XdY dice roll.
 *
 * @param {number} numberOfDice
 * @param {number} sidesPerDie
 * @return {number}
 */
UTIL.roll = function(numberOfDice, sidesPerDie) {
    var total = 0;
    for (var i=0; i < numberOfDice; i++) {
        if (sidesPerDie > 0) {
            total += UTIL.rnd(sidesPerDie)+1;
        }
    }
    return total;
};

/**
 * Return a randomly-selected element from an array.
 *
 * @param {Array} array
 * @return {*}
 */
UTIL.choice = function(array) {
    if (array.length > 0) {
        return array[UTIL.rnd(array.length)];
    }
    return undefined;
};

/**
 * Given a table of strings mapped to weightings, randomly choose a string from
 * the table, with the choice biased toward strings with higher weightings. This
 * method uses a simple "wheel of fortune" algorithm where higher weights are
 * given a larger slice of the wheel.
 *
 * @param {Object<string, number>} weightingsTable
 * @return {string}
 */
UTIL.weightedChoice = function (weightingsTable) {
    var strings = Object.keys(weightingsTable);

    var totalWeight = UTIL.sum(Object.values(weightingsTable));

    // Randomly select a point within the sum of frequencies.
    var randomNumber = UTIL.randomFloat(0, totalWeight);

    var cumulativeSum = 0;
    for (var i=0; i < strings.length; i++) {
        var string = strings[i];
        cumulativeSum += weightingsTable[string];
        if (cumulativeSum > randomNumber) {
            return string;
        }
    }
    return undefined;
}

////////////////////////////////////////////////////////////////////////////////
// URL functions
////////////////////////////////////////////////////////////////////////////////

/**
 * Get parameters (if any) from the URL as an object.
 *
 * @return {Object}
 */
UTIL.getUrlParameters = function() {
    var parameterString = window.location.search.substr(1);
    if (parameterString) {
        return convertParameterStringToObject(parameterString);
    }
    return null;
};

/**
 * Convert a URL parameter string (eg. `key1=value1&key2=value2`) to an object.
 * The parameter string should not include the initial '?'.
 *
 * @param {string} parameterString
 * @return {Object<string, string>}
 */
UTIL.convertParameterStringToObject = function(parameterString) {
    var parameters = {};
    var parameterKeyValueStrings = parameterString.split('&');

    for (var i=0; i < parameterKeyValueStrings.length; i++) {
        var parameterKeyValueString = parameterKeyValueStrings[i];
        var keyValue = parameterKeyValueString.split('=');
    
        parameters[decodeURIComponent(keyValue[0])] = decodeURIComponent(
            keyValue[1]
        );
    }
    return parameters;
};

////////////////////////////////////////////////////////////////////////////////
// Miscellaneous functions
////////////////////////////////////////////////////////////////////////////////

/**
 * Given an MD5 hash, convert it into an HSL color string.
 *
 * @param {string} hash
 * @return {string}
 */
UTIL.md5ToHsl = function(hash) {
    var hslHex = {
        'h': '0x'+hash.substr(0, 2),
        's': '0x'+hash.substr(2, 2),
        'l': '0x'+hash.substr(4, 2),
    };

    var hslDec = {
        'h': parseInt(hslHex.h, 16),
        's': parseInt(hslHex.s, 16),
        'l': parseInt(hslHex.l, 16),
    };

    var hsl = {
        'h': 360 * (hslDec.h / 255),
        's': 100 * (hslDec.s / 255),
        'l': 100 * (hslDec.l / 255),
    };

    return hsl;
};

/**
 * Method borrowed from MDN: <https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Testing_for_availability>
 *
 * This method returns true if storage of the given type is available. Possible
 * types are "localStorage" and "sessionStorage".
 *
 * @param {string} type
 * @return {boolean}
 */
UTIL.isStorageAvailable = function (type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
};
