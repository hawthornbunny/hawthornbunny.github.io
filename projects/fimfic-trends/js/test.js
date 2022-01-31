/**
 * Unit tests.
 */
const test = function test() {
    testGroupTagsByTimeIntervals();
    testGetRollingTotalSeries();
    testGetRollingAverageSeries();
};

const testGroupTagsByTimeIntervals = function testGroupTagsByTimeIntervals() {
    const data = {
        'fics': {
            '1': { 'tags':       [1], 'date': 0 },
            '2': { 'tags':       [2], 'date': 3 },
            '3': { 'tags':       [2], 'date': 7 },
            '4': { 'tags': [1, 2, 3], 'date': 25 },
            '5': { 'tags':    [1, 2], 'date': 40 },
            '6': { 'tags':    [2, 3], 'date': 59 },
        },
        'tags': {
            '1': { 'id': 1, 'name': 'Tag 1' },
            '2': { 'id': 2, 'name': 'Tag 2' },
            '3': { 'id': 3, 'name': 'Tag 3' },
        },
    };

    const timeIntervals = groupTagsByTimeIntervals(data.fics, 10);

    UTIL.assertEquals(6, Object.keys(timeIntervals).length);

    UTIL.assertEquals(2, Object.keys(timeIntervals[0]).length);
    UTIL.assertEquals(1, timeIntervals[0][1]);
    UTIL.assertEquals(2, timeIntervals[0][2]);

    UTIL.assertEquals(0, Object.keys(timeIntervals[10]).length);

    UTIL.assertEquals(3, Object.keys(timeIntervals[20]).length);
    UTIL.assertEquals(1, timeIntervals[20][1]);
    UTIL.assertEquals(1, timeIntervals[20][2]);
    UTIL.assertEquals(1, timeIntervals[20][3]);

    UTIL.assertEquals(0, Object.keys(timeIntervals[30]).length);

    UTIL.assertEquals(2, Object.keys(timeIntervals[40]).length);
    UTIL.assertEquals(1, timeIntervals[40][1]);
    UTIL.assertEquals(1, timeIntervals[40][2]);

    UTIL.assertEquals(2, Object.keys(timeIntervals[50]).length);
    UTIL.assertEquals(1, timeIntervals[50][2]);
    UTIL.assertEquals(1, timeIntervals[50][3]);
};

const testGetRollingTotalSeries = function testGetRollingTotalSeries() {
    let series = [
        [1, 8],
        [2, 5],
        [3, 4],
        [4, 0],
        [5, 7],
    ];

    let rollingTotalSeries = getRollingTotalSeries(series, 3);

    UTIL.assertEquals(5, rollingTotalSeries.length);
    UTIL.assertEquals(1, rollingTotalSeries[0][0]);
    UTIL.assertEquals(2, rollingTotalSeries[1][0]);
    UTIL.assertEquals(3, rollingTotalSeries[2][0]);
    UTIL.assertEquals(4, rollingTotalSeries[3][0]);
    UTIL.assertEquals(5, rollingTotalSeries[4][0]);
    
    UTIL.assertEquals(8, rollingTotalSeries[0][1]);
    UTIL.assertEquals(13, rollingTotalSeries[1][1]);
    UTIL.assertEquals(17, rollingTotalSeries[2][1]);
    UTIL.assertEquals(9, rollingTotalSeries[3][1]);
    UTIL.assertEquals(11, rollingTotalSeries[4][1]);
    
    rollingTotalSeries = getRollingTotalSeries(series, 2);
    UTIL.assertEquals(8, rollingTotalSeries[0][1]);
    UTIL.assertEquals(13, rollingTotalSeries[1][1]);
    UTIL.assertEquals(9, rollingTotalSeries[2][1]);
    UTIL.assertEquals(4, rollingTotalSeries[3][1]);
    UTIL.assertEquals(7, rollingTotalSeries[4][1]);
    
    rollingTotalSeries = getRollingTotalSeries(series, 1);
    UTIL.assertEquals(8, rollingTotalSeries[0][1]);
    UTIL.assertEquals(5, rollingTotalSeries[1][1]);
    UTIL.assertEquals(4, rollingTotalSeries[2][1]);
    UTIL.assertEquals(0, rollingTotalSeries[3][1]);
    UTIL.assertEquals(7, rollingTotalSeries[4][1]);
};

const testGetRollingAverageSeries = function testGetRollingAverageSeries() {
    let series = [
        [1, 4],
        [2, 2],
        [3, 9],
        [4, 7],
        [5, 5],
    ];

    let rollingAverageSeries = getRollingAverageSeries(series, 3);

    UTIL.assertEquals(5, rollingAverageSeries.length);
    UTIL.assertEquals(1, rollingAverageSeries[0][0]);
    UTIL.assertEquals(2, rollingAverageSeries[1][0]);
    UTIL.assertEquals(3, rollingAverageSeries[2][0]);
    UTIL.assertEquals(4, rollingAverageSeries[3][0]);
    UTIL.assertEquals(5, rollingAverageSeries[4][0]);
    
//    UTIL.assertEquals(4, rollingAverageSeries[0][1]);
//    UTIL.assertEquals(3, rollingAverageSeries[1][1]);
//    UTIL.assertEquals(5, rollingAverageSeries[2][1]);
//    UTIL.assertEquals(6, rollingAverageSeries[3][1]);
//    UTIL.assertEquals(7, rollingAverageSeries[4][1]);
};
