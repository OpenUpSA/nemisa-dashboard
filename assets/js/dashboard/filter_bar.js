import $ from 'jquery';
import * as dc from 'dc';
import d3 from '../d3';

export class FilterBar extends dc.BaseMixin {
  constructor(parent, dataFilter, group) {
    super();
    this.dataFilter = dataFilter;
    this._parent = parent;
    this.$template = $('.components__filter-chips').find('.chart-filter').first();
    this.$default = $(parent).find('.chart-filter--default');
    this.$clear = $(parent).find('.chart-filters__clear');
    this._filters = {};
    $(this._parent).find('.chart-filters__inner').find('.chart-filter:not(.chart-filter--default)').remove();
    dc.registerChart(this, group);
  }

  displayNoFilters() {
    this.$default.css('display', 'flex');
    this.$clear.css('display', 'none');
  }

  hideDefault() {
    this.$default.css('display', 'none');
    this.$clear.css('display', 'flex');
  }

  removeFilter(filter) {
    const { label, dimension } = filter;
    dc.chartRegistry.list().forEach((chart) => {
      if (chart.dimension() === dimension) {
        chart.filterAll();
      }
    });

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
      const $newFilter = this.$template.clone();
      const { label } = filter;
      $(this._parent).find('.chart-filters__inner').append($newFilter);
      $newFilter.css('display', 'flex');
      $('.chart-filter__name', $newFilter).text(filter.label);
      $('.fa-icon', $newFilter).click(() => {
        this.removeFilter(filter);
      });
      this._filters[label] = {
        filter,
        el: $newFilter,
      };
    }
  }

  removeAllFilters() {
    const filters = Object.values(this.dataFilter.dimensions);
    filters.forEach((filter) => {
      const filterArray = filter instanceof Array ? filter : [filter];
      filterArray.forEach((f) => {
        this.removeFilter(f);
      });
    });
  }

  render() {
    d3.selectAll('.chart-filters__clear .button').on('click', () => {
      dc.chartRegistry.list().forEach(() => {
        this.removeAllFilters();
      });
    });
    this.displayNoFilters();
    this.redraw();
  }

  redraw() {
    const { dimensions } = this.dataFilter;

    Object.keys(this.dataFilter.dimensions).forEach((key) => {
      const dimension = dimensions[key] instanceof Array ? dimensions[key] : [dimensions[key]];
      dimension.forEach((d) => {
        const currentFilter = d.dimension.currentFilter();
        if (currentFilter) {
          this.drawFilter(d);
        } else if (this._filters[d.label]) {
          this.removeFilter(d);
        }
      });
    });

    if (Object.keys(this._filters).length === 0) {
      this.displayNoFilters();
    }
  }
}
