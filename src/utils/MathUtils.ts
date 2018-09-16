import * as _ from 'lodash';

type primitive = string | number | boolean | null | undefined;
export function cartesianProduct(obj: Record<string, primitive[]>) {
    const keys = Object.keys(obj);
    const settings: Record<string, primitive>[] = [];
    let count = 1;
    keys.forEach((k) => {
        count *= obj[k].length;
    });

    for (let i = 0; i < count; ++i) {
        let accum = 1;
        const setting: Record<string, primitive> = {};
        keys.forEach((k) => {
            const p = obj[k];
            setting[k] = p[Math.floor(i / accum) % p.length];
            accum *= p.length;
        });
        settings.push(setting);
    }

    return settings;
}

export function weightedMean(weights: Record<string, number>, x: Record<string, number>) {
    const keys = _.keys(weights);
    const dot = _.sum(keys.map((key) => {
        const weight = weights[key];
        const value = x[key] ? x[key] : 0;
        return weight * value;
    }));
    return dot;
}

export function isClose(x: number, y: number): boolean {
    return Math.abs(x - y) < 1e-7;
}
