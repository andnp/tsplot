"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pool = require("generic-pool");
var uuid = require("uuid/v4");
Promise = require('bluebird');
var Threads = require('webworker-threads');
var Worker = Threads.Worker;
;
function createPool(funct) {
    var execString = "\n        this.onmessage = (event) => {\n            const data = (" + funct.toString() + ")(event.data.data);\n            const id = event.data.id;\n            postMessage({id, data});\n        };\n    ";
    var create = function () {
        var w = new Worker(new Function(execString));
        return w;
    };
    var destroy = function (w) {
        w.terminate();
        return Promise.resolve(undefined);
    };
    var pool = Pool.createPool({ create: create, destroy: destroy }, { min: 2, max: 8, autostart: false });
    var pool_mixin = {
        use: function (data) {
            var id = uuid();
            return pool.acquire()
                .then(function (w) {
                return new Promise(function (resolve) {
                    w.postMessage({ id: id, data: data });
                    w.onmessage = function (e) {
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
