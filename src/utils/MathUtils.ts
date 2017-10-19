interface CartesianProductParam_t {
    [k: string]: Array<number | string | boolean>
}

interface Setting_t {
    [k: string]: number | string | boolean
}

export function cartesianProduct(obj: CartesianProductParam_t) {
    const keys = Object.keys(obj);
    const settings: Setting_t[] = [];
    let count = 1;
    keys.forEach((k) => {
        count *= obj[k].length;
    });

    for (let i = 0; i < count; ++i) {
        let accum = 1;
        const setting: Setting_t = {};
        keys.forEach((k) => {
            const p = obj[k];
            setting[k] = p[Math.floor(i / accum) % p.length];
            accum *= p.length;
        });
        settings.push(setting);
    }

    return settings;
}
