"use strict";
// Warning ye who enter here.
// There be black magic beyond these lines.
Object.defineProperty(exports, "__esModule", { value: true });
const Bluebird = require("bluebird");
const createPhantomPool = require('phantom-pool');
const URL2Image = require('image-data-uri');
const plotly = require.resolve('plotly.js/dist/plotly.min.js');
const d3 = require.resolve('d3/d3.min.js');
let phantomPool;
exports.plot = async (trace, layout, options) => {
    if (!phantomPool) {
        phantomPool = createPhantomPool({
            max: 8,
            min: 0,
            maxUses: 200,
            autostart: false
        });
    }
    // The following function is stringified then sent (as a string) to a PhantomJS instance to be evaluated.
    const url = await phantomPool.use(async function (instance) {
        let Plotly = {};
        const page = await instance.createPage();
        await page.injectJs(d3);
        await page.injectJs(plotly);
        const outObj = instance.createOutObject();
        // outObj.data_url = '';
        page.property('onCallback', function (data, out) {
            if (data)
                out.data_url = data;
        }, outObj);
        await page.evaluate(function (trace, layout) {
            const el = document.createElement('div');
            document.body.appendChild(el);
            const trace_arr = Array.isArray(trace) ? trace : [trace];
            return Plotly.plot(el, trace_arr, layout, { showLink: false })
                .then(function (gd) {
                return Plotly.toImage(gd, { format: 'png', height: 800, width: 800 });
            })
                .then(function (url) {
                window.callPhantom(url);
            });
        }, trace, layout);
        await Bluebird.delay(5000);
        const url = await outObj.property('data_url');
        return url;
    });
    const file = `${options.path}/${options.name}.png`;
    await URL2Image.outputFile(url, file);
    return file;
};
process.on('exit', () => {
    if (!phantomPool)
        return;
    phantomPool.drain().then(() => phantomPool.clear());
});
