import * as _ from 'lodash';
type Primitive_t = string | number | boolean | undefined | null;

export function flattenKeys(obj: any) {
    const retObj: Record<string, Primitive_t> = {};
    const recurObject = (obj: any, path: string) => {
        const join = path.length === 0 ? '' : '.';
        if (_.isArray(obj)) {
            obj.forEach((val, i) => recurObject(val, path + join + `[${i}]`));
            return;
        }

        if (!_.isPlainObject(obj)) {
            retObj[path] = obj;
            return;
        }

        Object.keys(obj).forEach((key) => {
            recurObject(obj[key], path + join + key);
        });
    };

    recurObject(obj, '');

    return retObj;
}

export function countOccurrences<T extends Record<string, any>>(obj: T[], key: keyof T) {
    const ret: Record<string, number> = {};
    obj.forEach((v) => {
        const value = v[key];
        if (ret[value]) ret[value]++;
        else ret[value] = 1;
    });
    return ret;
}
