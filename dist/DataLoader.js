"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Glob = require("glob");
const Worker = require("./utils/Worker");
const Matrix_1 = require("./utils/Matrix");
Promise = require('bluebird');
;
;
function loadFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.location, (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    })
        .then((raw) => {
        const buffer = { raw };
        return Object.assign(path, buffer);
    });
}
exports.loadFile = loadFile;
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
    const str = buffer.raw.toString();
    return CSVParsePool.use(str)
        .then((data) => {
        return new Matrix_1.default(data);
    });
}
exports.readCSV = readCSV;
function readGlob(path) {
    return new Promise((resolve, reject) => {
        Glob(path.location, (err, files) => {
            if (err)
                reject(err);
            else
                resolve(files);
        });
    })
        .then((files) => {
        return files.map((file) => {
            const path = {
                location: file
            };
            return path;
        });
    });
}
exports.readGlob = readGlob;
;
