import {d3} from '../../d3';
import {Section} from './base';
import {futureTech} from '../../strings';

export class SectionFutureTechnologies extends Section {
    constructor(block, title, widgets) {
        super(block, title, widgets);
        this.addWidgets();
    }

    addWidgets() {
        const data = {
            questions: futureTech,
            options: ['Yes', 'No', 'N/A'],
            title: 'In your opinion what are the other digital technologies you will require to perform your job in the future? If you are unsure, leave blank.'
        }
        this.multiradio = this.widgets.multiradio.newElement(data);
        this.appendChild(this.multiradio.container);
    }

}