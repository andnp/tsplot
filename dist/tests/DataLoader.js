"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const DataLoader = require("DataLoader");
const rootDir = __dirname + '/../..';
ava_1.default("Can load a file and resolve as promise", async (t) => {
    return DataLoader.loadFile(`${rootDir}/package.json`)
        .then((buffer) => {
        t.is(typeof buffer, 'object');
    });
});
ava_1.default("Rejects when file does not exist", async (t) => {
    return DataLoader.loadFile('merpmerp')
        .then(() => {
        t.fail();
    })
        .catch(() => {
        t.pass();
    });
});
ava_1.default("Parses CSV files and converts numbers to floats", async (t) => {
    return DataLoader.loadFile(`${rootDir}/TestMatrix.csv`)
        .then(DataLoader.readCSV)
        .then((m) => {
        t.is(m.get(0, 0), 1.1);
        t.is(m.get(1, 2), 6.6);
    });
});
ava_1.default("Returns a list of files matching a glob pattern", async (t) => {
    return DataLoader.readGlob(`${rootDir}/src/**/*.ts`)
        .then((files) => {
        t.true(files.length > 2);
    });
});
