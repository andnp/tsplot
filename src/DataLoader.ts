import * as _ from 'lodash';
import * as fs from 'fs';
import * as Glob from 'glob';
import * as Worker from './utils/Worker';
import Matrix, {primitive} from './utils/Matrix';

Promise = require('bluebird');

export interface Path_t {
    location: string;
};

export interface Buffer_t extends Path_t {
    raw: Buffer;
};

export function loadFile(path: Path_t) : Promise<Buffer_t> {
    return new Promise((resolve, reject) => {
        fs.readFile(path.location, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    })
    .then((raw: Buffer) => {
        const buffer = { raw };
        return Object.assign(path, buffer);
    });
}

const parseCsvString = (str: string) => {
    const rows = str.split('\n');
    const mat = [];
    for (let i = 0; i < rows.length; ++i) {
        const cols = rows[i].split(',');
        if (cols.length === 1 && cols[0] === '') continue;
        const row = [];
        for (let j = 0; j < cols.length; ++j) {
            if (!(j === cols.length - 1 && cols[j] === '')) row.push(parseFloat(cols[j]));
        }
        mat.push(row);
    }
    return mat;
}
const CSVParsePool = Worker.createPool(parseCsvString);

export function readCSV(buffer: Buffer_t) : Promise<Matrix> {
    const str = buffer.raw.toString();
    return CSVParsePool.use(str)
        .then((data: Array<Array<primitive>>) => {
            return new Matrix(data);
        });
}

export function readGlob(path: Path_t) : Promise<Array<Path_t>> {
    return new Promise((resolve, reject) => {
        Glob(path.location, (err, files: Array<string>) => {
            if (err) reject(err);
            else resolve(files);
        });
    })
    .then((files: Array<string>) => {
        return files.map((file: string) => {
            const path: Path_t = {
                location: file
            };
            return path;
        });
    });
};
