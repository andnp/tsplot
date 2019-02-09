import * as _ from 'lodash';
import { Matrix, tuple } from 'utilities-ts';
import { Layout, Trace, Chart } from './utils/PlotlyCharts';
import { Palette, createSequentialPalette } from './utils/Color';

export interface HeatmapTrace extends Partial<Trace> {
    type: 'heatmap';
    z: Array<Array<number>>;
    colorscale?: Array<[number, string]>;
    zmin?: number;
    zmax?: number;
};

export class Heatmap extends Chart {
    trace: HeatmapTrace[];
    constructor(trace: Partial<HeatmapTrace>, layout?: Partial<Layout>) {
        super([], layout);

        this.trace = [{
            z: [],
            ...trace,
            type: 'heatmap',
        }];
    }

    colorScale(palette: Palette = createSequentialPalette()) {
        const size = palette.size;
        const colors = _.times(size, i => {
            const color = palette.get(i);
            return tuple(i / (size - 1), color.toRGBString());
        });

        this.trace[0].colorscale = colors;

        return this;
    }

    range(min: number, max: number) {
        this.trace[0].zmin = min;
        this.trace[0].zmax = max;

        return this;
    }

    static fromMatrix(m: Matrix) {
        return new Heatmap({
            z: m.asArrays(),
        });
    }

    static fromArrays(arr: number[][]) {
        return new Heatmap({
            z: arr,
        });
    }
}
