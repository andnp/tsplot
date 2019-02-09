"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const utilities_ts_1 = require("utilities-ts");
const PlotlyCharts_1 = require("./utils/PlotlyCharts");
const Color_1 = require("./utils/Color");
;
class Heatmap extends PlotlyCharts_1.Chart {
    constructor(trace, layout) {
        super([], layout);
        this.trace = [Object.assign({ z: [] }, trace, { type: 'heatmap' })];
    }
    colorScale(palette = Color_1.createSequentialPalette()) {
        const size = palette.size;
        const colors = _.times(size, i => {
            const color = palette.get(i);
            return utilities_ts_1.tuple(i / (size - 1), color.toRGBString());
        });
        this.trace[0].colorscale = colors;
        return this;
    }
    static fromMatrix(m) {
        return new Heatmap({
            z: m.asArrays(),
        });
    }
    static fromArrays(arr) {
        return new Heatmap({
            z: arr,
        });
    }
}
exports.Heatmap = Heatmap;
