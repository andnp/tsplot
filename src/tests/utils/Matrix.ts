import test from 'ava';

import Matrix from '../../utils/Matrix';

test.beforeEach(t => {
    t.context.matrix = new Matrix([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]);
});

test("Can create Matrix with primitives", t => {
    const m = t.context.matrix;
    t.pass();
});

test("Can access data in memory", t => {
    const m = t.context.matrix;

    t.is(m.get(0, 0), 1);
    t.is(m.get(2, 0), 7);
});

test("Can access transposed memory", t => {
    const m = t.context.matrix;

    m.transpose();
    t.is(m.get(0, 0), 1);
    t.is(m.get(2, 0), 3);
});

test("Can get dimensions of matrix", t => {
    const m = t.context.matrix;
    const { rows, cols } = m.dims();

    t.is(rows, 3);
    t.is(cols, 3);
});

test("Can set the value at a specified index", t => {
    const m = t.context.matrix;

    m.set(0, 0, 3);
    t.is(m.get(0, 0), 3);
});

test("Throws error when get out of bounds", t => {
    const m = t.context.matrix;

    try {
        m.get(6, 2);
        t.fail();
    } catch(e) {
        t.pass();
    }

    try {
        m.get(2, 6);
        t.fail();
    } catch(e) {
        t.pass();
    }
});
