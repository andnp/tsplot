import * as Bluebird from 'bluebird';
import * as Pool from 'generic-pool';
import * as uuid from 'uuid/v4';

const Threads = require('webworker-threads');

const Worker = Threads.Worker;

interface PoolLambda<T> extends Pool.Pool<T> {
    use(data: any): Bluebird<T>;
};

export function createPool<T, U>(funct: (x: U) => T): PoolLambda<T> {
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

    const pool = Pool.createPool({ create, destroy }, { min: 0, max: 8, autostart: false });
    const pool_mixin = {
        use(data: any) {
            const id = uuid();
            return Bluebird.resolve(pool.acquire())
                .then((w) => {
                    return new Bluebird((resolve) => {
                        w.postMessage({ id, data });
                        w.onmessage = (e) => {
                            if (e.data.id === id) resolve(e.data.data);
                            pool.release(w);
                        };
                    });
                });
        }
    };

    return Object.assign(pool as any, pool_mixin);
};
