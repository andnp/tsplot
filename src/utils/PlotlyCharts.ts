import * as Plotly from 'plotly.js';
import * as _ from 'lodash';
import { fp, arrays } from 'utilities-ts';

export interface Trace {
    name?: string;
    line?: {
        color?: string;
    };
}

export interface Layout extends Partial<Plotly.Layout> {
    barmode?: 'overlay';
    grid?: {
        rows: number;
        columns: number;
        pattern?: 'independent';
    }
};

export class Chart {
    public layout: Partial<Layout>;
    public trace: Array<Trace>;

    constructor(trace?: Trace[], layout?: Layout) {
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
    };

    label(name: string) {
        this.trace[0].name = name;

        this.showLegend();
        return this;
    }

    editLayout(layout: Partial<Layout>) {
        this.layout = _.merge(this.layout, layout);
        return this;
    }

    showLegend() {
        this.editLayout({ showlegend: true, legend: { orientation: 'v', yanchor: 'top', xanchor: 'right' } });
        return this;
    }

    title(name: string) {
        this.layout.title = name;
        return this;
    }

    xLabel(name: string) {
        if (!this.layout.xaxis) {
            this.layout.xaxis = { title: name };
        } else {
            this.layout.xaxis.title = name;
        }

        return this;
    }

    yLabel(name: string) {
        if (!this.layout.yaxis) {
            this.layout.yaxis = { title: name };
        } else {
            this.layout.yaxis.title = name;
        }

        return this;
    }

    logXAxis() {
        if (!this.layout.xaxis) {
            this.layout.xaxis = { type: 'log' };
        } else {
            this.layout.xaxis.type = 'log';
        }

        return this;
    }
}

export function combineTraces(plots: Array<Chart>): Chart {
    let traces: Array<Trace> = [];
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

    const layout: Layout = {
        xaxis: {
            range: [xmin, xmax]
        },
        yaxis: {
            range: [ymin, ymax],
            dtick: (Math.abs(ymax - ymin) / 3).toPrecision(1),
        }
    };

    return new Chart(
        traces,
        _.merge(plots[0].layout, layout),
    );
}

export class ChartGrid extends Chart {
    constructor (trace: Trace[], layout: Layout, shape: [number] | [number, number]) {
        super(trace, layout);
        const rows = shape[0];
        const columns = shape.length === 1 ? 1 : shape[1];
        this.editLayout({
            grid: { rows, columns, pattern: 'independent' },
        });
    }

    fromCharts(charts: Chart[], shape?: [number, number]) {
        const traces = arrays.flatMap(charts, fp.prop('trace'));
        return new ChartGrid(traces, charts[0].layout, shape || [charts.length]);
    }
}
