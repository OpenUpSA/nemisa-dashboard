import * as dc from 'dc';
import d3 from '../d3';

export class GenderPie extends dc.PieChart {
    constructor(dataFilter, container) {
        super(container);
        this.container = container;
        this.dimGender = dataFilter.dimensions['gender'].dimension;
        this.grpGender = this.dimGender.group().reduceCount();
        this.chart = null;

        this.prepareDOM();

        this.dimension(this.dimGender).group(this.grpGender);
        this.label(function(d) {
            const perc = d.value / dataFilter.crossfilter.allFiltered().length 
            const sPerc = d3.format('.0%')(perc)

            return `${d.key}: ${sPerc}`;
        })
    }

    prepareDOM() {
        d3.select(this.container).select(".chart").style("display", "none");
    }

    _drawChart() {
        const self = this;

        super._drawChart()


        this._tip = d3.tip().attr('class', 'tooltip').html(function(d) {
            return `${d.data.key}: ${d.value}`; 
        });
        this.svg().call(this._tip);

        this._g.select(`g.${this._sliceGroupCssClass}`)
                .selectAll(`g.${this._sliceCssClass}`)
                .each(function(d) {
                    if (d != undefined) {
                        const majorityAngle = Math.PI;
                        if (d.endAngle - d.startAngle >= majorityAngle)
                            d3.select(this).classed('largest', true)
                        else
                            d3.select(this).classed('largest', false)
                    }
                })
                .on("mouseover", function(ev, d, i, j) {
                    self._tip.show(d, this);
                })
                .on("mouseout", function(ev, d) {
                    self._tip.hide(d, this);
                })
    }
}