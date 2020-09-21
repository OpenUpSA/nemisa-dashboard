import {d3} from '../../d3';
import {Section} from './base';

export class SectionGeneral extends Section {
    constructor(block, title, widgetFactories) {
        super(block, title, widgetFactories);
        this.addWidgets();
    }

    addWidgets() {
        const self = this;
        const options = [
            {key: '_ind_ict', label: 'Communication and Information Technology'},
            {key: '_ind_domestic', label: 'Domestic Work'},
            {key: '_ind_education', label: 'Education'},
            {key: '_ind_financial', label: 'Financial'},
            {key: '_ind_manufacturing', label: 'Manufacturing'},
            {key: '_ind_mining', label: 'Mining'},
            {key: '_int_textiles', label: 'Textiles'},
            {key: '_ind_sports', label: 'Sports & Events'},
            {key: '_ind_tourism', label: 'Tourism'},
            {key: '_ind_wholesale', label: 'Wholesale and Retail'},
            {key: '_ind_charity', label: 'Non-profit and Charity'},
        ]

        this.widgets = [
            {key: 'Full Name', widget: this.widgetFactories.textbox.newElement('Full Name')},
            {key: 'Email', widget: this.widgetFactories.textbox.newElement('Email')},
            {key: 'Industry', widget: this.widgetFactories.select.newElement('Industry', options)}
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