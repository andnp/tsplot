"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const PlotlyCharts = require("./utils/PlotlyCharts");
const color_palette = [
    [57, 106, 177],
    [218, 124, 48],
    [62, 150, 81],
    [204, 37, 41],
    [83, 81, 84],
    [107, 76, 154],
    [146, 36, 40],
    [148, 139, 61]
];
let colorIndex = 0;
const getColor = () => color_palette[colorIndex++ % color_palette.length];
;
const getLineObject = (x, y, options) => {
    const [r, g, b] = options && options.line && options.line.color ? [0, 0, 0] : getColor();
    return _.mergeWith({
        type: 'scatter',
        mode: 'lines',
        x, y,
        line: {
            width: 1,
            color: `rgb(${r}, ${g}, ${b})`,
            shape: 'spline'
        }
    }, options);
};
const getLineLayout = (min, max, options) => {
    return _.mergeWith({
        xaxis: {
            showgrid: false,
            zeroline: false,
            showline: true
        },
        yaxis: {
            range: [min - .1 * min, max + .1 * max],
            showline: true,
            zeroline: false
        },
        margin: {
            l: 60, b: 40, r: 40, t: 40
        },
        showlegend: false
    }, options);
};
function generateLinePlot(array, options) {
    const x = _.times(array.length, (i) => i);
    const y = array;
    // There's no way these should be undefined, but their typings imply that they might be
    const min = _.min(y) || 0;
    const max = _.max(y) || 10;
    const trace = getLineObject(x, y, options && options.trace[0]);
    const layout = getLineLayout(min, max, options && options.layout);
    return new PlotlyCharts.Chart([trace], layout, options && options.name);
}
exports.generateLinePlot = generateLinePlot;
function generateLinePlot_ste(array, options) {
    const x = _.times(array.length, (i) => i);
    const y = array.map((a) => a.mean);
    // There's no way these should be undefined, but their typings imply that they might be
    const min = _.min(y) || 0;
    const max = _.max(y) || 10;
    if (!options.trace[0])
        options.trace[0] = {};
    options.trace[0].name = options.name;
    const trace = getLineObject(x, y, options.trace[0]);
    const ste_x = [...x, ..._.reverse([...x])];
    const ste_y = [];
    for (let i = 0; i < y.length; ++i)
        ste_y.push(y[i] - (array[i].stderr || 0));
    for (let i = y.length - 1; i >= 0; --i)
        ste_y.push(y[i] + (array[i].stderr || 0));
    colorIndex--;
    const [r, g, b] = getColor();
    colorIndex--;
    const ste_trace = getLineObject(ste_x, ste_y, {});
    ste_trace.line.color = "transparent";
    ste_trace.fill = "tozeroy";
    ste_trace.fillcolor = `rgba(${r}, ${g}, ${b}, 0.2)`;
    ste_trace.showlegend = false;
    const layout = getLineLayout(min, max, _.merge({
        showlegend: true,
        legend: {
            orientation: "h"
        }
    }, options.layout));
    return new PlotlyCharts.Chart([trace, ste_trace], layout, options.name);
}
exports.generateLinePlot_ste = generateLinePlot_ste;
