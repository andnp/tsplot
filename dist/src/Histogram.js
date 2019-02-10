"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const PlotlyCharts_1 = require("./utils/PlotlyCharts");
class Histogram extends PlotlyCharts_1.Chart {
    constructor(trace, layout) {
        super([], layout);
        this.trace = [Object.assign({ x: [] }, trace, { type: 'histogram' })];
        // set opinionated layout defaults for line plots
        this.layout = _.merge({
            xaxis: {
                showgrid: false,
                zeroline: false,
                showline: true,
            },
            margin: {
                l: 80, b: 60, r: 40, t: 40,
            },
            showlegend: false,
            legend: { bgcolor: 'transparent' },
            font: {
                size: 20,
                family: 'Times New Roman',
            },
        }, layout);
    }
    setColor(c) {
        this.trace.forEach(trace => _.set(trace, 'marker.color', c.toRGBString()));
        return this;
    }
    setOpacity(a) {
        this.trace.forEach(trace => trace.opacity = a);
        return this;
    }
    overlay(b = true) {
        if (b)
            this.editLayout({ barmode: 'overlay' });
        else
            this.editLayout({ barmode: undefined });
        return this;
    }
    binSize(size) {
        this.trace.forEach(trace => {
            trace.autobinx = false;
            trace.xbins = _.merge(trace.xbins, {
                size,
            });
        });
        return this;
    }
    static fromArray(arr) {
        return new Histogram({
            x: arr,
        });
    }
}
exports.Histogram = Histogram;
