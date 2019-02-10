import * as _ from 'lodash';
import { Color } from './utils/Color';
import { Layout, Trace, Chart } from './utils/PlotlyCharts';

export interface HistogramTrace extends Partial<Trace> {
    type: 'histogram';
    x: number[];
    name?: string;
    opacity?: number;
    autobinx?: boolean;
    marker?: {
        color?: string;
    };
    xbins?: {
        // start: number;
        end?: number;
        size?: number;
      };
}

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
            yaxis: {
                showline: false,
                showticklabels: false,
            },
        }, layout);
    }

    setColor(c: Color) {
        this.trace.forEach(trace => _.set(trace, 'marker.color', c.toRGBString()));
        return this;
    }

    setOpacity(a: number) {
        this.trace.forEach(trace => trace.opacity = a);
        return this;
    }

    overlay(b: boolean = true) {
        if (b) this.editLayout({ barmode: 'overlay' });
        else this.editLayout({ barmode: undefined });

        return this;
    }

    binSize(size: number) {
        this.trace.forEach(trace => {
            trace.autobinx = false;
            trace.xbins = _.merge(trace.xbins, {
                size,
            });
        });
        return this;
    }

    static fromArray(arr: number[]) {
        return new Histogram({
            x: arr,
        });
    }
}
