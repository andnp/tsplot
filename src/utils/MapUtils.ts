export function forEach<S, T>(map: Map<S, T>, func: (value: T, key: S) => any) {
    Array.from(map.keys()).forEach((key) => {
        const item = map.get(key)!;
        func(item, key);
    });
}

export function map<S, T, O>(map: Map<S, T>, func: (value: T, key: S) => O) {
    return Array.from(map.keys()).map((key) => {
        const item = map.get(key)!;
        return func(item, key);
    });
}
