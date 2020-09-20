import {d3} from '../../d3';
import {WidgetFactory} from './base';

export class TextWidgetFactory extends WidgetFactory {
    constructor(template) {
        super(template);
    }

    newElement(title) {
        const element = super.newElement();
        d3.select(element).select('.field-label').text(title);
        return element
    }

}