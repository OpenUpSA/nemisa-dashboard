import {select, selectAll} from 'd3-selection';
import {scaleLinear, scaleSqrt, scaleOrdinal, scaleSequential} from 'd3-scale';
import {interpolateRdYlGn} from 'd3-scale-chromatic'
import {csv, json} from 'd3-fetch';
import {
    forceSimulation, forceCenter, forceManyBody,
    forceCollide, forceX, forceY
} from 'd3-force';
import {max, min, maxIndex, minIndex, extent} from 'd3-array';
import {format} from 'd3-format';
import tip from 'd3-tip';

const d3 = {
    select, selectAll,
    scaleLinear, scaleSqrt, scaleOrdinal, scaleSequential,
    interpolateRdYlGn,
    csv, json,
    forceSimulation, forceCenter, forceManyBody, forceCollide, forceX, forceY,
    max, min, maxIndex, minIndex, extent,
    format,
    tip
}


export default d3