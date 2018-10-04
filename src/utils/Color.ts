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
}

export const createStandardPalette = () => new Palette([
    new Color([57, 106, 177]),
    new Color([218, 124, 48]),
    new Color([62, 150, 81]),
    new Color([204, 37, 41]),
    new Color([83, 81, 84]),
    new Color([107, 76, 154]),
    new Color([146, 36, 40]),
    new Color([148, 139, 61])
]);
