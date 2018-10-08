/**
 * Unit tests.
 */
function test() {
    var data = {
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

    var timeIntervals = groupTagsByTimeIntervals(data.fics, 10);

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
}
