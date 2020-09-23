import {d3} from '../../d3';
import {Section} from './base';
import {industries} from '../../strings';

export class SectionGeneral extends Section {
    constructor(block, title, widgetFactories) {
        super(block, title, widgetFactories);
        this.addWidgets();
    }

    addWidgets() {
        const self = this;

        this.widgets = [
            {key: 'Full Name', widget: this.widgetFactories.textbox.newElement('Full Name')},
            {key: 'Email', widget: this.widgetFactories.textbox.newElement('Email')},
            {key: 'Industry', widget: this.widgetFactories.select.newElement('Industry', industries)}
        ]

        this.widgets.forEach(el => {
            self.appendChild(el.widget.container);
        })
    }

    getResult() {
        const js = {}
        this.widgets.forEach(el => {
            js[el.key] = el.widget.getResult();
        })

        return js
    }
}