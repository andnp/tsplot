"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const PlotlyCharts = require("./utils/PlotlyCharts");
;
const getHeatmapObject = (z, options) => {
    return _.mergeWith({
        type: 'heatmap',
        z: z.getData()
    }, options);
};
const getHeatmapLayout = (options) => {
    return _.merge({
        xaxis: {
            ticks: ''
        },
        yaxis: {
            ticks: ''
        },
        margin: {
            l: 60, b: 40, r: 40, t: 40
        }
    }, options);
};
function generateHeatmap(m, options) {
    const opts = _.mergeWith({
        trace: [],
        layout: {},
        name: 'no name'
    }, options);
    const trace = getHeatmapObject(m, opts.trace[0]);
    const layout = getHeatmapLayout(opts.layout);
    return new PlotlyCharts.Chart([trace], layout, opts.name);
}
exports.generateHeatmap = generateHeatmap;
