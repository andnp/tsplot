"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var Matrix_1 = require("./utils/Matrix");
exports.Matrix = Matrix_1.default;
__export(require("./utils/MatrixUtils"));
__export(require("./utils/ArrayUtils"));
__export(require("./utils/MathUtils"));
__export(require("./LinePlots"));
__export(require("./Heatmaps"));
__export(require("./utils/PlotlyCharts"));
const RemoteSocket_i = require("./plotters/RemotePlotter");
const MapUtils_i = require("./utils/MapUtils");
const ObjectUtils_i = require("./utils/ObjectUtils");
const DataBase_i = require("./DataBase");
exports.RemoteSocket = RemoteSocket_i;
exports.MapUtils = MapUtils_i;
exports.ObjectUtils = ObjectUtils_i;
exports.DataBase = DataBase_i;
// should polyfill these out for use in browser
__export(require("./utils/Worker"));
__export(require("./DataLoader"));
__export(require("./Plotters"));
