import { generateLinePlot, Remote } from '../src';

const x = [0, 1, 2, 3, 4];

const plot = generateLinePlot(x);

(async () => {
    await Remote.plot(plot);
})()
