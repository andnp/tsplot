import * as _ from 'lodash';
import Matrix from './utils/Matrix';
import * as PlotlyCharts from './utils/PlotlyCharts';

export interface Heatmap_t extends Partial<PlotlyCharts.Trace_t> {
    type: 'heatmap';
    z: Array<Array<number>>;
};

const getHeatmapObject = (z: Matrix, options: Partial<PlotlyCharts.Trace_t>): Heatmap_t => {
    return _.mergeWith({
        type: 'heatmap',
        z: z.getData()
    }, options);
};

const getHeatmapLayout = (options: Partial<PlotlyCharts.Layout_t>): PlotlyCharts.Layout_t => {
    return _.merge({
        xaxis: {
            ticks: ''
        },
        yaxis: {
            ticks: ''
        },
        margin: {
            l: 60, b: 40, r: 40, t: 40
        }
    }, options);
};

export function generateHeatmap(m: Matrix, options?: Partial<PlotlyCharts.Chart>) {
    const opts : PlotlyCharts.Chart = _.mergeWith({
        trace: [],
        layout: {},
        name: 'no name'
    }, options);

    const trace = getHeatmapObject(m, opts.trace[0]);
    const layout = getHeatmapLayout(opts.layout);

    return new PlotlyCharts.Chart([trace], layout, opts.name);
}
