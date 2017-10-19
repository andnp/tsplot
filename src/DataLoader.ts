import * as _ from 'lodash';
import * as Bluebird from 'bluebird';
import * as fs from 'fs';
import * as Glob from 'glob';
import * as Worker from './utils/Worker';
import Matrix, {primitive} from './utils/Matrix';

export function loadFile(path: string): Bluebird<Buffer> {
    return new Bluebird((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

export function loadJSON(path: string) {
    return loadFile(path).then((buffer) => JSON.parse(buffer.toString()));
};

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

export function readCSV(buffer: Buffer) {
    const str = buffer.toString();
    return CSVParsePool.use(str)
        .then((data: Array<Array<primitive>>) => {
            return new Matrix(data);
        });
}

export function readGlob(path: string): Bluebird<string[]> {
    return new Bluebird((resolve, reject) => {
        Glob(path, (err, files: Array<string>) => {
            if (err) reject(err);
            else resolve(files);
        });
    });
};
