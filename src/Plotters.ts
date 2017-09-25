import * as LocalPlot from './plotters/LocalPlotter';
import * as Plots from './LinePlots';

Promise = require('bluebird');

export async function savePNG(charts: Array<Plots.Chart>) {
    const promises = charts.map((chart: Plots.Chart) => {
        return LocalPlot.plot(chart.trace, chart.layout, chart.name);
    });

    await Promise.all(promises);
}
