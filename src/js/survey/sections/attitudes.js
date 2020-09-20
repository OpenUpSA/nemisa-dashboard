import {d3} from '../../d3';
import {Section} from './base';
import {attitudes} from '../../strings';

export class SectionAttitudes extends Section {
    constructor(block, title, widgets) {
        super(block, title, widgets);
        this.addWidgets();
    }

    addWidgets() {
        const data = {
            questions: attitudes,
            options: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
            title: 'What is your attitude toward using digital technologies?'
        }
        this.multiradio = this.widgets.multiradio.newElement(data);
        this.appendChild(this.multiradio.container);
    }

}