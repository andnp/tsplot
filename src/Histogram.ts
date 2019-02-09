import * as _ from 'lodash';
import * as PlotlyCharts from './utils/PlotlyCharts';
import { Color } from './utils/Color';
import { Layout_t } from './utils/PlotlyCharts';

export interface HistogramTrace extends Partial<PlotlyCharts.Trace_t> {
    type: 'histogram';
    x: Array<number>;
    name?: string;
    opacity?: number;
    marker?: {
        color?: string;
    };
};

export class Histogram extends PlotlyCharts.Chart {
    trace: HistogramTrace[];
    constructor(trace: Partial<PlotlyCharts.Trace_t>, layout?: Partial<Layout_t>) {
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

    label(name: string) {
        this.trace[0].name = name;

        this.showLegend();
        return this;
    }

    editLayout(layout: Partial<Layout_t>) {
        this.layout = _.merge(this.layout, layout);
        return this;
    }

    showLegend() {
        this.editLayout({ showlegend: true, legend: { orientation: 'v', yanchor: 'top', xanchor: 'right' } });
        return this;
    }

    static fromArray(arr: number[]) {
        return new Histogram({
            x: arr,
        });
    }
}
