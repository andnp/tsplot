import * as Bluebird from 'bluebird';
Bluebird.config({
    cancellation: true
});

export { default as Matrix } from './utils/Matrix';
export * from './utils/MatrixUtils';
export * from './utils/ArrayUtils';
export * from './utils/MathUtils';
export * from './LinePlots';
export * from './Heatmaps';
export * from './utils/PlotlyCharts';

import * as RemoteSocket_i from './plotters/RemotePlotter';
import * as MapUtils_i from './utils/MapUtils';
import * as ObjectUtils_i from './utils/ObjectUtils';
import * as DataBase_i from './DataBase';

export const RemoteSocket = RemoteSocket_i;
export const MapUtils = MapUtils_i;
export const ObjectUtils = ObjectUtils_i;
export const DataBase = DataBase_i;

// should polyfill these out for use in browser
export * from './utils/Worker';
export * from './DataLoader';
export * from './Plotters';
