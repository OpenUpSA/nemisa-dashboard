import * as dc from 'dc';
import {d3} from './d3';

export class GenderPie extends dc.PieChart {
    constructor(dataFilter, container) {
        super(container);
        this.container = container;
        this.dimGender = dataFilter.dimensions['gender'].dimension;
        this.grpGender = this.dimGender.group().reduceCount();
        this.chart = null;

        this.prepareWidget(container);
        this.prepareDOM();

        this.dimension(this.dimGender).group(this.grpGender);
    }

    prepareWidget(container) {
        return
        this.chart = new dc.PieChart(container)

        this.chart
          .dimension(this.dimGender)
          .group(this.grpGender)
    }

    prepareDOM() {
        d3.select(this.container).select(".chart").style("display", "none");
    }

    _drawChart() {
        const self = this;
        this._tip = d3.tip().attr('class', 'tooltip tooltip2').html(function(d) { return "yo yo yo"; console.log(d);return `${d.count}<br>${d.label}`});
        d3.select(this.container).call(this._tip);

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
                .on("mouseover", function(ev, d) {
                    const path = d3.select(this).select('path').node();
                    self._tip.show(d, path);
                })
                .on("mouseout", function(ev, d) {
                    const path = d3.select(this).select('path').node();
                    self._tip.hide(d, path);
                })
    }
}