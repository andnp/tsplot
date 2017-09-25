import * as Plotly from 'plotly.js';
import * as _ from 'lodash';

export interface Line_t extends Partial<Plotly.ScatterData> {
    type: 'scatter';
    mode: 'lines';
    x: Array<number>;
    y: Array<number>;
};

export interface Layout_t extends Partial<Plotly.Layout> {};

export class Chart {
    public layout: Layout_t;
    public trace: Array<Line_t>;
    public name: string;

    constructor(trace: Array<Line_t> | undefined, layout: Layout_t | undefined, name: string | undefined) {
        this.layout = layout || {};
        this.trace = trace || [];
        this.name = name || 'default_name';
    };
}


const getLineObject = (x: Array<number>, y: Array<number>, options: Partial<Line_t>) : Line_t => {
    return _.mergeWith({
        type: 'scatter',
        mode: 'lines',
        x, y,
        line: {
            width: 1,
            color: "rgb(0, 100, 80)"
        }
    }, options);
};

const getLineLayout = (options: Partial<Layout_t>, min: number, max: number) : Layout_t => {
    return _.merge({
        xaxis: {
            showgrid: false,
            zeroline: false,
            showline: true
        },
        yaxis: {
            range: [min - .1 * min, max + .1 * max],
            showline: true,
            zeroline: false
        },
        margin: {
            l: 60, b: 40, r: 40, t: 40
        },
        showlegend: false
    }, options);
};

export function generateLinePlot(array: Array<number>, options: Chart) : Chart {
    const x = _.times(array.length, (i: number) => i);
    const y = array;

    // There's no way these should be undefined, but their typings imply that they might be
    const min = _.min(y) || 0;
    const max = _.max(y) || 10;

    const trace = getLineObject(x, y, options.trace[0]);
    const layout = getLineLayout(options.layout, min, max);

    return new Chart([trace], layout, options.name);
}
