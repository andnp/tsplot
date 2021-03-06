import * as _ from 'lodash';

interface obj {
    [key: string]: any;
}

export function joinBy<T extends obj, U extends obj>(arr1: T[], arr2: U[], comp: (t: T, u: U) => boolean) {
    const notJoined: [number[], number[]] = [[], []];
    const arr2Joined: number[] = [];

    const keyed2 = arr2.map((obj2, i) => {
        return {
            data: obj2,
            id: i
        };
    });

    const joined = _.filter(arr1.map((obj1, index) => {
        const match = keyed2.filter((keyed) => comp(obj1, keyed.data))[0];

        if (!match) {
            notJoined[0].push(index);
            return;
        }

        arr2Joined.push(match.id);
        return _.merge(obj1, match.data);
    })) as (T & U)[];

    const opposite = _.difference(_.times(arr2.length, (i) => i), arr2Joined);
    notJoined[1] = opposite;

    return {
        joined,
        notJoined
    };
}

export function join<T extends obj, U extends obj>(arr1: T[], arr2: U[], key: keyof T & keyof U) {
    return joinBy(arr1, arr2, (t, u) => t[key] === u[key]);
}
