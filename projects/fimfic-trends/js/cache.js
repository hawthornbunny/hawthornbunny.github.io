////////////////////////////////////////////////////////////////////////////////
// This snippet currently isn't used; I was trying to implement a localStorage
// cache for the fic data, but localStorage is too small for that purpose.
// Keeping it here for future reference.
////////////////////////////////////////////////////////////////////////////////

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

    // Check if local storage is available. If it is, and it has already cached
    // the fic data (and the data isn't too old), we can load from local storage
    // rather than download the fic data file.

    var isLocalStorageAvailable = UTIL.isStorageAvailable('localStorage');
    var loadedFromCache = false;

    if (isLocalStorageAvailable) {
        var timeLastCached = localStorage['timeLastCached'];


        if (timeLastCached) {
            var dateNow = new Date();
            var timeNow = dateNow.getTime();

            if (timeNow - timeLastCached < global.parameters.cacheExpiryTime) {
                // The cache is still fresh enough, so we'll load the data from
                // here.
                var dataJson = localStorage['data'];
                if (dataJson !== null) {
                    global.data = JSON.parse(dataJson);
                    loadedFromCache = true;

                    // Now that we have the data, we can make one extra check:
                    // does the data contain data points that are younger than
                    // the cache itself? If it does, that means that the data
                    // is new (ie. the data file has been updated with new data
                    // from Fimfarchive), so we should ignore the cache and
                    // reload.

                    var timeIntervals = groupTagsByTimeIntervals(
                        global.data.fics
                    );
                    var times = Object.keys(timeIntervals);
                    var endTime = UTIL.getArrayMax(times);

                    if (endTime * 1000 > timeLastCached) {
                        loadedFromCache = false;
                    }
                }
            }
        }
    }

    var showTrendsButton = document.querySelector('#showTrendsButton');
    showTrendsButton.onclick = showTrends;

    global.elements.loadingMessage.style.display = 'none';
    global.elements.tagsContainer.style.display = 'block';

    // If the fic data was cached, we don't need to do much else other than
    // start the app; otherwise, we load the fic data and then start it.
    if (loadedFromCache) {
        start();
    } else {
        // If we couldn't find any fic data in the cache (or we chose to ignore
        // it), load the fic data and begin.
        UTIL.loadFile(global.dataSources.fimfarchive.file).then(
            function(fileJson) {
                var data = JSON.parse(fileJson);
                var dateNow = new Date();
                var timeNow = dateNow.getTime();

                // Wipe the local storage (if available) and re-cache the data.
                if (isLocalStorageAvailable) {
                    localStorage.clear();
                    localStorage.setItem('data', fileJson);
                    localStorage.setItem('timeLastCached', timeNow);
                }

                global.data = data;
                start();
            },
            function(fileJson) {
                console.log('Error');
            }
        );
    }
}

