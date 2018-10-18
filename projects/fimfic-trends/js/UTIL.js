/*******************************************************************************
 * UTIL library
 * v1.0.1
 * by hawthornbunny
 *
 * This package contains utility methods commonly used across all hawthornbunny
 * projects.
 *
 ******************************************************************************/
var UTIL = {};

////////////////////////////////////////////////////////////////////////////////
// AJAX functions
////////////////////////////////////////////////////////////////////////////////

/**
 * Return a Promise to load the resource from the given URL.
 *
 * To use:
 *
 *     UTIL.loadFile('example.txt').then(
 *         function (loadedFile) {
 *            // do something with loaded file
 *         }
 *     );
 * @param string url
 * @return Promise
 */
UTIL.loadFile = function(url, progressFunc) {
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
 * @param object object
 * @param function filterFunction
 * @return object
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
 * @param object[] objects
 * @param string[] properties
 * @param bool ignoreCase
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
 * @param array array
 * @return mixed
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
 * @param array array
 * @return mixed
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
 * @param array array
 * @return mixed
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
// Assertion functions
////////////////////////////////////////////////////////////////////////////////

/**
 * Throw an exception if the two given values are not equal.
 *
 * @param mixed expectedValue
 * @param mixed actualValue
 * @param string message An optional message to include in the output.
 */
UTIL.assertEquals = function(expectedValue, actualValue, message) {
    if (expectedValue != actualValue) {
        var assertionMessage = 'Assertion failed: "' + expectedValue + '" != "' + actualValue
            + '"';

        if (message !== undefined) {
            assertionMessage += ' (' + message + ')';
        }

        throw assertionMessage;
    }
};

/**
 * Throw an exception if the two given values are equal.
 *
 * @param expectedValue
 * @param actualValue
 */
UTIL.assertNotEquals = function(expectedValue, actualValue) {
    if (expectedValue == actualValue) {
        throw 'Assertion failed: "' + expectedValue + '" == "' + actualValue
            + '"';
    }
};

/**
 * Throw an exception if the given array does not contain the expected value.
 *
 * @param expectedValue
 * @param array array
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
 * @param mixed domainMin
 * @param mixed domainMax
 * @param mixed rangeMin
 * @param mixed rangeMax
 * @return function
 */
UTIL.scaleLinear = function (domainMin, domainMax, rangeMin, rangeMax) {
    return function (domainValue) {
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
 */
UTIL.getCumulativeSeries = function (series) {
    var cumulativeSeries = [];
    var sum = 0;
    for (var i = 0; i < series.length; i++) {
        var dataPoint = series[i];
        var x = dataPoint[0];
        var y = dataPoint[1];

        sum += y;

        cumulativeSeries.push([x, sum]);
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
 * @param object seriesCollection
 * @return object
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
 * @param object seriesCollection
 * @param string[] keys
 * @return object
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
 * Remove all children from the given element.
 *
 * @param Element element
 */
UTIL.emptyElement = function (element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
};

////////////////////////////////////////////////////////////////////////////////
// Random functions
////////////////////////////////////////////////////////////////////////////////

/**
 * Return a random float between `min` and `max`.
 *
 * @param float min
 * @param float max
 * @return float
 */
UTIL.randomFloat = function(min, max) {
    return min + Math.random() * (max - min);
};

/**
 * Return a random integer greater than or equal to `min`, and less than `max`.
 *
 * @param float min
 * @param float max
 * @return int
 */
UTIL.randomInt = function(min, max) {
    return Math.floor(Util.randomFloat(min, max));
};

/**
 * Alias for `randomInt`.
 *
 * @param int max
 * @return int
 */
UTIL.rnd = function(max) {
    return UTIL.randomInt(max);
};

/**
 * Randomize the ordering of an array.
 *
 * @param array array
 * @return array The shuffled array
 */
UTIL.shuffle = function(array) {
    var shuffledArray = [];
    for (var i=0; i < array.length; i++) {
        var element = array[i];
        var insertIndex = Util.randomInt(0, shuffledArray.length+1);
        shuffledArray.splice(insertIndex, 0, element);
    }
    return shuffledArray;
};

/**
 * Return a random integer between `min` and `max-1` inclusive.
 *
 * @param int min
 * @param int max
 * @return int
 */
UTIL.rndMinMax = function(min, max) {
    return min + Math.floor(Math.random() * (max - min));
};

/**
 * Simulate an XdY dice roll.
 *
 * @param int numberOfDice
 * @param int sidesPerDie
 * @return int
 */
UTIL.roll = function(numberOfDice, sidesPerDie) {
    var total = 0;
    for (var i=0; i < numberOfDice; i++) {
        if (sidesPerDie > 0) {
            total += this.rnd(sidesPerDie)+1;
        }
    }
    return total;
};

/**
 * Return a randomly-selected element from an array.
 *
 * @param array array
 * @return mixed
 */
UTIL.choice = function(array) {
    if (array.length > 0) {
        return array[this.rnd(array.length)];
    }
    return undefined;
};

////////////////////////////////////////////////////////////////////////////////
// URL functions
////////////////////////////////////////////////////////////////////////////////

/**
 * Get parameters (if any) from the URL as an object.
 *
 * @return object
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
 * @param string parameterString
 * @return object
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
 * @param string hash
 * @return string
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
 * @param string type
 * @return bool
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
