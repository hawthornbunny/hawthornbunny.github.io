////////////////////////////////////////////////////////////////////////////////
// Unit tests
////////////////////////////////////////////////////////////////////////////////
var UTIL_TESTS = {};

UTIL_TESTS.test = function () {
    UTIL_TESTS.testSum();
    UTIL_TESTS.testGetArrayMin();
    UTIL_TESTS.testGetArrayMax();
    UTIL_TESTS.testGetCumulativeSeries();
    UTIL_TESTS.testNormalizeSeriesCollection();
    UTIL_TESTS.testStackSeriesCollection();
};

UTIL_TESTS.testSum = function () {
    UTIL.assertEquals(28, UTIL.sum([0, 1, 2, 3, 4, 5, 6, 7]));
};

UTIL_TESTS.testGetArrayMin = function () {
    UTIL.assertEquals(
        -360.01,
        UTIL.getArrayMin([-32.7, -360.01, -3, 0, 1000, 2.5, 64])
    );
};

UTIL_TESTS.testGetArrayMax = function () {
    UTIL.assertEquals(
        6533,
        UTIL.getArrayMax([0, -255, 1,7, 64, 63.1, 100, 6533])
    );
};

UTIL_TESTS.testGetCumulativeSeries = function () {
    var series = [
        [1, 2],
        [2, 0],
        [3, 5],
        [4, 1]
    ];

    var cumulativeSeries = UTIL.getCumulativeSeries(series);

    // cumulativeSeries = [
    //     [1, 2],
    //     [2, 2],
    //     [3, 7],
    //     [4, 8]
    // ]

    UTIL.assertEquals(1, cumulativeSeries[0][0]);
    UTIL.assertEquals(2, cumulativeSeries[0][1]);
    UTIL.assertEquals(2, cumulativeSeries[1][0]);
    UTIL.assertEquals(2, cumulativeSeries[1][1]);
    UTIL.assertEquals(3, cumulativeSeries[2][0]);
    UTIL.assertEquals(7, cumulativeSeries[2][1]);
    UTIL.assertEquals(4, cumulativeSeries[3][0]);
    UTIL.assertEquals(8, cumulativeSeries[3][1]);
};

UTIL_TESTS.testNormalizeSeriesCollection = function () {
    var seriesCollection = {
        'Series 1': [ [1, 10], [2, 5],  [3, 20], [4, 9] ],
        'Series 2': [ [1, 0],  [2, 5],  [3, 20], [4, 9] ],
        'Series 3': [ [1, 0],  [2, 0],  [3,  5], [4, 9] ],
        'Series 4': [ [1, 0],  [2, 0],  [3,  5], [4, 9] ],
    };

    var normalizedSeriesCollection = UTIL.normalizeSeriesCollection(
        seriesCollection
    );

    UTIL.assertEquals(   1, normalizedSeriesCollection['Series 1'][0][0]);
    UTIL.assertEquals(   1, normalizedSeriesCollection['Series 1'][0][1]);
    UTIL.assertEquals(   2, normalizedSeriesCollection['Series 1'][1][0]);
    UTIL.assertEquals( 0.5, normalizedSeriesCollection['Series 1'][1][1]);
    UTIL.assertEquals(   3, normalizedSeriesCollection['Series 1'][2][0]);
    UTIL.assertEquals( 0.4, normalizedSeriesCollection['Series 1'][2][1]);
    UTIL.assertEquals(   4, normalizedSeriesCollection['Series 1'][3][0]);
    UTIL.assertEquals(0.25, normalizedSeriesCollection['Series 1'][3][1]);

    UTIL.assertEquals(   1, normalizedSeriesCollection['Series 2'][0][0]);
    UTIL.assertEquals(   0, normalizedSeriesCollection['Series 2'][0][1]);
    UTIL.assertEquals(   2, normalizedSeriesCollection['Series 2'][1][0]);
    UTIL.assertEquals( 0.5, normalizedSeriesCollection['Series 2'][1][1]);
    UTIL.assertEquals(   3, normalizedSeriesCollection['Series 2'][2][0]);
    UTIL.assertEquals( 0.4, normalizedSeriesCollection['Series 2'][2][1]);
    UTIL.assertEquals(   4, normalizedSeriesCollection['Series 2'][3][0]);
    UTIL.assertEquals(0.25, normalizedSeriesCollection['Series 2'][3][1]);

    UTIL.assertEquals(   1, normalizedSeriesCollection['Series 3'][0][0]);
    UTIL.assertEquals(   0, normalizedSeriesCollection['Series 3'][0][1]);
    UTIL.assertEquals(   2, normalizedSeriesCollection['Series 3'][1][0]);
    UTIL.assertEquals(   0, normalizedSeriesCollection['Series 3'][1][1]);
    UTIL.assertEquals(   3, normalizedSeriesCollection['Series 3'][2][0]);
    UTIL.assertEquals( 0.1, normalizedSeriesCollection['Series 3'][2][1]);
    UTIL.assertEquals(   4, normalizedSeriesCollection['Series 3'][3][0]);
    UTIL.assertEquals(0.25, normalizedSeriesCollection['Series 3'][3][1]);

    UTIL.assertEquals(   1, normalizedSeriesCollection['Series 4'][0][0]);
    UTIL.assertEquals(   0, normalizedSeriesCollection['Series 4'][0][1]);
    UTIL.assertEquals(   2, normalizedSeriesCollection['Series 4'][1][0]);
    UTIL.assertEquals(   0, normalizedSeriesCollection['Series 4'][1][1]);
    UTIL.assertEquals(   3, normalizedSeriesCollection['Series 4'][2][0]);
    UTIL.assertEquals( 0.1, normalizedSeriesCollection['Series 4'][2][1]);
    UTIL.assertEquals(   4, normalizedSeriesCollection['Series 4'][3][0]);
    UTIL.assertEquals(0.25, normalizedSeriesCollection['Series 4'][3][1]);
};

