"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utilities_ts_1 = require("utilities-ts");
class Color {
    constructor(rgb) {
        this.rgb = rgb;
    }
    toRGBString() {
        const [r, g, b] = this.rgb;
        return `rgb(${r}, ${g}, ${b})`;
    }
    toRGBAString(a) {
        const [r, g, b] = this.rgb;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    static fromRGBString(str) {
        const nums = str.replace('rgb(', '')
            .replace(')', '')
            .split(',')
            .map(i => parseInt(i));
        if (nums.length !== 3)
            throw new Error(`Ill-formated rgb string. <${str}>`);
        return new Color([nums[0], nums[1], nums[2]]);
    }
    static fromColorName(str) {
        if (str === 'black')
            return new Color([0, 0, 0]);
        throw utilities_ts_1.assertNever(str, `I don't know this color. <${str}>`);
    }
    static fromOptionalTrace(opt, def) {
        const c = opt && opt.line && opt.line.color;
        const defColor = def || Color.fromColorName('black');
        return c
            ? Color.fromRGBString(c)
            : defColor;
    }
}
exports.Color = Color;
class Palette {
    constructor(colors) {
        this.colors = colors;
        this.state = 0;
    }
    next() {
        const len = this.colors.length;
        this.state = (this.state + 1) % len;
        return this.colors[this.state];
    }
    current() {
        return this.colors[this.state];
    }
}
exports.Palette = Palette;
exports.createStandardPalette = () => new Palette([
    new Color([57, 106, 177]),
    new Color([218, 124, 48]),
    new Color([62, 150, 81]),
    new Color([204, 37, 41]),
    new Color([83, 81, 84]),
    new Color([107, 76, 154]),
    new Color([146, 36, 40]),
    new Color([148, 139, 61])
]);
