"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const MathUtils = require("utils/MathUtils");
ava_1.default("Can generate the cartesian product of an object of arrays", t => {
    const x = {
        x: [1, 2, 3],
        y: [1, 2],
        z: [1]
    };
    const e = [
        { x: 1, y: 1, z: 1 },
        { x: 2, y: 1, z: 1 },
        { x: 3, y: 1, z: 1 },
        { x: 1, y: 2, z: 1 },
        { x: 2, y: 2, z: 1 },
        { x: 3, y: 2, z: 1 }
    ];
    const output = MathUtils.cartesianProduct(x);
    t.deepEqual(output, e);
});