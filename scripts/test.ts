import { LineChart, Remote, Color, ArrayStats } from '../src';

const x = [0, 1, 2, 3, 4];

const stats: ArrayStats[] = x.map(mean => ({ mean, stderr: 0.1, count: 4 }));

const black = Color.fromColorName('black');

const plot = LineChart.fromArrayStats(stats);
plot.setColor(black);

(async () => {
    await Remote.plot(plot);
})()
