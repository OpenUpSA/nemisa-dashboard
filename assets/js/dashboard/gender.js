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
    }
}