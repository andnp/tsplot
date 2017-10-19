import test from 'ava';

import * as ArrayUtils from 'utils/ArrayUtils';

test("Can get unique values from array", t => {
    const arr = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
    const expected = [1, 2, 3, 4];

    const output = ArrayUtils.getUnique(arr);
    t.deepEqual(output, expected);
});
