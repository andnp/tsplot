"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LocalPlot = require("./plotters/LocalPlotter");
const Bluebird = require("bluebird");
const _ = require("lodash");
function savePNG(charts, options) {
    const promises = charts.map((chart) => {
        const opts = _.mergeWith({
            name: chart.name,
            path: 'plots'
        }, options);
        return LocalPlot.plot(chart.trace, chart.layout, opts);
    });
    return Bluebird.all(promises);
}
exports.savePNG = savePNG;
