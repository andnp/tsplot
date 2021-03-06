import * as _ from 'lodash';
import { fp } from 'utilities-ts';
import * as MatrixUtils from './utils/MatrixUtils';
import { Color } from './utils/Color';
import { Layout, Trace, Chart } from './utils/PlotlyCharts';

export interface LineTrace extends Partial<Trace> {
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
    showlegend?: boolean;
};

export class LineChart extends Chart {
    trace: LineTrace[];
    constructor(trace: Partial<LineTrace>, layout?: Partial<Layout>) {
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
        this.layout = _.merge({
            yaxis: {
                range: [min - .05 * range, max + .05 * range],
                dtick: (range / 3).toPrecision(1),
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

    smooth(v: boolean) {
        this.trace.forEach(trace => trace.line.shape = v ? 'spline' : 'linear');
        return this;
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
