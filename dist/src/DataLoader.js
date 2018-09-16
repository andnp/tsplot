"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bluebird = require("bluebird");
const fs = require("fs");
const Glob = require("glob");
const Worker = require("./utils/Worker");
const Matrix_1 = require("./utils/Matrix");
function loadFile(path) {
    return new Bluebird((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
}
exports.loadFile = loadFile;
function loadJSON(path) {
    return loadFile(path).then((buffer) => JSON.parse(buffer.toString()));
}
exports.loadJSON = loadJSON;
;
const parseCsvString = (str) => {
    const rows = str.split('\n');
    const mat = [];
    for (let i = 0; i < rows.length; ++i) {
        const cols = rows[i].split(',');
        if (cols.length === 1 && cols[0] === '')
            continue;
        const row = [];
        for (let j = 0; j < cols.length; ++j) {
            if (!(j === cols.length - 1 && cols[j] === ''))
                row.push(parseFloat(cols[j]));
        }
        mat.push(row);
    }
    return mat;
};
const CSVParsePool = Worker.createPool(parseCsvString);
function readCSV(buffer) {
    const str = buffer.toString();
    return CSVParsePool.use(str)
        .then((data) => {
        return Matrix_1.default.fromData(data);
    });
}
exports.readCSV = readCSV;
function readGlob(path) {
    return new Bluebird((resolve, reject) => {
        Glob(path, (err, files) => {
            if (err)
                reject(err);
            else
                resolve(files);
        });
    });
}
exports.readGlob = readGlob;
;
