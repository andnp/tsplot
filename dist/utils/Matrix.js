"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Matrix = /** @class */ (function () {
    function Matrix(data) {
        this.data = [];
        this.transposed = false;
        this.data = data;
    }
    ;
    Matrix.prototype.get = function (a, b) {
        if (this.transposed)
            return this.data[b][a];
        return this.data[a][b];
    };
    ;
    Matrix.prototype.set = function (a, b, v) {
        if (this.transposed)
            this.data[a][b] = v;
        else
            this.data[b][a] = v;
    };
    ;
    Matrix.prototype.load = function (data) {
        this.data = data;
    };
    ;
    Matrix.prototype.dims = function () {
        var dim1 = this.data.length;
        var dim2 = this.data[0].length;
        return {
            rows: this.transposed ? dim2 : dim1,
            cols: this.transposed ? dim1 : dim2
        };
    };
    ;
    Matrix.prototype.transpose = function () {
        this.transposed = !this.transposed;
    };
    return Matrix;
}());
exports.default = Matrix;
