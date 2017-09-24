import test from 'ava';

import Matrix from '../../utils/Matrix';

test("Can create Matrix with primitives", t => {
    const m = new Matrix([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]);
    t.pass();
});
