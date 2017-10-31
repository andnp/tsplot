"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const DataBase = require("DataBase");
ava_1.default("Can join two arrays of objects with matching key", async (t) => {
    const obj1 = [{
            id: 1,
            data1: "hey"
        }, {
            id: 2,
            data1: "there"
        }];
    const obj2 = [{
            id: 2,
            data2: "merp"
        }, {
            id: 1,
            data2: "merpmerp"
        }];
    const o = DataBase.join(obj1, obj2, 'id').joined;
    const e = [{
            id: 1,
            data1: "hey",
            data2: "merpmerp"
        }, {
            id: 2,
            data1: "there",
            data2: "merp"
        }];
    t.deepEqual(o, e);
});
ava_1.default("Can join two arrays of objects with matching key and missing data", async (t) => {
    const obj1 = [{
            id: 1,
            data1: "hey"
        }, {
            id: 2,
            data1: "there"
        }];
    const obj2 = [{
            id: 2,
            data2: "merp"
        }];
    const o = DataBase.join(obj1, obj2, 'id').joined;
    const e = [{
            id: 2,
            data1: "there",
            data2: "merp"
        }];
    t.deepEqual(o, e);
});
ava_1.default("Can join two arrays of objects by conditional", async (t) => {
    const obj1 = [{
            id: 1,
            data1: "hey"
        }, {
            id: 2,
            data1: "there"
        }];
    const obj2 = [{
            id: 2,
            data2: "hey"
        }];
    const o = DataBase.joinBy(obj1, obj2, (o1, o2) => o1.data1 === o2.data2).joined;
    const e = [{
            id: 2,
            data1: "hey",
            data2: "hey"
        }];
    t.deepEqual(o, e);
});
