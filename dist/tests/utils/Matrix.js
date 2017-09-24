"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var Matrix_1 = require("../../utils/Matrix");
ava_1.default.beforeEach(function (t) {
    t.context.matrix = new Matrix_1.default([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]);
});
ava_1.default("Can create Matrix with primitives", function (t) {
    var m = t.context.matrix;
    t.pass();
});
ava_1.default("Can access data in memory", function (t) {
    var m = t.context.matrix;
    t.is(m.get(0, 0), 1);
    t.is(m.get(2, 0), 7);
});
ava_1.default("Can access transposed memory", function (t) {
    var m = t.context.matrix;
    m.transpose();
    t.is(m.get(0, 0), 1);
    t.is(m.get(2, 0), 3);
});
ava_1.default("Can get dimensions of matrix", function (t) {
    var m = t.context.matrix;
    var _a = m.dims(), rows = _a.rows, cols = _a.cols;
    t.is(rows, 3);
    t.is(cols, 3);
});
ava_1.default("Can set the value at a specified index", function (t) {
    var m = t.context.matrix;
    m.set(0, 0, 3);
    t.is(m.get(0, 0), 3);
});
ava_1.default("Throws error when get out of bounds", function (t) {
    var m = t.context.matrix;
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
