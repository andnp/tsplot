"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var Matrix_1 = require("../../utils/Matrix");
ava_1.default("Can create Matrix with primitives", function (t) {
    var m = new Matrix_1.default([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]);
    t.pass();
});
