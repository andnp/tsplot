import Matrix from './Matrix';
import * as _ from 'lodash';

export function appendRight(matrices: Array<Matrix<any>>) {
    const o = Matrix.fromMatrix(matrices[0]);
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

export interface DescriptionOptions_t {
    ignoreNan: boolean;
}

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

function describe(arr: Array<number>, options?: DescriptionOptions_t) {
    let recoded = arr;
    if (options) {
        recoded = options.ignoreNan ? arr.filter((k) => !_.isNaN(k)) : recoded;
    }
    return {
        mean: _.mean(recoded),
        stderr: standardError(recoded) || 0,
        count: recoded.length
    }
}

export function describeColumns(m : Matrix, options?: DescriptionOptions_t) {
    const { cols } = m.dims();
    return _.times<ArrayStats>(cols, (i) => {
        const col = m.getCol(i);
        return describe(col, options);
    });
};

export function describeRows(m : Matrix, options?: DescriptionOptions_t) {
    const { rows } = m.dims();
    return _.times<ArrayStats>(rows, (i) => {
        const row = m.getRow(i);
        return describe(row, options);
    });
};
