"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const ObjectUtils = require("utils/ObjectUtils");
ava_1.default("Can flatten an array", t => {
    const arr = [1, 2, 3, 4];
    const expected = {
        '[0]': 1,
        '[1]': 2,
        '[2]': 3,
        '[3]': 4
    };
    const output = ObjectUtils.flattenKeys(arr);
    t.deepEqual(output, expected);
});
ava_1.default("Can flatten an object", t => {
    const obj = {
        'a': 'hey',
        '1': 123,
        'b': true
    };
    const output = ObjectUtils.flattenKeys(obj);
    t.deepEqual(obj, output);
});
ava_1.default("Can flatten a nested object", t => {
    const obj = {
        'key': {
            'nested': 'key',
            'key': {
                'super': 'nested'
            }
        }
    };
    const expected = {
        'key.nested': 'key',
        'key.key.super': 'nested'
    };
    const output = ObjectUtils.flattenKeys(obj);
    t.deepEqual(output, expected);
});
ava_1.default("Can flatten a nested array", t => {
    const obj = {
        'arr': [
            [1, 2],
            [3, 4]
        ],
        'objs': [{
                'hey': 1
            }, {
                'hey': 2
            }]
    };
    const expected = {
        'arr.[0].[0]': 1,
        'arr.[0].[1]': 2,
        'arr.[1].[0]': 3,
        'arr.[1].[1]': 4,
        'objs.[0].hey': 1,
        'objs.[1].hey': 2
    };
    const output = ObjectUtils.flattenKeys(obj);
    t.deepEqual(output, expected);
});
