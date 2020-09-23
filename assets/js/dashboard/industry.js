import * as dc from 'dc';
import d3 from '../d3';

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
          .colorCalculator((d, i) => {

            console.log(d)
            if (this._isSelectedRow(d))
                return "#9D1E14";
            if (i == 0)
                return "#EE7B40";
            return "#CCCCCC";

          })
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

    _calculateAxisScale () {
        if (!this._x || this._elasticX) {
            const _extent = d3.extent(this._rowData, d => this.cappedValueAccessor(d));
            if (_extent[0] > 0) {
                _extent[0] = 0;
            }
            if (_extent[1] < 0) {
                _extent[1] = 0;
            }
            const startX = 180;
            this._x = d3.scaleLinear().domain(_extent)
                .range([startX, this.effectiveWidth()]);
        }
        this._xAxis.scale(this._x);
    }

}