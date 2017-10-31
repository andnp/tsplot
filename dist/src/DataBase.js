"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function joinBy(arr1, arr2, comp) {
    const notJoined = [[], []];
    const arr2Joined = [];
    const keyed2 = arr2.map((obj2, i) => {
        return {
            data: obj2,
            id: i
        };
    });
    const joined = _.filter(arr1.map((obj1) => {
        const match = keyed2.filter((keyed) => comp(obj1, keyed.data))[0];
        if (!match) {
            notJoined[0].push(obj1);
            return;
        }
        arr2Joined.push(match.id);
        return _.merge(obj1, match.data);
    }));
    const opposite = _.difference(_.times(arr2.length, (i) => i), arr2Joined);
    notJoined[1] = opposite.map((i) => arr2[i]);
    return {
        joined,
        notJoined
    };
}
exports.joinBy = joinBy;
function join(arr1, arr2, key) {
    return joinBy(arr1, arr2, (t, u) => t[key] === u[key]);
}
exports.join = join;
