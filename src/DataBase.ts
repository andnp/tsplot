import * as _ from 'lodash';

interface obj {
    [key: string]: any;
}

export function join<T extends obj, U extends obj>(arr1: T[], arr2: U[], key: keyof T & keyof U) {
    return _.filter(arr1.map((obj1) => {
        const match = arr2.filter((obj2) => obj2[key] === obj1[key])[0];
        if (!match) return;
        return _.merge(obj1, match);
    }));
}
