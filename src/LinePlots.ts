import * as Plotly from 'plotly.js';
import * as _ from 'lodash';

interface Line_t extends Partial<Plotly.ScatterData> {
    type: 'scatter';
    mode: 'lines';
    x: Array<number>;
    y: Array<number>;

};

interface Layout_t extends Partial<Plotly.Layout> {

};

class Chart {
    public layout: Layout_t;
    public trace: Array<Line_t>;
    public name: string;
}


export function generateLinePlot(array: Array<number>, name = 'line_plot') {
}
