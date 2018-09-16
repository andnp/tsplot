import * as _ from 'lodash';

export type primitive = number;
export type Dim = {rows: number, cols: number};
export type BufferConstructor = Uint8ArrayConstructor | Float32ArrayConstructor | Int32ArrayConstructor;
export type BufferType = Uint8Array | Float32Array | Int32Array;

export default class Matrix<B extends BufferConstructor = Float32ArrayConstructor> {
    private data: BufferType;
    private transposed: boolean = false;

    static Zeros(dim: Dim) {
        return new Matrix(Float32Array, dim).fill(0);
    };

    static fromMatrix(m: Matrix<any>) {
        const dims = m.dims();
        const Buffer = m.Buffer;

        return new Matrix(Buffer, dims).fill((i, j) => m.get(i, j));
    };

    static fromBuffer<B extends Buffer>(buffer: B, dim: Dim) {
        if (buffer instanceof Float32Array) {
            return new Matrix(Float32Array, dim).load(buffer);
        } else if (buffer instanceof Int32Array) {
            return new Matrix(Int32Array, dim).load(buffer);
        } else {
            return new Matrix(Uint8Array, dim).load(buffer);
        }
    }

    static fromData<B extends BufferConstructor = Float32ArrayConstructor>(data: primitive[][], Buf?: B) {
        const dims: Dim = { rows: data.length, cols: data[0].length };
        const Buffer = Buf || Float32Array;
        return new Matrix(Buffer, dims).fill((i, j) => data[i][j]);
    }

    private constructor(private Buffer: B, private dim: Dim) {
        this.data = new Buffer(dim.cols * dim.rows);
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

    private merge(m: Matrix<B>) {
        this.transposed = m.transposed;
        this.data = m.data;
        this.dim = m.dim;
        return this;
    }

    get(a: number, b: number) {
        this.boundaryCheck(a, b);
        if (this.transposed) return this.data[b * this.dims().rows + a];
        return this.data[a * this.dims().cols + b];
    };

    set(a: number, b: number, v: primitive) {
        this.boundaryCheck(a, b);
        if (this.transposed) this.data[b * this.dims().rows + a] = v;
        else this.data[a * this.dims().cols + b] = v;
        return this;
    };

    load(data: InstanceType<B>) {
        this.data = data;
        return this;
    };

    fill(f: ((i: number, j: number) => number) | number) {
        const g = typeof f === 'function' ? f : () => f;

        for (let i = 0; i < this.dims().rows; ++i) {
            for (let j = 0; j < this.dims().cols; ++j) {
                this.set(i, j, g(i, j));
            }
        }

        return this;
    }

    dims() {
        const dim1 = this.dim.rows;
        const dim2 = this.dim.cols;
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

        const m = new Matrix(this.Buffer, { rows: this.dim.rows + 1, cols: this.dim.cols });
        m.transposed = this.transposed
        m.fill((i, j) => {
            if (this.inBounds(i, j)) return this.get(i, j);
            return data[j];
        });

        this.merge(m);
    };

    addCol(data: Array<primitive>) {
        const { rows } = this.dims();
        if (data.length !== rows) throw new Error(`Col of length: ${data.length} does not match matrix rows: ${rows}`);

        const m = new Matrix(this.Buffer, { rows: this.dim.rows, cols: this.dim.cols + 1 });
        m.transposed = this.transposed;
        m.fill((i, j) => {
            if (this.inBounds(i, j)) return this.get(i, j);
            return data[i];
        });

        this.merge(m);
    };

    getRow(i: number) {
        this.boundaryCheck(i, 0);
        const row = [];
        for (let j = 0; j < this.dims().cols; ++j) {
            row.push(this.get(i, j));
        }
        return row;
    };

    getCol(i: number) {
        this.boundaryCheck(0, i);
        const ret = [];
        const { rows } = this.dims();
        for (let j = 0; j < rows; ++j) {
            ret.push(this.get(j, i));
        }
        return ret;
    };

    getData() {
        return _.cloneDeep(this.data);
    };

    forceReshape(dims: Dim) {
        const m = new Matrix(this.Buffer, dims);
        m.transposed = this.transposed;

        m.fill((i, j) => {
            if (this.inBounds(i, j)) return this.get(i, j);
            return 0;
        });

        this.merge(m);
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

    equal(m: Matrix<any>) {
        if (this.dims().rows !== m.dims().rows || this.dims().cols !== m.dims().cols) return false;

        for (let i = 0; i < this.dims().rows; ++i) {
            for (let j = 0; j < this.dims().cols; ++j) {
                if (this.get(i, j) !== m.get(i, j)) return false;
            }
        }

        return true;
    }
}
