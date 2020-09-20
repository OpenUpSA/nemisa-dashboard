import {d3} from '../../d3';
import {Section} from './base';

export class SectionGeneral extends Section {
    constructor(block, title, widgets) {
        super(block, title, widgets);
        this.addWidgets();
    }

    addWidgets() {
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

        this.appendChild(this.widgets.textbox.newElement('Full Name'));
        this.appendChild(this.widgets.textbox.newElement('Email'));
        this.appendChild(this.widgets.select.newElement('Industry', options).container);
    }
}