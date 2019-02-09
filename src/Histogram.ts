import * as _ from 'lodash';
import { Color } from './utils/Color';
import { Layout, Trace, Chart } from './utils/PlotlyCharts';

export interface HistogramTrace extends Partial<Trace> {
    type: 'histogram';
    x: Array<number>;
    name?: string;
    opacity?: number;
    marker?: {
        color?: string;
    };
};

export class Histogram extends Chart {
    trace: HistogramTrace[];
    constructor(trace: Partial<HistogramTrace>, layout?: Partial<Layout>) {
        super([], layout);

        this.trace = [{
            x: [],
            ...trace,
            type: 'histogram',
        }];

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

    setColor(c: Color) {
        _.set(this.trace[0], 'marker.color', c.toRGBString());
        return this;
    }

    setOpacity(a: number) {
        this.trace[0].opacity = a;
        return this;
    }

    static fromArray(arr: number[]) {
        return new Histogram({
            x: arr,
        });
    }
}