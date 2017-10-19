import Matrix from './Matrix';
import * as _ from 'lodash';

export function appendRight(matrices: Array<Matrix>) {
    const o = new Matrix(matrices[0].getData());
    for (let i = 1; i < matrices.length; ++i) {
        const m = matrices[i];
        const { rows, cols } = m.dims();
        for (let j = 0; j < cols; ++j) {
            o.addCol(m.getCol(j));
        }
    }
    return o;
}

export interface ArrayStats {
    mean: number;
    stderr: number;
    count: number;
};

function standardError(arr: Array<number>) {
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
};

function describe(arr: Array<number>) {
    return {
        mean: _.mean(arr),
        stderr: standardError(arr),
        count: arr.length
    }
}

export function describeColumns(m : Matrix) {
    const { cols } = m.dims();
    return _.times<ArrayStats>(cols, (i) => {
        const col = m.getCol(i);
        return describe(col);
    });
};

export function describeRows(m : Matrix) {
    const { rows } = m.dims();
    return _.times<ArrayStats>(rows, (i) => {
        const row = m.getRow(i);
        return describe(row);
    });
};
