import $ from 'jquery';
import * as dc from 'dc';
import d3 from '../d3';

export class PieChart extends dc.PieChart {
  constructor(container, dimensionName, dataFilter) {
    super(container);
    this.container = container;
    this.currentDimension = dataFilter.dimensions[dimensionName].dimension;
    this.grouping = this.currentDimension.group().reduceCount();
    this.chart = null;
    this.prepareDOM();
    $(container).parents('.block-inner').find('h4')
      .text(dataFilter.dimensions[dimensionName].label);
    this.dimension(this.currentDimension).group(this.grouping);
    this.label((d) => {
      const sPerc = d3.format('.0%')(d.value / dataFilter.crossfilter.allFiltered().length);
      return `${d.key}: ${sPerc}`;
    });
  }

  prepareDOM() {
    d3.select(this.container).select('.chart').style('display', 'none');
  }

  _drawChart() {
    const self = this;
    super._drawChart();
    this._tip = d3.tip().attr('class', 'tooltip').html((d) => `${d.data.key}: ${d.value}`);
    this.svg().call(this._tip);
    this._g.select(`g.${this._sliceGroupCssClass}`)
      .selectAll(`g.${this._sliceCssClass}`)
      .each(function(d) {
        if (typeof d !== 'undefined') {
          const majorityAngle = Math.PI;
          if (d.endAngle - d.startAngle >= majorityAngle) {
            d3.select(this).classed('largest', true);
          } else {
            d3.select(this).classed('largest', false);
          }
        }
      })
      .on('mouseover', function(ev, d) {self._tip.show(d, this);})
      .on('mouseout', function(ev, d) {self._tip.hide(d, this);});
  }

  // Ugly workaround to avoid tooltop sticking
  _onClick(d) {
    this._tip.hide(d, this);
    if (this._g.attr('class') !== this._emptyCssClass) {
      this.onClick(d.data);
    }
  }
}
