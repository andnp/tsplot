"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
;
class Chart {
    constructor(trace, layout, name) {
        this.trace = trace || [];
        this.layout = _.merge({
            xaxis: {
                ticks: '',
                showgrid: false,
                zeroline: false,
                showline: true,
            },
            yaxis: {
                ticks: '',
                showline: true,
                zeroline: false,
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
    ;
    label(name) {
        this.trace[0].name = name;
        this.showLegend();
        return this;
    }
    editLayout(layout) {
        this.layout = _.merge(this.layout, layout);
        return this;
    }
    showLegend() {
        this.editLayout({ showlegend: true, legend: { orientation: 'v', yanchor: 'top', xanchor: 'right' } });
        return this;
    }
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
    logXAxis() {
        if (!this.layout.xaxis) {
            this.layout.xaxis = { type: 'log' };
        }
        else {
            this.layout.xaxis.type = 'log';
        }
        return this;
    }
}
exports.Chart = Chart;
function combineTraces(plots) {
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
            range: [ymin, ymax],
            dtick: (Math.abs(ymax - ymin) / 3).toPrecision(1),
        }
    };
    return new Chart(traces, _.merge(plots[0].layout, layout));
}
exports.combineTraces = combineTraces;
