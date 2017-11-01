"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUnique(arr) {
    const m = {};
    arr.forEach((x) => m[x] = 0);
    const unique = Object.keys(m);
    if (typeof arr[0] === 'number')
        return unique.map(parseFloat).sort();
    return Object.keys(m).sort();
}
exports.getUnique = getUnique;
;
