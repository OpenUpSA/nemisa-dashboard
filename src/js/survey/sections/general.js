import {d3} from '../../d3';
import {Section} from './base';

export class SectionGeneral extends Section {
    constructor(block, title, widgets) {
        super(block, title, widgets);
        this.addWidgets();
    }

    addWidgets() {
        const options = [
            ['_ind_ict', 'Communication and Information Technology'],
            ['_ind_domestic', 'Domestic Work'],
            ['_ind_education', 'Education'],
            ['_ind_financial', 'Financial'],
            ['_ind_manufacturing', 'Manufacturing'],
            ['_ind_mining', 'Mining'],
            ['_int_textiles', 'Textiles'],
            ['_ind_sports', 'Sports & Events'],
            ['_ind_tourism', 'Tourism'],
            ['_ind_wholesale', 'Wholesale and Retail'],
            ['_ind_charity', 'Non-profit and Charity'],
        ]

        this.appendChild(this.widgets.textbox.newElement('Full Name'));
        this.appendChild(this.widgets.textbox.newElement('Email'));
        this.appendChild(this.widgets.select.newElement('Industry', options));
    }
}