import { LineChart, Remote, Color, ArrayStats, describeColumns, createStandardPalette } from '../src';
import { Matrix, promise, csv } from 'utilities-ts';

(async () => {
    const file_names = ['0.2', '0.4', '0.6', '0.8', '1.0'].map(f => `mnist_samples_${f}.csv`);

    const openFiles = await promise.map(file_names, f => {
        const b = new Float32Array(40);
        return csv.loadCsvToBuffer({
            buffer: b,
            path: f,
        });
    });

    const mats = openFiles.map(b => Matrix.fromBuffer(b, { rows: 20, cols: 2 }) as Matrix);

    const stats = mats.map(m => describeColumns(m)[1]);

    const palette = createStandardPalette();

    const plot = LineChart.fromArrayStats(stats);
    plot.setColor(palette.next());
    plot.setXValues([0.2, 0.4, 0.6, 0.8, 1.0]);
    await Remote.plot(plot);
})()
