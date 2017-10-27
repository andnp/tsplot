import test from 'ava';

import * as DataBase from 'DataBase';

test("Can join two arrays of objects with matching key", async t => {
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

    const o = DataBase.join(obj1, obj2, 'id');
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

test("Can join two arrays of objects with matching key and missing data", async t => {
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

    const o = DataBase.join(obj1, obj2, 'id');
    const e = [{
        id: 2,
        data1: "there",
        data2: "merp"
    }];
    t.deepEqual(o, e);
});
