"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class Matrix {
    constructor(data) {
        this.data = [];
        this.transposed = false;
        this.load(data);
    }
    static Zeros(dim) {
        const { rows, cols } = dim;
        const m = [];
        for (let i = 0; i < rows; ++i) {
            const row = [];
            for (let j = 0; j < cols; ++j) {
                row.push(0);
            }
            m.push(row);
        }
        return new Matrix(m);
    }
    ;
    static from(m) {
        const { rows, cols } = m.dims();
        const n = Matrix.Zeros(m.dims());
        for (let i = 0; i < rows; ++i) {
            for (let j = 0; j < cols; ++j) {
                n.set(i, j, m.get(i, j));
            }
        }
        return n;
    }
    ;
    ;
    inBounds(a, b) {
        const { rows, cols } = this.dims();
        return a >= 0 &&
            b >= 0 &&
            a < rows &&
            b < cols;
    }
    ;
    boundaryCheck(a, b) {
        const { rows, cols } = this.dims();
        if (!this.inBounds(a, b))
            throw new Error(`Out-of-bounds: (${a}, ${b}) is out of bounds for (${rows}, ${cols}) matrix`);
    }
    ;
    get(a, b) {
        this.boundaryCheck(a, b);
        if (this.transposed)
            return this.data[b][a];
        return this.data[a][b];
    }
    ;
    set(a, b, v) {
        this.boundaryCheck(a, b);
        if (this.transposed)
            this.data[b][a] = v;
        else
            this.data[a][b] = v;
    }
    ;
    load(data) {
        this.data = data;
    }
    ;
    dims() {
        const dim1 = this.data.length;
        const dim2 = this.data[0].length;
        return {
            rows: this.transposed ? dim2 : dim1,
            cols: this.transposed ? dim1 : dim2
        };
    }
    ;
    transpose() {
        this.transposed = !this.transposed;
    }
    ;
    addRow(data) {
        const { cols } = this.dims();
        if (data.length !== cols)
            throw new Error(`Row of length: ${data.length} does not match matrix cols: ${cols}`);
        this.data.push(data);
    }
    ;
    addCol(data) {
        const { rows } = this.dims();
        if (data.length !== rows) {
            console.log(data, this.data);
            throw new Error(`Col of length: ${data.length} does not match matrix rows: ${rows}`);
        }
        for (let i = 0; i < rows; ++i) {
            this.data[i].push(data[i]);
        }
    }
    ;
    getRow(i) {
        this.boundaryCheck(i, 0);
        return this.data[i];
    }
    ;
    getCol(i) {
        this.boundaryCheck(0, i);
        const ret = [];
        const { rows } = this.dims();
        for (let j = 0; j < rows; ++j) {
            ret.push(this.data[j][i]);
        }
        return ret;
    }
    ;
    getData() {
        return _.cloneDeep(this.data);
    }
    ;
    forceReshape(dims) {
        const { rows, cols } = dims;
        const newData = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                if (j < this.dims().cols && i < this.dims().rows)
                    row.push(this.get(i, j));
                else
                    row.push(0);
            }
            newData.push(row);
        }
        this.data = newData;
    }
    ;
    print(digits = 3) {
        const { rows, cols } = this.dims();
        for (let i = 0; i < rows; ++i) {
            for (let j = 0; j < cols; ++j) {
                const x = this.get(i, j).toFixed(digits);
                process.stdout.write(`${x} `);
            }
            process.stdout.write('\n');
        }
    }
}
exports.default = Matrix;
