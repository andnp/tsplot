"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const Matrix_1 = require("../../utils/Matrix");
ava_1.default.beforeEach(t => {
    t.context.matrix = new Matrix_1.default([
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
    m.set(0, 0, 3);
    t.is(m.get(0, 0), 3);
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
