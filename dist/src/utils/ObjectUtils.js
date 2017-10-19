"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function flattenKeys(obj) {
    const retObj = {};
    const recurObject = (obj, path) => {
        const join = path.length === 0 ? '' : '.';
        if (_.isArray(obj)) {
            obj.forEach((val, i) => recurObject(val, path + join + `[${i}]`));
            return;
        }
        if (!_.isPlainObject(obj)) {
            retObj[path] = obj;
            return;
        }
        Object.keys(obj).forEach((key) => {
            recurObject(obj[key], path + join + key);
        });
    };
    recurObject(obj, '');
    return retObj;
}
exports.flattenKeys = flattenKeys;
