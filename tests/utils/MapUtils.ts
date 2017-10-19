import test from 'ava';

import * as MapUtils from 'utils/MapUtils';

test("Can iterate over a map", t => {
    const m = new Map<string, number>();
    m.set('hi', 1);
    m.set('there', 2);

    const expected = [{
        key: 'hi',
        value: 1
    }, {
        key: 'there',
        value: 2
    }];

    const output: Array<{key: string, value: number}> = [];
    MapUtils.forEach(m, (value, key) => {
        output.push({key, value});
    });
    t.deepEqual(output, expected);
});
