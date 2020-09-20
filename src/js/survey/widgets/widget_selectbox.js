import {d3} from '../../d3';
import {WidgetFactory} from './widget_base';

export class SelectWidgetFactory extends WidgetFactory {
    constructor(template) {
        super(template);
    }

    newElement(title, options) {
        const element = super.newElement();
        const selectBox = d3.select(element).select('select');
        const elOptions = selectBox.selectAll('option');
        const tmplOption = elOptions.nodes()[0].cloneNode(true);
        elOptions.remove();

        d3.select(element).select('.field-label').text(title);

        options.forEach(el => {
            const newOption = tmplOption.cloneNode(true);
            d3.select(newOption).attr('value', el[0]).text(el[1]);
            selectBox.nodes()[0].appendChild(newOption)
        })

        return element
    }

    _optionTemplate(element) {

    }
}