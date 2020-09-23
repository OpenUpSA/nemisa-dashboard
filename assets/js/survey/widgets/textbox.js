import d3 from '../../d3';
import {WidgetFactory} from './base';

class TextBox {
    constructor(container, title) {
        this.container = container;
        this.draw(title);
    }

    draw(title) {
        d3.select(this.container).select('.field-label').text(title);
    }

    getResult() {
        const el = d3.select(this.container).select('.text-field');
        return el.nodes()[0].value;
    }
}

export class TextWidgetFactory extends WidgetFactory {
    constructor(template) {
        super(template);
    }

    newElement(title) {
        const element = super.newElement();
        return new TextBox(element, title)
    }
}