export type primitive = string | number;
export type Dim = {rows: number, cols: number};
class Matrix {
    private data: Array<Array<primitive>> = [];
    private transposed: boolean = false;

    constructor(data: Array<Array<primitive>>) {
        this.load(data);
    };

    inBounds(a: number, b: number) : boolean {
        const { rows, cols } = this.dims();
        return  a >= 0 &&
                b >= 0 &&
                a < rows &&
                b < cols;
    };

    private boundaryCheck(a: number, b: number) : void {
        const { rows, cols } = this.dims();
        if (!this.inBounds(a, b))
            throw new Error(`Out-of-bounds: (${a}, ${b}) is out of bounds for (${rows}, ${cols}) matrix`);
    };

    get(a: number, b: number) : primitive {
        this.boundaryCheck(a, b);
        if (this.transposed) return this.data[b][a];
        return this.data[a][b];
    };

    set(a: number, b: number, v: primitive) : void {
        this.boundaryCheck(a, b);
        if (this.transposed) this.data[a][b] = v;
        else this.data[b][a] = v;
    };

    load(data: Array<Array<primitive>>) : void {
        this.data = data;
    };

    dims() : Dim {
        const dim1 = this.data.length;
        const dim2 = this.data[0].length;
        return {
            rows: this.transposed ? dim2 : dim1,
            cols: this.transposed ? dim1 : dim2
        };
    };

    transpose() : void {
        this.transposed = !this.transposed;
    }
}

export default Matrix;
