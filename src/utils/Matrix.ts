type primitive = string | number;
type Dim = {rows: number, cols: number};
class Matrix {
    private data: Array<Array<primitive>> = [];
    private transposed: boolean = false;

    constructor(data: Array<Array<primitive>>) {
        this.data = data;
    };

    get(a: number, b: number) : primitive {
        if (this.transposed) return this.data[b][a];
        return this.data[a][b];
    };

    set(a: number, b: number, v: primitive) : void {
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
