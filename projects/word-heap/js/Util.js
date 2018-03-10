/**
 * Useful utility functions.
 */

var Util = {};

/**
 * Return a random float between `min` and `max`.
 *
 * @param float min
 * @param float max
 * @return float
 */
Util.randomFloat = function(min, max) {
    return min + Math.random() * (max - min);
}

/**
 * Return a random integer greater than or equal to `min`, and less than `max`.
 *
 * @param float min
 * @param float max
 * @return int
 */
Util.randomInt = function(min, max) {
    return Math.floor(Util.randomFloat(min, max));
}

/**
 * Randomize the ordering of an array.
 *
 * @param array array
 * @return array The shuffled array
 */
Util.shuffle = function(array) {
    var shuffledArray = [];
    for (var i=0; i < array.length; i++) {
        var element = array[i];
        var insertIndex = Util.randomInt(0, shuffledArray.length+1);
        shuffledArray.splice(insertIndex, 0, element);
    }
    return shuffledArray;
}

/**
 * Given an MD5 hash, convert it into an HSL color string.
 *
 * @param string hash
 * @return string
 */
Util.md5ToHsl = function(hash) {
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
}

/**
 * Given an object `object` containing key-value pairs, return a new object containing only those key-value pairs for
 * values for which `filterFunction` returns true.
 *
 * @param object object
 * @param function filterFunction
 * @return object
 */
Util.filterObjectByValue = function(object, filterFunction) {
    var filteredObject = {};
    for (var key in object) {
        var value = object[key];
        if (filterFunction(value)) {
            filteredObject[key] = value;
        }
    }
    return filteredObject;
}


/**
 * Return a Promise to load the resource from the given URL.
 *
 * @param string url
 * @return Promise
 */
Util.loadFile = function(url) {
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
            
            xhr.send();
        }
    );
}


/**
 * Remove all children from the given element.
 *
 * @param Element element
 */
Util.emptyElement = function (element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/**
 * Get parameters (if any) from the URL as an object.
 *
 * @return object
 */
Util.getUrlParameters = function() {
    var parameterString = window.location.search.substr(1);
    if (parameterString) {
        return convertParameterStringToObject(parameterString);
    }
    return null;
}

/**
 * Convert a URL parameter string (eg. `key1=value1&key2=value2`) to an object. The parameter string should not include
 * the initial '?'.
 *
 * @param string parameterString
 * @return object
 */
Util.convertParameterStringToObject = function(parameterString) {
    var parameters = {};
    var parameterKeyValueStrings = parameterString.split('&');

    for (var i=0; i < parameterKeyValueStrings.length; i++) {
        var parameterKeyValueString = parameterKeyValueStrings[i];
        var keyValue = parameterKeyValueString.split('=');
    
        parameters[decodeURIComponent(keyValue[0])] = decodeURIComponent(keyValue[1]);
    }
    return parameters;
}

