// Warning ye who enter here.
// There be black magic beyond these lines.

import * as _ from 'lodash';
import * as Bluebird from 'bluebird';
const createPhantomPool = require('phantom-pool');
const URL2Image = require('image-data-uri');

const plotly = require.resolve('plotly.js/dist/plotly.min.js');
const d3 = require.resolve('d3/d3.min.js');

const phantomPool = createPhantomPool({
    max: 8,
    min: 2,
    maxUses: 200,
    autostart: false
});

export const plot = async (trace: any, layout: any, options: any) => {
    // The following function is stringified then sent (as a string) to a PhantomJS instance to be evaluated.
    const url = await phantomPool.use(async function (instance: any) {
        let Plotly: any = {};
        const page = await instance.createPage();
        await page.injectJs(d3);
        await page.injectJs(plotly);

        const outObj = instance.createOutObject();
        // outObj.data_url = '';
        page.property('onCallback', function (data: any, out: any) {
            if (data) out.data_url = data;
        }, outObj);

        await page.evaluate(function (trace: any, layout: any) {
            const el = document.createElement('div');
            document.body.appendChild(el);

            const trace_arr = Array.isArray(trace) ? trace : [trace];
            return Plotly.plot(el, trace_arr, layout, { showLink: false })
                .then(function (gd: any) {
                    return Plotly.toImage(gd, { format: 'png', height: 800, width: 800 });
                })
                .then(function (url: any) {
                    (window as any).callPhantom(url);
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
    phantomPool.drain().then(() => phantomPool.clear());
});
