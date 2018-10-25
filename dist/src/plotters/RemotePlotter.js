"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
const _ = require("lodash");
const utilities_ts_1 = require("utilities-ts");
// memoize this so that later calls to plot and displayImage
// will modify the same browser page
const launchBrowser = _.once(async () => {
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
    return page;
});
async function plot(chart) {
    const page = await launchBrowser();
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
const matrixToImageVec = (m) => {
    const x = [];
    for (let i = 0; i < m.rows; ++i) {
        for (let j = 0; j < m.cols; ++j) {
            const v = m.get(i, j);
            x.push(v); // r
            x.push(v); // b
            x.push(v); // g
            x.push(255); // a
        }
    }
    return x;
};
async function displayImage(m) {
    const page = await launchBrowser();
    const imageVec = matrixToImageVec(m);
    await page.evaluate((imageVec, rows, cols) => {
        const el = document.createElement('canvas');
        document.body.appendChild(el);
        const ctx = el.getContext('2d');
        const d = ctx.createImageData(cols, rows);
        for (let i = 0; i < imageVec.length; ++i) {
            d.data[i] = imageVec[i];
        }
        ctx.putImageData(d, 0, 0);
    }, imageVec, m.rows, m.cols);
}
exports.displayImage = displayImage;
