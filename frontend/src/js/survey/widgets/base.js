import {d3} from '../../d3';

export class WidgetFactory {
    constructor(template) {
        this.template = template;
        this.prepareDOM();
    }

    prepareDOM() {
    }

    newElement() {
        return this.template.cloneNode(true);
    }

    cloneElement(el) {
        const clone = d3.select(el).nodes()[0].cloneNode(true);
        d3.select(clone).attr('id', null);

        return clone;
    }
}