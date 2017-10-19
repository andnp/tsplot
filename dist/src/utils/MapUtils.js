"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function forEach(map, func) {
    Array.from(map.keys()).forEach((key) => {
        const item = map.get(key);
        func(item, key);
    });
}
exports.forEach = forEach;
function map(map, func) {
    return Array.from(map.keys()).map((key) => {
        const item = map.get(key);
        return func(item, key);
    });
}
exports.map = map;
