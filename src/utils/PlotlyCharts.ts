import * as Plotly from 'plotly.js';

export interface Trace_t {
    type: 'scatter' | 'heatmap';
    name?: string;
    mode?: 'lines';
    z?: Array<Array<number>>;
    x?: Array<number>;
    y?: Array<number>;
    showlegend?: boolean;
    line?: {
        color?: string
    }
};

export interface Layout_t extends Partial<Plotly.Layout> { };

export class Chart {
    public layout: Partial<Layout_t>;
    public trace: Array<Partial<Trace_t>>;
    public name: string;

    constructor(trace?: Array<Trace_t>, layout?: Layout_t, name?: string) {
        this.layout = layout || {};
        this.trace = trace || [];
        this.name = name || 'default_name';
    };
}

export function combineTraces(plots: Array<Chart>, name: string) {
    let traces: Array<Partial<Trace_t>> = [];
    plots.forEach((plot) => {
        traces = traces.concat(plot.trace)
    });
    const plot = {
        layout: plots[0].layout,
        trace: traces,
        name
    };

    return plot;
}
