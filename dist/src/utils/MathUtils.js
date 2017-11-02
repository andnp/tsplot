"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function cartesianProduct(obj) {
    const keys = Object.keys(obj);
    const settings = [];
    let count = 1;
    keys.forEach((k) => {
        count *= obj[k].length;
    });
    for (let i = 0; i < count; ++i) {
        let accum = 1;
        const setting = {};
        keys.forEach((k) => {
            const p = obj[k];
            setting[k] = p[Math.floor(i / accum) % p.length];
            accum *= p.length;
        });
        settings.push(setting);
    }
    return settings;
}
exports.cartesianProduct = cartesianProduct;
function weightedMean(weights, x) {
    const keys = _.keys(weights);
    const dot = _.sum(keys.map((key) => {
        const weight = weights[key];
        const value = x[key] ? x[key] : 0;
        return weight * value;
    }));
    return dot / _.keys(x).length;
}
exports.weightedMean = weightedMean;
