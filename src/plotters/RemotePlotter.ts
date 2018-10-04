import * as puppeteer from 'puppeteer';
import { files } from 'utilities-ts';
import { Chart } from '../utils/PlotlyCharts';

export async function plot(chart: Chart) {
    const browser = await puppeteer.launch({ headless: false });
    const [ page ] = await browser.pages();

    const d3_path = require.resolve('d3/d3.min.js');
    const d3 = await files.readFile(d3_path);
    const plotly_path = require.resolve('plotly.js/dist/plotly.min.js');
    const plotly = await files.readFile(plotly_path);

    await page.evaluate(d3.toString());
    await page.evaluate(plotly.toString());

    const { trace, layout } = chart;

    await page.evaluate((trace: any, layout: any) => {
        const el = document.createElement('div');
        document.body.appendChild(el);

        const trace_arr = Array.isArray(trace) ? trace : [trace];
        // @ts-ignore
        return Plotly.plot(el, trace_arr, layout, { showLink: false });
    }, trace, layout);
}
