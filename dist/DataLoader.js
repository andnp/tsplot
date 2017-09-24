"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Glob = require("glob");
var Worker = require("./utils/Worker");
var Matrix_1 = require("./utils/Matrix");
Promise = require('bluebird');
;
;
function loadFile(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path.location, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    })
        .then(function (raw) {
        var buffer = { raw: raw };
        return Object.assign(path, buffer);
    });
}
exports.loadFile = loadFile;
var parseCsvString = function (str) {
    var rows = str.split('\n');
    var mat = [];
    for (var i = 0; i < rows.length; ++i) {
        var cols = rows[i].split(',');
        if (cols.length === 1 && cols[0] === '')
            continue;
        var row = [];
        for (var j = 0; j < cols.length; ++j) {
            if (!(j === cols.length - 1 && cols[j] === ''))
                row.push(parseFloat(cols[j]));
        }
        mat.push(row);
    }
    return mat;
};
var CSVParsePool = Worker.createPool(parseCsvString);
function readCSV(buffer) {
    var str = buffer.raw.toString();
    return CSVParsePool.use(str)
        .then(function (data) {
        return new Matrix_1.default(data);
    });
}
exports.readCSV = readCSV;
function readGlob(path) {
    return new Promise(function (resolve, reject) {
        Glob(path.location, function (err, files) {
            if (err)
                reject(err);
            else
                resolve(files);
        });
    })
        .then(function (files) {
        return files.map(function (file) {
            var path = {
                location: file
            };
            return path;
        });
    });
}
exports.readGlob = readGlob;
;
