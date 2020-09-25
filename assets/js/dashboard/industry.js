import * as dc from 'dc';
import d3 from '../d3';

function wrapper(width, padding = 10) {
    return function() {
        const self = d3.select(this)
        let textLength = self.node().getComputedTextLength(),
            text = self.text();

        while (textLength > (width - 2 * padding) && text.length > 0) {
            text = text.slice(0, -1);
            self.text(text + '...');
            textLength = self.node().getComputedTextLength();
        }
    } 
}

export class IndustryChart extends dc.RowChart {
    constructor(dataFilter, container) {
        super(container);

        this._container = container;
        this._dimension= dataFilter.dimensions['industry'].dimension;
        this._group= this._dimension.group().reduceCount();

        this.prepareWidget(container);
        this.prepareDOM();
    }

    prepareWidget(container) {

        this
          .dimension(this._dimension)
          .group(this._group)
          .data(function (group) { return group.top(12); })
          .gap(15)
          .height(400)
          .labelOffsetX(-10)
    }

    prepareDOM() {
        d3
            .select(this._container)
            .classed("industry-chart", true)
                .select(".chart")
                .style("display", "none");
    }

    _calculateAxisScale() {
        if (!this._x || this._elasticX) {
            const _extent = d3.extent(this._rowData, d => this.cappedValueAccessor(d));
            if (_extent[0] > 0) {
                _extent[0] = 0;
            }
            if (_extent[1] < 0) {
                _extent[1] = 0;
            }
            const startX = 230;
            this._x = d3.scaleLinear().domain(_extent)
                .range([startX, this.effectiveWidth()]);
        }
        this._xAxis.scale(this._x);
    }

    _drawChart() {
        super._drawChart();
        const self = this;

        this._tip = d3.tip().attr('class', 'tooltip').html(function(d) {
            return `${d.key}: ${d.value}`; 
        });
        this.svg().call(this._tip);

        this.selectAll("g .row")
            .on("mouseover", function(ev, d, i, j) {
                self._tip.show(d, this);
            })
            .on("mouseout", function(ev, d) {
                self._tip.hide(d, this);
            })

        const wrap = wrapper(250);
        this.selectAll('g .row text')
            .text("")
            .append('tspan').text(function(d) { return d.key; }).each(wrap);
    }

}