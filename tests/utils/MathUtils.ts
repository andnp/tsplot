import test from 'ava';

import * as MathUtils from 'utils/MathUtils';

test("Can generate the cartesian product of an object of arrays", t => {
    const x = {
        x: [1, 2, 3],
        y: [1, 2],
        z: [1]
    };

    const e = [
        {x: 1, y: 1, z: 1},
        {x: 2, y: 1, z: 1},
        {x: 3, y: 1, z: 1},
        {x: 1, y: 2, z: 1},
        {x: 2, y: 2, z: 1},
        {x: 3, y: 2, z: 1}
    ]

    const output = MathUtils.cartesianProduct(x);
    t.deepEqual(output, e);
});
