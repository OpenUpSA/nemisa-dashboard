import * as dc from 'dc';
import d3 from '../d3';

export class AgeChart {
  constructor(container, dimensionName, dataFilter) {
    this.container = container;
    this.currentDimension = dataFilter.dimensions[dimensionName].dimension;
    this.grouping = this.currentDimension.group().reduceCount();
    this.chart = null;
    this.prepareWidget(container);
    this.prepareDOM();
  }

  prepareWidget(container) {
    this.chart = new dc.BarChart(container).elasticY(true);
    this.chart
      .dimension(this.currentDimension)
      .group(this.grouping)
      .xAxisLabel('Age')
      .yAxisLabel('Number of responses')
      .x(d3.scaleLinear().domain([0, 70]));
  }

  prepareDOM() {
    d3.select(this.container).select('.chart').style('display', 'none');
  }
}