UTIL_TESTS.testStackSeriesCollection = function () {
    var seriesCollection = {
        'Series 4': [ [1, 5],  [2, 0],  [3, 1], [4, 9] ],
        'Series 3': [ [1, 4],  [2, 7],  [3, 1], [4, 8] ],
        'Series 2': [ [1, 0],  [2, 2],  [3, 1], [4, 0] ],
        'Series 1': [ [1, 1],  [2, 0],  [3, 1], [4, 0] ],
    };

    var stackedSeriesCollection = UTIL.stackSeriesCollection(
        seriesCollection,
        ['Series 1', 'Series 2', 'Series 3', 'Series 4']
    );

    UTIL.assertEquals( 1, stackedSeriesCollection['Series 1'][0][0]);
    UTIL.assertEquals( 1, stackedSeriesCollection['Series 1'][0][1]);
    UTIL.assertEquals( 2, stackedSeriesCollection['Series 1'][1][0]);
    UTIL.assertEquals( 0, stackedSeriesCollection['Series 1'][1][1]);
    UTIL.assertEquals( 3, stackedSeriesCollection['Series 1'][2][0]);
    UTIL.assertEquals( 1, stackedSeriesCollection['Series 1'][2][1]);
    UTIL.assertEquals( 4, stackedSeriesCollection['Series 1'][3][0]);
    UTIL.assertEquals( 0, stackedSeriesCollection['Series 1'][3][1]);

    UTIL.assertEquals( 1, stackedSeriesCollection['Series 2'][0][0]);
    UTIL.assertEquals( 1, stackedSeriesCollection['Series 2'][0][1]);
    UTIL.assertEquals( 2, stackedSeriesCollection['Series 2'][1][0]);
    UTIL.assertEquals( 2, stackedSeriesCollection['Series 2'][1][1]);
    UTIL.assertEquals( 3, stackedSeriesCollection['Series 2'][2][0]);
    UTIL.assertEquals( 2, stackedSeriesCollection['Series 2'][2][1]);
    UTIL.assertEquals( 4, stackedSeriesCollection['Series 2'][3][0]);
    UTIL.assertEquals( 0, stackedSeriesCollection['Series 2'][3][1]);

    UTIL.assertEquals( 1, stackedSeriesCollection['Series 3'][0][0]);
    UTIL.assertEquals( 5, stackedSeriesCollection['Series 3'][0][1]);
    UTIL.assertEquals( 2, stackedSeriesCollection['Series 3'][1][0]);
    UTIL.assertEquals( 9, stackedSeriesCollection['Series 3'][1][1]);
    UTIL.assertEquals( 3, stackedSeriesCollection['Series 3'][2][0]);
    UTIL.assertEquals( 3, stackedSeriesCollection['Series 3'][2][1]);
    UTIL.assertEquals( 4, stackedSeriesCollection['Series 3'][3][0]);
    UTIL.assertEquals( 8, stackedSeriesCollection['Series 3'][3][1]);

    UTIL.assertEquals( 1, stackedSeriesCollection['Series 4'][0][0]);
    UTIL.assertEquals(10, stackedSeriesCollection['Series 4'][0][1]);
    UTIL.assertEquals( 2, stackedSeriesCollection['Series 4'][1][0]);
    UTIL.assertEquals( 9, stackedSeriesCollection['Series 4'][1][1]);
    UTIL.assertEquals( 3, stackedSeriesCollection['Series 4'][2][0]);
    UTIL.assertEquals( 4, stackedSeriesCollection['Series 4'][2][1]);
    UTIL.assertEquals( 4, stackedSeriesCollection['Series 4'][3][0]);
    UTIL.assertEquals(17, stackedSeriesCollection['Series 4'][3][1]);
};

