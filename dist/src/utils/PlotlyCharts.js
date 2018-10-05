"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
;
;
class Chart {
    constructor(trace, layout, name) {
        this.layout = layout || {};
        this.trace = trace || [];
        this.name = name || 'default_name';
    }
    ;
    title(name) {
        this.layout.title = name;
        return this;
    }
    xLabel(name) {
        if (!this.layout.xaxis) {
            this.layout.xaxis = { title: name };
        }
        else {
            this.layout.xaxis.title = name;
        }
        return this;
    }
    yLabel(name) {
        if (!this.layout.yaxis) {
            this.layout.yaxis = { title: name };
        }
        else {
            this.layout.yaxis.title = name;
        }
        return this;
    }
}
exports.Chart = Chart;
function combineTraces(plots, name) {
    let traces = [];
    plots.forEach((plot) => {
        traces = traces.concat(plot.trace);
    });
    const xrange = _.filter(plots.map((plot) => {
        if (plot.layout.xaxis) {
            return plot.layout.xaxis.range;
        }
    }));
    const yrange = _.filter(plots.map((plot) => {
        if (plot.layout.yaxis) {
            return plot.layout.yaxis.range;
        }
    }));
    const xmin = _.min(xrange.map((range) => range[0]));
    const xmax = _.max(xrange.map((range) => range[1]));
    const ymin = _.min(yrange.map((range) => range[0]));
    const ymax = _.max(yrange.map((range) => range[1]));
    const layout = {
        xaxis: {
            range: [xmin, xmax]
        },
        yaxis: {
            range: [ymin, ymax]
        }
    };
    return new Chart(traces, _.merge(plots[0].layout, layout), name);
}
exports.combineTraces = combineTraces;
