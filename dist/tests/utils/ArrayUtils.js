"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const ArrayUtils = require("utils/ArrayUtils");
ava_1.default("Can get unique values from array", t => {
    const arr = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
    const expected = [1, 2, 3, 4];
    const output = ArrayUtils.getUnique(arr);
    t.deepEqual(output, expected);
});
