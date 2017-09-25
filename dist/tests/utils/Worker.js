"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const _ = require("lodash");
const Worker = require("../../utils/Worker");
Promise = require('bluebird');
ava_1.default("Can distribute simple function to many threads", async (t) => {
    const work = (i) => i + 1;
    const pool = Worker.createPool(work);
    await pool.use(2)
        .then((data) => {
        t.is(data, 3);
    });
});
ava_1.default('Worker pool can execute more complicated functions', async (t) => {
    const work = (d) => {
        const out = d;
        for (let i = 0; i < d.length; ++i)
            out[i] += 1;
        return out;
    };
    const pool = Worker.createPool(work);
    await pool.use([1, 2, 3, 4, 5])
        .then((data) => {
        t.deepEqual(data, [2, 3, 4, 5, 6]);
    });
});
ava_1.default('Worker pool can execute nested functions', async (t) => {
    const work = (d) => {
        const out = [];
        for (let i = 0; i < d.length; ++i)
            out.push(Math.ceil(d[i]));
        return out;
    };
    const pool = Worker.createPool(work);
    await pool.use([1.1, 2.2, 3.3, 4.4, 5.5])
        .then((data) => {
        t.deepEqual(data, [2, 3, 4, 5, 6]);
    });
});
ava_1.default('Worker pool can execute many functions', async (t) => {
    const work = (i) => i + 1;
    const pool = Worker.createPool(work);
    const promises = _.times(1000, () => {
        return pool.use(2)
            .then((data) => {
            t.is(data, 3);
        });
    });
    await Promise.all(promises);
});
