"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matrix_1 = require("./Matrix");
const _ = require("lodash");
function appendRight(matrices) {
    const o = new Matrix_1.default(matrices[0].getData());
    for (let i = 1; i < matrices.length; ++i) {
        const m = matrices[i];
        const { rows, cols } = m.dims();
        for (let j = 0; j < cols; ++j) {
            o.addCol(m.getCol(j));
        }
    }
    return o;
}
exports.appendRight = appendRight;
;
function standardError(arr) {
    let n = 0;
    let m = 0;
    let m2 = 0;
    arr.forEach((x) => {
        n++;
        let delta = x - m;
        m += delta / n;
        let d2 = x - m;
        m2 += delta * d2;
    });
    let variance = m2 / (n - 1);
    return Math.sqrt(variance) / Math.sqrt(arr.length);
}
;
function describe(arr, options) {
    let recoded = arr;
    if (options) {
        recoded = options.ignoreNan ? arr.filter((k) => !_.isNaN(k)) : recoded;
    }
    return {
        mean: _.mean(recoded),
        stderr: standardError(recoded) || 0,
        count: recoded.length
    };
}
function describeColumns(m, options) {
    const { cols } = m.dims();
    return _.times(cols, (i) => {
        const col = m.getCol(i);
        return describe(col, options);
    });
}
exports.describeColumns = describeColumns;
;
function describeRows(m, options) {
    const { rows } = m.dims();
    return _.times(rows, (i) => {
        const row = m.getRow(i);
        return describe(row, options);
    });
}
exports.describeRows = describeRows;
;
