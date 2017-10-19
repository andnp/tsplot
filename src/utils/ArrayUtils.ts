export function getUnique(arr: Array<number>) {
    const m: {
        [key: number]: number
    } = {};
    arr.forEach((x) => m[x] = 0);
    return Object.keys(m).map(parseFloat).sort();
};
