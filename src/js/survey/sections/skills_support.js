import {d3} from '../../d3';
import {Section} from './base';
import {skillsSupport} from '../../strings';

export class SectionSkillsSupport extends Section {
    constructor(block, title, widgets) {
        super(block, title, widgets);
        this.addWidgets();
    }

    addWidgets() {
        const data = {
            questions: skillsSupport,
            options: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
            title: 'Do you get digital skills support from your company or organisation?'
        }
        this.multiradio = this.widgets.multiradio.newElement(data);
        this.appendChild(this.multiradio.container);
    }

}