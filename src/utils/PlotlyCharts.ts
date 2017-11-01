import * as Plotly from 'plotly.js';
import * as _ from 'lodash';

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

    const xrange = _.filter(plots.map((plot) => {
        if (plot.layout.xaxis) {
            return plot.layout.xaxis.range;
        }
    })) as [Plotly.Datum, Plotly.Datum][];

    const yrange = _.filter(plots.map((plot) => {
        if (plot.layout.yaxis) {
            return plot.layout.yaxis.range;
        }
    })) as [Plotly.Datum, Plotly.Datum][];

    const xmin = _.min(xrange.map((range) => range[0])) as number;
    const xmax = _.max(xrange.map((range) => range[1])) as number;
    const ymin = _.min(yrange.map((range) => range[0])) as number;
    const ymax = _.max(yrange.map((range) => range[1])) as number;

    const layout: Layout_t = {
        xaxis: {
            range: [xmin, xmax]
        },
        yaxis: {
            range: [ymin, ymax]
        }
    };

    const plot = {
        layout: _.merge(plots[0].layout, layout),
        trace: traces,
        name
    };

    return plot;
}
