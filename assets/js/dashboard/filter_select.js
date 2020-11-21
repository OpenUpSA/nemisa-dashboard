import * as dc from 'dc'
import d3 from '../d3'

export class FilterSelect extends dc.SelectMenu {
  constructor(container, dimensionName, dataFilter) {
      super(container)
      this._$container = $(container)

      this._dimension = dataFilter.dimensions[dimensionName].dimension
      this._groups = this._dimension.group().all()
      this.dimension(this._dimension)
      this.group(this._dimension.group())
      this._options = {}
      this.render()
  }

  redraw() {
    this.render()
  }

  render() {
    this._$container.empty();
    this._groups.forEach(group => {
      this._options[group.key] = new SelectOption(
        group,
        this._dimension,
        this._filter.bind(this
      ));
      this._$container.append(this._options[group.key].render())
    });
  }

  _filter(key) {
    this._$container
      .parents('.dropdown-menu')
      .find('.dropdown-toggle')
      .children()
      .last()
      .text(key)
    this._dimension.filterExact(key)
    this.redrawGroup()
  }

}

// TODO: Do we keep classes in their own files? The below should move if so

const $SELECT_TEMPLATE = $('.dropdown-list__active').first().clone()

class SelectOption {
  constructor(group, dimension, filter) {
    this.group = group
    this.dimension = dimension
    this.filter = filter
    this.$element = $SELECT_TEMPLATE.clone()
    this.$element
      .data('key', group.key)
      .click(() => this.select(group.key))
    this.$element.find('.dropdown-link__text').text(group.key)
    this.$element.find('.dropdown-link').children().last().text(group.value)
  }

  select(key) {
    this.filter(key)
  }

  render() {
    this.update()
    return this.$element
  }

  update() {
    let selected = this.group.key === this.dimension.currentFilter()
    this.$element.find('.dropdown-link__check').css('visibility', selected ? 'visible' : 'hidden')
  }
}
