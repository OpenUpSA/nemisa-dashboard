import {dataCount as dcDataCount}  from 'dc';
import d3 from '../d3';

// const clsFilter = '.filtered-value';
const clsFilter = '.chart-filters__filtered_inner';

export class ScreenElements {
    constructor(dataFilter) {
        this.dataFilter = dataFilter;
        this.elements = {
            responseCount: $(".response-count")
        }


        const c3 = d3;
        this.elFilter = d3.select(clsFilter);
        
        this.prepareDOM();
        this.prepareWidget();
    }

    prepareWidget() {
        this.recordCounter = dcDataCount(clsFilter)
            .crossfilter(this.dataFilter.crossfilter)
            .groupAll(this.dataFilter.groupAll());
    }


    prepareDOM() {
        this.hideLoading();
        $('#responses-value', this.elements.responseCount).text(this.dataFilter.total());
        this.createMissingValueElements();
    }

    createMissingValueElements() {
        // $('.filtered-value').html(
        //     `<span class="filter-count">0</span>/<span class="total-count">${this.dataFilter.total()}</span>`
        // )

        d3.select(clsFilter).classed("filter-count", true);

        this.elFilter.select('.chart-filters__filtered_total-value').classed('filter-count', true);
        this.elFilter.select('.chart-filters__filtered_value').classed('total-count', true);
    }

    hideLoading() {
        $('.chart-filters__filtered .loading').css('display', 'none');
        $('.loading', this.elements.responseCount).css('display', 'none');
        $('.loading').css('display', 'none');
    }
}