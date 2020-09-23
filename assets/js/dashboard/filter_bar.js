import * as dc from 'dc';
import d3 from '../d3';

// import {BaseMixin} from 'dc';

export class FilterBar extends dc.BaseMixin {
    constructor(parent, dataFilter, group) {
        super();

        this.dataFilter = dataFilter;
        this._parent = parent;
        this._filters = {}

        dc.registerChart(this, group);
    }

    displayNoFilters() {
        this.elDefault.css("display", "flex");
    }

    hideDefault() {
        this.elDefault.css("display", "none");
    }

    removeFilter(label) {
        if (this._filters[label]) {
            this._filters[label].el.remove();
            this._filters[label].filter.dimension.filterAll();

            delete this._filters[label];

            this.redrawGroup();
        }
    }

    drawFilter(filter) {
        if (!this._filters[filter.label]) {
            this.hideDefault();
            const currentFilter = filter.dimension.currentFilter();
            const newFilter = this.elFilter.cloneNode(true);
            const el = $(newFilter);
            let label = filter.label;
            this.elParent.append(newFilter);

            el.css('display', 'flex')
            $('.chart-filter__name', el).text(filter.label);
            $('.fa-icon', el).click(ev => {
                this.removeFilter(filter.label);
            })

            this._filters[filter.label] = {
                filter: filter, el: el
            }
        }
    }

    render() {
        this.elParent = this._parent;
        this.elDefault = $('.chart-filter--default', this._parent);
        this.elFilter = $('.chart-filter', this._parent)[2]

        $('.chart-filter', this._parent)[1].remove();
        $('.chart-filter', this._parent)[1].remove();

        this.displayNoFilters();

        this.redraw();
    }

    redraw() {
        const dimensions = this.dataFilter.dimensions;

        Object.keys(this.dataFilter.dimensions).forEach(key => {
            let dimension = dimensions[key];
            if (!(dimension instanceof Array))
                dimension = [dimension];

            dimension.forEach(d => {
                const currentFilter = d.dimension.currentFilter();
                if (currentFilter) {
                    this.drawFilter(d);
                } else if (this._filters[d.label]) {
                    this.removeFilter(d.label);
                }
            })
        })

        if (Object.keys(this._filters).length == 0)
            this.displayNoFilters();

    }

}