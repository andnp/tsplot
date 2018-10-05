import * as Plotly from 'plotly.js';
import * as _ from 'lodash';
import { fp } from 'utilities-ts';
import * as PlotlyCharts from './utils/PlotlyCharts';
import * as MatrixUtils from './utils/MatrixUtils';
import { Color } from './utils/Color';
import { Layout_t } from './utils/PlotlyCharts';

export interface LineTrace extends Partial<PlotlyCharts.Trace_t> {
    type: 'scatter';
    mode: 'lines';
    x: Array<number>;
    y: Array<number>;
    line: {
        color?: string;
        shape: 'linear' | 'spline';
    };
    fill?: "tozeroy";
    fillcolor?: string;
};

export class LineChart extends PlotlyCharts.Chart {
    trace: LineTrace[];
    constructor(trace: Partial<PlotlyCharts.Trace_t>, layout?: Partial<Layout_t>) {
        super([], layout);

        const min = _.min(trace.y) || 0;
        const max = _.max(trace.y) || 1;

        const range = Math.abs(max - min);

        // set necessary parts of trace for this to be a line
        this.trace = [{
            x: [],
            y: [],
            ...trace,
            type: 'scatter',
            mode: 'lines',
            line: {
                shape: 'spline',
                ...trace.line,
            },
        }];

        // set opinionated layout defaults for line plots
        this.layout = _.merge<Layout_t, Layout_t | undefined>({
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
                l: 80, b: 60, r: 40, t: 40,
            },
            showlegend: false,
            font: {
                size: 20,
                family: 'Times New Roman',
            },
        }, layout);
    }

    getLineTrace() { return this.trace[0]; }
    getSteTrace(): LineTrace | undefined { return this.trace[1]; }
    getColor() { return this.getLineTrace().line.color; }

    setColor(c: Color) {
        this.getLineTrace().line.color = c.toRGBString();

        const steTrace = this.getSteTrace();
        if (steTrace) {
            steTrace.line.color = c.toRGBAString(.1);
            steTrace.fillcolor = c.toRGBAString(.2);
        }
    }

    setXValues(x: number[]) {
        this.getLineTrace().x = x;

        const steTrace = this.getSteTrace();
        if (steTrace) steTrace.x = steXValues(x);
    }

    label(name: string) {
        this.getLineTrace().name = name;

        this.showLegend();
    }

    editLayout(layout: Partial<Layout_t>) {
        this.layout = _.merge(this.layout, layout);
        return this;
    }

    showLegend() {
        this.editLayout({ showlegend: true, legend: { orientation: 'v', yanchor: 'top', xanchor: 'right' } });
    }

    static fromArray(arr: number[]) {
        const x = _.times(arr.length, i => i);
        const y = arr;

        return new LineChart({ x, y });
    }

    static fromArrayStats(arr: MatrixUtils.ArrayStats[]) {
        const linePlot = this.fromArray(arr.map(fp.prop('mean')));

        const { x, y } = linePlot.getLineTrace();

        const ste_x = steXValues(x);
        const ste_y = [];

        for (let i = 0; i < y.length; ++i) ste_y.push(y[i] - (arr[i].stderr || 0));
        for (let i = y.length - 1; i >= 0; --i) ste_y.push(y[i] + (arr[i].stderr || 0));

        const stePlot = this.fromArray(ste_y);
        stePlot.trace[0] = {
            ...stePlot.trace[0],
            x: ste_x,
            line: {
                shape: 'spline',
            },
            fill: 'tozeroy',
            showlegend: false,
        };

        linePlot.trace.push(stePlot.trace[0]);
        return linePlot;
    }
}

function steXValues(x: number[]) {
    return [...x, ..._.reverse([...x])];
}
