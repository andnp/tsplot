"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const MapUtils = require("utils/MapUtils");
ava_1.default("Can iterate over a map", t => {
    const m = new Map();
    m.set('hi', 1);
    m.set('there', 2);
    const expected = [{
            key: 'hi',
            value: 1
        }, {
            key: 'there',
            value: 2
        }];
    const output = [];
    MapUtils.forEach(m, (value, key) => {
        output.push({ key, value });
    });
    t.deepEqual(output, expected);
});
