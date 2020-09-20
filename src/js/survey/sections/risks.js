import {d3} from '../../d3';
import {Section} from './base';
import {perceivedRisk} from '../../strings';

export class SectionPerceivedRisk extends Section {
    constructor(block, title, widgets) {
        super(block, title, widgets);
        this.addWidgets();
    }

    addWidgets() {
        const data = {
            questions: perceivedRisk,
            options: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
            title: 'Perceived risk associated with digital technology usage in the workplace.'
        }
        this.multiradio = this.widgets.multiradio.newElement(data);
        this.appendChild(this.multiradio.container);
    }

}