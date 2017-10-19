import * as LocalPlot from './plotters/LocalPlotter';
import * as Bluebird from 'bluebird';
import * as Plots from './LinePlots';
import * as PlotlyCharts from './utils/PlotlyCharts';
import * as _ from 'lodash';

export interface SaveOptions_t {
    name: string,
    path: string
}

export function savePNG(charts: Array<PlotlyCharts.Chart>, options?: Partial<SaveOptions_t>) {
    const promises = charts.map((chart: PlotlyCharts.Chart) => {
        const opts = _.mergeWith({
            name: chart.name,
            path: 'plots'
        }, options);
        return LocalPlot.plot(chart.trace, chart.layout, opts);
    });

    return Bluebird.all(promises);
}
