"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bluebird = require("bluebird");
const Pool = require("generic-pool");
const uuid = require("uuid/v4");
const Threads = require('webworker-threads');
const Worker = Threads.Worker;
;
function createPool(funct) {
    const execString = `
        this.onmessage = (event) => {
            const data = (${funct.toString()})(event.data.data);
            const id = event.data.id;
            postMessage({id, data});
        };
    `;
    const create = () => {
        const w = new Worker(new Function(execString));
        return w;
    };
    const destroy = (w) => {
        w.terminate();
        return Promise.resolve(undefined);
    };
    const pool = Pool.createPool({ create, destroy }, { min: 0, max: 8, autostart: false });
    const pool_mixin = {
        use(data) {
            const id = uuid();
            return Bluebird.resolve(pool.acquire())
                .then((w) => {
                return new Bluebird((resolve) => {
                    w.postMessage({ id, data });
                    w.onmessage = (e) => {
                        if (e.data.id === id)
                            resolve(e.data.data);
                        pool.release(w);
                    };
                });
            });
        }
    };
    return Object.assign(pool, pool_mixin);
}
exports.createPool = createPool;
;
