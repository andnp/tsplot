"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Matrix {
    constructor(data) {
        this.data = [];
        this.transposed = false;
        this.load(data);
    }
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
            this.data[a][b] = v;
        else
            this.data[b][a] = v;
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
}
exports.default = Matrix;
