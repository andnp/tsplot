export { default as Matrix } from './utils/Matrix';
export * from './utils/MatrixUtils';
export * from './utils/ArrayUtils';
export * from './utils/MathUtils';
export * from './LinePlots';
export * from './Heatmaps';
export * from './utils/PlotlyCharts';

import * as MapUtils_i from './utils/MapUtils';
import * as ObjectUtils_i from './utils/ObjectUtils';
import * as DataBase_i from './DataBase';

export const MapUtils = MapUtils_i;
export const ObjectUtils = ObjectUtils_i;
export const DataBase = DataBase_i;

import * as _ from 'lodash';

if (module) {
    module.exports = _.merge(module.exports,
        require('./utils/Worker'),
        require('./DataLoader'),
        require('./Plotters')
    );
}

import * as Worker_i from './utils/Worker';
import * as DataLoader_i from './DataLoader';
import * as Plotters_i from './Plotters';
