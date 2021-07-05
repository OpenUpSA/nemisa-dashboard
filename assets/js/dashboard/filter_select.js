import * as dc from 'dc';
import $ from 'jquery';

import FilterSelectOption from './filter_select_option';

export class FilterSelect extends dc.SelectMenu {
  constructor(container, dimensionName, dataFilter) {
    super(container);
    this.$container = $(container);
    this.dataFilterDimension = dataFilter.dimensions[dimensionName].dimension;
    this.dimension(dimensionName);
    this.group(this.dataFilterDimension.group());
    this.render();
  }

  redraw() {
    this.render();
  }

  render() {
    const filterSelectionOptions = this._group.all().map((group) => new FilterSelectOption(
      group,
      this.dataFilterDimension,
      this._filter.bind(this),
    ));
    this.$container.empty();
    filterSelectionOptions.forEach((option) => this.$container.append(option.render()));
  }

  _filter(key) {
    this.$container
      .parents('.dropdown-menu')
      .find('.dropdown-toggle')
      .children()
      .last()
      .text(key);
    this.dataFilterDimension.filterExact(key);
    this.redrawGroup();
  }
}
