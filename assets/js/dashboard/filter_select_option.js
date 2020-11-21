import $ from 'jquery';

const $SELECT_TEMPLATE = $('.dropdown-list__active').first().clone();

export default class FilterSelectOption {
  constructor(group, dimension, filter) {
    this.group = group;
    this.dimension = dimension;
    this.filter = filter;
    this.$element = $SELECT_TEMPLATE.clone();
    this.$element
      .data('key', group.key)
      .click(() => this.select(group.key));
    this.$element.find('.dropdown-link__text').text(group.key);
    this.$element.find('.dropdown-link').children().last().text(group.value);
  }

  select(key) {
    this.filter(key);
  }

  render() {
    this.update();
    return this.$element;
  }

  update() {
    const selected = this.group.key === this.dimension.currentFilter();
    this.$element.find('.dropdown-link__check').css('visibility', selected ? 'visible' : 'hidden');
  }
}
