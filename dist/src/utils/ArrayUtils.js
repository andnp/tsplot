"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUnique(arr) {
    const m = {};
    arr.forEach((x) => m[x] = 0);
    return Object.keys(m).map(parseFloat).sort();
}
exports.getUnique = getUnique;
;
