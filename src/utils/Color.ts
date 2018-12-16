import { DeepPartial } from "simplytyped";
import { assertNever } from 'utilities-ts';
import { Trace_t } from "./PlotlyCharts";

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

    static fromOptionalTrace(opt?: DeepPartial<Trace_t>, def?: Color) {
        const c = opt && opt.line && opt.line.color;

        const defColor = def || Color.fromColorName('black');

        return c
            ? Color.fromRGBString(c)
            : defColor;
    }
}

export class Palette {
    protected state: number = 0;
    constructor(private colors: Color[]) {}

    next() {
        const len = this.colors.length;
        this.state = (this.state + 1) % len;
        return this.colors[this.state];
    }

    current() {
        return this.colors[this.state];
    }

    reset(){
        this.state = 0;
    }
}

export const createStandardPalette = (colors: number = 12) => {
    if (colors === 2) return new Palette([
        new Color([27, 158, 119]),
        new Color([217, 95, 2]),
    ]);

    if (colors === 3) return new Palette([
        new Color([27, 158, 119]),
        new Color([217, 95, 2]),
        new Color([117, 112, 179]),
    ]);

    if (colors === 4) return new Palette([
        new Color([27, 158, 119]),
        new Color([217, 95, 2]),
        new Color([117, 112, 179]),
        new Color([231, 41, 138]),
    ]);

    if (colors === 5) return new Palette([
        new Color([27, 158, 119]),
        new Color([217, 95, 2]),
        new Color([117, 112, 179]),
        new Color([231, 41, 138]),
        new Color([102, 166, 30]),
    ]);

    if (colors === 6) return new Palette([
        new Color([27, 158, 119]),
        new Color([217, 95, 2]),
        new Color([117, 112, 179]),
        new Color([231, 41, 138]),
        new Color([102, 166, 30]),
        new Color([230, 171, 2]),
    ]);

    if (colors === 7) return new Palette([
        new Color([27, 158, 119]),
        new Color([217, 95, 2]),
        new Color([117, 112, 179]),
        new Color([231, 41, 138]),
        new Color([102, 166, 30]),
        new Color([230, 171, 2]),
        new Color([166, 118, 29]),
    ]);

    if (colors === 8) return new Palette([
        new Color([27, 158, 119]),
        new Color([217, 95, 2]),
        new Color([117, 112, 179]),
        new Color([231, 41, 138]),
        new Color([102, 166, 30]),
        new Color([230, 171, 2]),
        new Color([166, 118, 29]),
        new Color([102, 102, 102]),
    ]);

    if (colors === 9) return new Palette([
        new Color([166, 206, 227]),
        new Color([31, 120, 180]),
        new Color([178, 223, 138]),
        new Color([51, 160, 44]),
        new Color([251, 154, 153]),
        new Color([227, 26, 28]),
        new Color([253, 191, 111]),
        new Color([255, 127, 0]),
        new Color([202, 178, 214]),
    ]);

    if (colors === 10) return new Palette([
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
    ]);

    if (colors === 11) return new Palette([
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
    ]);

    return new Palette([
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
    ]);
}

