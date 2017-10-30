"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function join(arr1, arr2, key) {
    return _.filter(arr1.map((obj1) => {
        const match = arr2.filter((obj2) => obj2[key] === obj1[key])[0];
        if (!match)
            return;
        return _.merge(obj1, match);
    }));
}
exports.join = join;
function joinBy(arr1, arr2, comp) {
    return _.filter(arr1.map((obj1) => {
        const match = arr2.filter((u) => comp(obj1, u))[0];
        if (!match)
            return;
        return _.merge(obj1, match);
    }));
}
exports.joinBy = joinBy;
