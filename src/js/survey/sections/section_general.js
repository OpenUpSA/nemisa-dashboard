import {d3} from '../../d3';
import {Section} from './section_base';

export class SectionGeneral extends Section {
    constructor(block, title, widgets) {
        super(block, title, widgets);
        this.addWidgets();
    }

    addWidgets() {
        const options = [
            ['_option1', 'option1'],
            ['_option2', 'option2'],
            ['_option3', 'option3'],
        ]

        this.appendChild(this.widgets.textbox.newElement('Full Name'));
        this.appendChild(this.widgets.textbox.newElement('Email'));
        this.appendChild(this.widgets.select.newElement('Industry', options));
    }
}