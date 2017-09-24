import * as Pool from 'generic-pool';
import * as uuid from 'uuid/v4';

Promise = require('bluebird');
const Threads = require('webworker-threads');

const Worker = Threads.Worker;

interface PoolLambda<t> extends Pool.Pool<t> {
    use: (data: any) => Promise<t>;
};

export function createPool(funct: Function): PoolLambda<Object> {
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

    const destroy = (w: Worker) => {
        w.terminate();
        return Promise.resolve(undefined);
    };

    const pool = Pool.createPool({ create, destroy }, { min: 2, max: 8, autostart: false });
    const pool_mixin = {
        use(data: any) {
            const id = uuid();
            return pool.acquire()
                .then((w) => {
                    return new Promise((resolve) => {
                        w.postMessage({ id, data });
                        w.onmessage = (e) => {
                            if (e.data.id === id) resolve(e.data.data);
                            pool.release(w);
                        };
                    });
                });
        }
    };

    return Object.assign(pool, pool_mixin);
};
