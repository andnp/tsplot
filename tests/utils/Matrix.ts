import test from 'ava';

import Matrix from 'utils/Matrix';
import * as MatrixUtil from 'utils/MatrixUtils';

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

    m.set(0, 1, 3);
    t.is(m.get(0, 1), 3);
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

test("Can get a matrix from another", t => {
    const m = new Matrix([
        [0, 1],
        [2, 3],
        [4, 5]
    ]);

    m.transpose();
    const n = Matrix.from(m);

    const e = new Matrix([
        [0, 2, 4],
        [1, 3, 5]
    ]);

    t.deepEqual(n, e);
});

test("Can add a row to a matrix", t => {
    const m = t.context.matrix;

    m.addRow([1, 2, 3]);

    const { rows, cols } = m.dims();

    t.is(rows, 4);
    t.is(cols, 3);
});

test("Can add a col to a matrix", t => {
    const m = t.context.matrix;

    m.addCol([1, 2, 3]);

    const { rows, cols } = m.dims();

    t.is(rows, 3);
    t.is(cols, 4);
});

test("Can get a row", t => {
    const m = t.context.matrix;

    const row = m.getRow(1);

    t.deepEqual(row, [4, 5, 6]);
});

test("Can get a col", t => {
    const m = t.context.matrix;

    const col = m.getCol(1);

    t.deepEqual(col, [2, 5, 8]);
});

test("Can force a matrix to resize smaller", t => {
    const m = t.context.matrix;

    m.forceReshape({rows: 2, cols: 2});
    t.deepEqual(new Matrix([
        [1, 2],
        [4, 5]
    ]), m);
});

test("Can force a matrix to resize larger", t => {
    const m = t.context.matrix;

    m.forceReshape({rows: 4, cols: 4});
    t.deepEqual(new Matrix([
        [1, 2, 3, 0],
        [4, 5, 6, 0],
        [7, 8, 9, 0],
        [0, 0, 0, 0]
    ]), m);
});

test("Can build a matrix of zeros", t => {
    const m = Matrix.Zeros({ rows: 3, cols: 2});

    t.deepEqual(new Matrix([
        [0, 0],
        [0, 0],
        [0, 0]
    ]), m);
});

test("Can append columns of matrices into one matrix", t => {
    const m1 = new Matrix([
        [1, 2],
        [3, 4],
        [5, 6]
    ]);

    const m2 = new Matrix([
        [3, 4],
        [5, 6],
        [7, 8]
    ]);

    const m3 = new Matrix([
        [5, 6],
        [7, 8],
        [9, 0]
    ]);

    const e = new Matrix([
        [1, 2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7, 8],
        [5, 6, 7, 8, 9, 0]
    ]);

    const o = MatrixUtil.appendRight([m1, m2, m3]);
    t.deepEqual(o, e);
});
