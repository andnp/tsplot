"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
const utilities_ts_1 = require("utilities-ts");
async function plot(chart) {
    const browser = await puppeteer.launch({ headless: false, args: [`--window-size=1920,1080`] });
    const [page] = await browser.pages();
    await page.setViewport({
        width: 1920,
        height: 1080,
    });
    const d3_path = require.resolve('d3/d3.min.js');
    const d3 = await utilities_ts_1.files.readFile(d3_path);
    const plotly_path = require.resolve('plotly.js/dist/plotly.min.js');
    const plotly = await utilities_ts_1.files.readFile(plotly_path);
    await page.evaluate(d3.toString());
    await page.evaluate(plotly.toString());
    const charts = Array.isArray(chart) ? chart : [chart];
    await utilities_ts_1.promise.map(charts, chart => {
        const { trace, layout } = chart;
        return page.evaluate((trace, layout) => {
            const el = document.createElement('div');
            document.body.appendChild(el);
            el.style.width = '700px';
            el.style.paddingTop = '25px';
            const trace_arr = Array.isArray(trace) ? trace : [trace];
            // @ts-ignore
            return Plotly.plot(el, trace_arr, layout, { showLink: false });
        }, trace, layout);
    });
}
exports.plot = plot;
