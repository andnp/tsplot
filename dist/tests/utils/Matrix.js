"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const Matrix_1 = require("utils/Matrix");
const MatrixUtil = require("utils/MatrixUtils");
ava_1.default.beforeEach(t => {
    t.context.matrix = Matrix_1.default.fromData([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]);
});
ava_1.default("Can create Matrix with primitives", t => {
    const m = t.context.matrix;
    t.pass();
});
ava_1.default("Can access data in memory", t => {
    const m = t.context.matrix;
    t.is(m.get(0, 0), 1);
    t.is(m.get(2, 0), 7);
});
ava_1.default("Can access transposed memory", t => {
    const m = t.context.matrix;
    m.transpose();
    t.is(m.get(0, 0), 1);
    t.is(m.get(2, 0), 3);
});
ava_1.default("Can get dimensions of matrix", t => {
    const m = t.context.matrix;
    const { rows, cols } = m.dims();
    t.is(rows, 3);
    t.is(cols, 3);
});
ava_1.default("Can set the value at a specified index", t => {
    const m = t.context.matrix;
    m.set(0, 1, 3);
    t.is(m.get(0, 1), 3);
});
ava_1.default("Throws error when get out of bounds", t => {
    const m = t.context.matrix;
    try {
        m.get(6, 2);
        t.fail();
    }
    catch (e) {
        t.pass();
    }
    try {
        m.get(2, 6);
        t.fail();
    }
    catch (e) {
        t.pass();
    }
});
ava_1.default("Can get a matrix from another", t => {
    const m = Matrix_1.default.fromData([
        [0, 1],
        [2, 3],
        [4, 5]
    ]);
    m.transpose();
    const n = Matrix_1.default.fromMatrix(m);
    const e = Matrix_1.default.fromData([
        [0, 2, 4],
        [1, 3, 5]
    ]);
    t.true(e.equal(n));
});
ava_1.default("Can add a row to a matrix", t => {
    const m = t.context.matrix;
    m.addRow([1, 2, 3]);
    const { rows, cols } = m.dims();
    t.is(rows, 4);
    t.is(cols, 3);
    const e = Matrix_1.default.fromData([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 2, 3],
    ]);
    t.true(m.equal(e));
});
ava_1.default("Can add a col to a matrix", t => {
    const m = t.context.matrix;
    m.addCol([1, 2, 3]);
    const { rows, cols } = m.dims();
    t.is(rows, 3);
    t.is(cols, 4);
    const e = Matrix_1.default.fromData([
        [1, 2, 3, 1],
        [4, 5, 6, 2],
        [7, 8, 9, 3],
    ]);
    t.true(m.equal(e));
});
ava_1.default("Can get a row", t => {
    const m = t.context.matrix;
    const row = m.getRow(1);
    t.deepEqual(row, [4, 5, 6]);
});
ava_1.default("Can get a col", t => {
    const m = t.context.matrix;
    const col = m.getCol(1);
    t.deepEqual(col, [2, 5, 8]);
});
ava_1.default("Can force a matrix to resize smaller", t => {
    const m = t.context.matrix;
    m.forceReshape({ rows: 2, cols: 2 });
    t.true(Matrix_1.default.fromData([
        [1, 2],
        [4, 5]
    ]).equal(m));
});
ava_1.default("Can force a matrix to resize larger", t => {
    const m = t.context.matrix;
    m.forceReshape({ rows: 4, cols: 4 });
    t.true(Matrix_1.default.fromData([
        [1, 2, 3, 0],
        [4, 5, 6, 0],
        [7, 8, 9, 0],
        [0, 0, 0, 0]
    ]).equal(m));
});
ava_1.default("Can build a matrix of zeros", t => {
    const m = Matrix_1.default.Zeros({ rows: 3, cols: 2 });
    t.true(Matrix_1.default.fromData([
        [0, 0],
        [0, 0],
        [0, 0]
    ]).equal(m));
});
ava_1.default("Can append columns of matrices into one matrix", t => {
    const m1 = Matrix_1.default.fromData([
        [1, 2],
        [3, 4],
        [5, 6]
    ]);
    const m2 = Matrix_1.default.fromData([
        [3, 4],
        [5, 6],
        [7, 8]
    ]);
    const m3 = Matrix_1.default.fromData([
        [5, 6],
        [7, 8],
        [9, 0]
    ]);
    const e = Matrix_1.default.fromData([
        [1, 2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7, 8],
        [5, 6, 7, 8, 9, 0]
    ]);
    const o = MatrixUtil.appendRight([m1, m2, m3]);
    t.true(o.equal(e));
});
