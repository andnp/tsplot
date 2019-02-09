import { DeepPartial } from "simplytyped";
import { assertNever } from 'utilities-ts';
import { Trace } from "./PlotlyCharts";

export type ColorName = 'black';
export class Color {
    constructor(private rgb: [number, number, number]) {}

    toRGBString() {
        const [ r, g, b ] = this.rgb;
        return `rgb(${r}, ${g}, ${b})`;
    }

    toRGBAString(a: number) {
        const [ r, g, b ] = this.rgb;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    darken(x: number) {
        const rgb = this.rgb.map(v => v - (x * v)) as [number, number, number];
        return new Color(rgb);
    }

    static fromRGBString(str: string) {
        const nums = str.replace('rgb(', '')
            .replace(')', '')
            .split(',')
            .map(i => parseInt(i));

        if (nums.length !== 3) throw new Error(`Ill-formated rgb string. <${str}>`);

        return new Color([nums[0], nums[1], nums[2]]);
    }

    static fromColorName(str: ColorName) {
        if (str === 'black') return new Color([0, 0, 0]);
        throw assertNever(str, `I don't know this color. <${str}>`);
    }

    static fromOptionalTrace(opt?: DeepPartial<Trace>, def?: Color) {
        const c = opt && opt.line && opt.line.color;

        const defColor = def || Color.fromColorName('black');

        return c
            ? Color.fromRGBString(c)
            : defColor;
    }
}

export class Palette {
    readonly size: number;
    protected state: number = 0;
    constructor(private colors: Color[]) {
        this.size = colors.length;
    }

    next() {
        const len = this.size;
        this.state = (this.state + 1) % len;
        return this.colors[this.state];
    }

    current() {
        return this.colors[this.state];
    }

    reset(){
        this.state = 0;
    }

    get(idx: number) {
        return this.colors[idx];
    }
}

export const createDarkPalette = (colors: number = 8) => {
    const rawPalette = [
        new Color([27, 158, 119]),
        new Color([217, 95, 2]),
        new Color([117, 112, 179]),
        new Color([231, 41, 138]),
        new Color([102, 166, 30]),
        new Color([230, 171, 2]),
        new Color([166, 118, 29]),
        new Color([102, 102, 102]),
    ];

    return new Palette(rawPalette.slice(0, colors));
}

export const createStandardPalette = (colors: number = 12) => {
    const rawPalette = [
        new Color([166, 206, 227]),
        new Color([31, 120, 180]),
        new Color([178, 223, 138]),
        new Color([51, 160, 44]),
        new Color([251, 154, 153]),
        new Color([227, 26, 28]),
        new Color([253, 191, 111]),
        new Color([255, 127, 0]),
        new Color([202, 178, 214]),
        new Color([106, 61, 154]),
        new Color([255, 255, 153]),
        new Color([177, 89, 40]),
    ];

    return new Palette(rawPalette.slice(0, colors));
}

export const createSequentialPalette = (colors: number = 9) => {
    const rawPalette = [
        new Color([225, 247, 251]),
        new Color([236, 226, 240]),
        new Color([208, 209, 230]),
        new Color([166, 189, 219]),
        new Color([103, 169, 207]),
        new Color([54, 144, 192]),
        new Color([2, 129, 138]),
        new Color([1, 108, 89]),
        new Color([1, 70, 54]),
    ];

    return new Palette(rawPalette.slice(0, colors));
}

export const createDivergingPalette = (colors: number = 1) => {
    const rawPalette = [
        new Color([84, 48, 5]),
        new Color([140, 81, 10]),
        new Color([191, 129, 45]),
        new Color([223, 194, 125]),
        new Color([246, 232, 195]),
        new Color([245, 245, 245]),
        new Color([199, 234, 229]),
        new Color([128, 205, 193]),
        new Color([53, 151, 143]),
        new Color([1, 102, 94]),
        new Color([0, 60, 48]),
    ];

    return new Palette(rawPalette.slice(0, colors));
}
