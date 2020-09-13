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
        super._drawChart()

        this._g.each(function(d) {
            if (d != undefined) {
                const majorityAngle = Math.PI;
                if (d.endAngle - d.startAngle >= majorityAngle)
                    d3.select('path').classed('largest', true)
                else
                    d3.select('path').classed('largest', false)

            }
        })
    }
}