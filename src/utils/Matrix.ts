import * as _ from 'lodash';

export type primitive = number;
export type Dim = {rows: number, cols: number};
export default class Matrix {
    private data: Array<Array<primitive>> = [];
    private transposed: boolean = false;

    static Zeros(dim: Dim) {
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
    };

    static from(m: Matrix) {
        const { rows, cols } = m.dims();
        const n = Matrix.Zeros(m.dims());
        for (let i = 0; i < rows; ++i) {
            for (let j = 0; j < cols; ++j) {
                n.set(i, j, m.get(i, j));
            }
        }
        return n;
    };

    constructor(data: Array<Array<primitive>>) {
        this.load(data);
    };

    inBounds(a: number, b: number) {
        const { rows, cols } = this.dims();
        return  a >= 0 &&
                b >= 0 &&
                a < rows &&
                b < cols;
    };

    private boundaryCheck(a: number, b: number) {
        const { rows, cols } = this.dims();
        if (!this.inBounds(a, b))
            throw new Error(`Out-of-bounds: (${a}, ${b}) is out of bounds for (${rows}, ${cols}) matrix`);
    };

    get(a: number, b: number) {
        this.boundaryCheck(a, b);
        if (this.transposed) return this.data[b][a];
        return this.data[a][b];
    };

    set(a: number, b: number, v: primitive) {
        this.boundaryCheck(a, b);
        if (this.transposed) this.data[b][a] = v;
        else this.data[a][b] = v;
    };

    load(data: Array<Array<primitive>>) {
        this.data = data;
    };


    dims() {
        const dim1 = this.data.length;
        const dim2 = this.data[0].length;
        return {
            rows: this.transposed ? dim2 : dim1,
            cols: this.transposed ? dim1 : dim2
        };
    };

    transpose() {
        this.transposed = !this.transposed;
    };

    addRow(data: Array<primitive>) {
        const { cols } = this.dims();
        if (data.length !== cols) throw new Error(`Row of length: ${data.length} does not match matrix cols: ${cols}`);
        this.data.push(data);
    };

    addCol(data: Array<primitive>) {
        const { rows } = this.dims();
        if (data.length !== rows) {
            console.log(data, this.data)
            throw new Error(`Col of length: ${data.length} does not match matrix rows: ${rows}`);
        }
        for (let i = 0; i < rows; ++i) {
            this.data[i].push(data[i]);
        }
    };

    getRow(i: number) {
        this.boundaryCheck(i, 0);
        return this.data[i];
    };

    getCol(i: number) {
        this.boundaryCheck(0, i);
        const ret = [];
        const { rows } = this.dims();
        for (let j = 0; j < rows; ++j) {
            ret.push(this.data[j][i]);
        }
        return ret;
    };

    getData() {
        return _.cloneDeep(this.data);
    };

    forceReshape(dims: Dim) {
        const { rows, cols } = dims;
        const newData = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                if (j < this.dims().cols && i < this.dims().rows) row.push(this.get(i, j));
                else row.push(0);
            }
            newData.push(row);
        }
        this.data = newData;
    };

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
