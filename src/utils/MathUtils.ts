import { Dictionary_t } from '../utils/tsUtils';
import * as _ from 'lodash';

type primitive = string | number | boolean | null | undefined;
export function cartesianProduct(obj: Dictionary_t<primitive[]>) {
    const keys = Object.keys(obj);
    const settings: Dictionary_t<primitive>[] = [];
    let count = 1;
    keys.forEach((k) => {
        count *= obj[k].length;
    });

    for (let i = 0; i < count; ++i) {
        let accum = 1;
        const setting: Dictionary_t<primitive> = {};
        keys.forEach((k) => {
            const p = obj[k];
            setting[k] = p[Math.floor(i / accum) % p.length];
            accum *= p.length;
        });
        settings.push(setting);
    }

    return settings;
}

export function weightedMean(weights: Dictionary_t<number>, x: Dictionary_t<number>) {
    const keys = _.keys(weights);
    const dot = _.sum(keys.map((key) => {
        const weight = weights[key];
        const value = x[key] ? x[key] : 0;
        return weight * value;
    }));
    return dot;
}
