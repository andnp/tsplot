"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
class Chart {
    constructor(trace, layout, name) {
        this.layout = layout || {};
        this.trace = trace || [];
        this.name = name || 'default_name';
    }
    ;
}
exports.Chart = Chart;
function combineTraces(plots, name) {
    let traces = [];
    plots.forEach((plot) => {
        traces = traces.concat(plot.trace);
    });
    const plot = {
        layout: plots[0].layout,
        trace: traces,
        name
    };
    return plot;
}
exports.combineTraces = combineTraces;
