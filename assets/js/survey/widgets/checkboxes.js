import d3 from '../../d3';
import { WidgetFactory } from './base';

class CheckBox {
  constructor(container, options) {
    this.container = container;
    this.options = options;
    this.currentSelection = {}
    this.draw(this.container, options);
  }

  draw(container, options) {
    const self = this;
    const checkBoxContainer = d3.select(this.container);
    const elOptions = checkBoxContainer.selectAll('.checkbox-field');
    const tmplOption = elOptions.nodes()[0].cloneNode(true);
    const clsInput = 'w-checkbox-input';
    const clsSelected = 'w--redirected-checked';
    elOptions.remove();

    checkBoxContainer.selectAll('.w-checkbox')
    .data(this.options)
    .enter()
    .append(() => tmplOption.cloneNode(true))
    .each(function(d) {
      d3.select(this).select(`.${clsInput}`)
        .attr('id', d.key)
      d3.select(this).select('input')
        .attr('name', d.key)
        .attr('data-name', d.key);
        d3.select(this).select('.w-form-label').text(d.label);
    })
    .on('click', function(ev, d) {
      ev.preventDefault();
      const selected = ev.target.classList.contains(clsInput) && ev.target.classList.contains(clsSelected)
      d3.select(ev.target).classed(clsSelected, !selected);
      self.currentSelection[d.key] = !selected;
    })
  }

  getResult() {
    const result = this.options
      .filter((option) => this.currentSelection[option.key] === true)
      .map((option) => option.label)
    return result
  }
}

export class CheckboxesWidgetFactory extends WidgetFactory {
  constructor(template) {
    super(template);
  }

  newElement(title, options) {
    const element = super.newElement();
    d3.select(element).select('.field-label').text(title);
    return new CheckBox(element, options)
  }

}
