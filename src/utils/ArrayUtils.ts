export function getUnique<T extends (string | number)>(arr: Array<T>) {
    const m: Record<string, string>= {};
    arr.forEach((x) => (m as any)[x] = 0);
    const unique = Object.keys(m);

    if (typeof arr[0] === 'number') return unique.map(parseFloat).sort();
    return Object.keys(m).sort();
};
