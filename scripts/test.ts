import { LineChart, Remote, Color, ArrayStats } from '../src';
import { Matrix } from 'utilities-ts';

const x = [0, 1, 2, 3, 4];

const stats: ArrayStats[] = x.map(mean => ({ mean, stderr: 0.1, count: 4 }));

const black = Color.fromColorName('black');

const plot = LineChart.fromArrayStats(stats);
plot.setColor(black);

(async () => {
    const m = Matrix.fromData([
        [255, 255, 0, 0, 255, 255],
        [255, 255, 0, 0, 255, 255],
        [255, 255, 0, 0, 255, 255],
        [0, 0, 255, 255, 0, 0],
        [0, 0, 255, 255, 0, 0],
        [0, 0, 255, 255, 0, 0],
        [255, 255, 0, 0, 255, 255],
        [255, 255, 0, 0, 255, 255],
        [255, 255, 0, 0, 255, 255],
    ]);

    await Remote.displayImage(m);
    // await Remote.plot(plot);
})()
