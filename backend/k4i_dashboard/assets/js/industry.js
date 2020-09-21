import * as dc from 'dc';
import {d3} from './d3';

export class IndustryChart {
    constructor(dataFilter, container) {
        this.container = container;
        this.dimension= dataFilter.dimensions['industry'];
        this.group= this.dimension.group().reduceCount();
        this.chart = null;

        this.prepareWidget(container);
        this.prepareDOM();
    }

    prepareWidget(container) {
        this.chart = new dc.RowChart(container)

        this.chart
          .dimension(this.dimension)
          .group(this.group)
          // .x(d3.scaleLinear().domain([0, 70]))
    }

    prepareDOM() {
        d3.select(this.container).select(".chart").style("display", "none");
    }
}