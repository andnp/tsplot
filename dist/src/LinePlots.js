"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const utilities_ts_1 = require("utilities-ts");
const PlotlyCharts = require("./utils/PlotlyCharts");
;
class LineChart extends PlotlyCharts.Chart {
    constructor(trace, layout) {
        super([], layout);
        const min = _.min(trace.y) || 0;
        const max = _.max(trace.y) || 1;
        const range = Math.abs(max - min);
        // set necessary parts of trace for this to be a line
        this.trace = [Object.assign({ x: [], y: [] }, trace, { type: 'scatter', mode: 'lines', line: Object.assign({ shape: 'spline' }, trace.line) })];
        // set opinionated layout defaults for line plots
        this.layout = _.merge({
            xaxis: {
                showgrid: false,
                zeroline: false,
                showline: true,
            },
            yaxis: {
                range: [min - .05 * range, max + .05 * range],
                showline: true,
                zeroline: false,
                dtick: (range / 3).toPrecision(1),
            },
            margin: {
                l: 80, b: 40, r: 40, t: 40,
            },
            showlegend: false,
            font: {
                size: 20,
                family: 'Times New Roman',
            },
        }, layout);
    }
    getLineTrace() { return this.trace[0]; }
    getSteTrace() { return this.trace[1]; }
    getColor() { return this.getLineTrace().line.color; }
    setColor(c) {
        this.getLineTrace().line.color = c.toRGBString();
        const steTrace = this.getSteTrace();
        if (steTrace) {
            steTrace.line.color = c.toRGBAString(.1);
            steTrace.fillcolor = c.toRGBAString(.2);
        }
    }
    setXValues(x) {
        this.getLineTrace().x = x;
        const steTrace = this.getSteTrace();
        if (steTrace)
            steTrace.x = steXValues(x);
    }
    label(name) {
        this.getLineTrace().name = name;
        this.showLegend();
    }
    editLayout(layout) {
        this.layout = _.merge(this.layout, layout);
        return this;
    }
    showLegend() {
        this.editLayout({ showlegend: true, legend: { orientation: 'h' } });
    }
    static fromArray(arr) {
        const x = _.times(arr.length, i => i);
        const y = arr;
        return new LineChart({ x, y });
    }
    static fromArrayStats(arr) {
        const linePlot = this.fromArray(arr.map(utilities_ts_1.fp.prop('mean')));
        const { x, y } = linePlot.getLineTrace();
        const ste_x = steXValues(x);
        const ste_y = [];
        for (let i = 0; i < y.length; ++i)
            ste_y.push(y[i] - (arr[i].stderr || 0));
        for (let i = y.length - 1; i >= 0; --i)
            ste_y.push(y[i] + (arr[i].stderr || 0));
        const stePlot = this.fromArray(ste_y);
        stePlot.trace[0] = Object.assign({}, stePlot.trace[0], { x: ste_x, line: {
                shape: 'spline',
            }, fill: 'tozeroy', showlegend: false });
        linePlot.trace.push(stePlot.trace[0]);
        return linePlot;
    }
}
exports.LineChart = LineChart;
function steXValues(x) {
    return [...x, ..._.reverse([...x])];
}
