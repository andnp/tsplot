import test from 'ava';

import * as DataLoader from 'DataLoader';
import Matrix from 'utils/Matrix';

const rootDir = __dirname + '/../..';

test("Can load a file and resolve as promise", async t => {
    return DataLoader.loadFile(`${rootDir}/package.json`)
    .then((buffer) => {
        t.is(typeof buffer, 'object');
    });
});

test("Rejects when file does not exist", async t => {
    return DataLoader.loadFile('merpmerp')
    .then(() => {
        t.fail();
    })
    .catch(() => {
        t.pass();
    });
});

test("Parses CSV files and converts numbers to floats", async t => {
    return DataLoader.loadFile(`${rootDir}/TestMatrix.csv`)
    .then(DataLoader.readCSV)
    .then((m: Matrix) => {
        t.is(m.get(0, 0), 1.1);
        t.is(m.get(1, 2), 6.6);
    });
});

test("Returns a list of files matching a glob pattern", async t => {
    return DataLoader.readGlob(`${rootDir}/src/**/*.ts`)
    .then((files) => {
        t.true(files.length > 2);
    });
});
