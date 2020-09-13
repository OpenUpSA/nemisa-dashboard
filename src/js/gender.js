import * as dc from 'dc';
import {d3} from './d3';

export class GenderPie {
    constructor(dataFilter, container) {
        this.container = container;
        this.dimGender = dataFilter.dimensions['gender'].dimension;
        this.grpGender = this.dimGender.group().reduceCount();
        this.chart = null;

        this.prepareWidget(container);
        this.prepareDOM();
    }

    prepareWidget(container) {
        this.chart = new dc.PieChart(container)

        this.chart
          .dimension(this.dimGender)
          .group(this.grpGender)
          .colorCalculator((d, idx) => ({
                0: "#CFCFCF",
                1: "red"
            }[idx]))
    }

    prepareDOM() {
        d3.select(this.container).select(".chart").style("display", "none");
    }
}