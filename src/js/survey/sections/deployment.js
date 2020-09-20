import {d3} from '../../d3';
import {Section} from './base';
import {mostUsedSkill} from '../../strings';

export class SectionDigitalDeployment extends Section {
    constructor(block, title, widgets) {
        super(block, title, widgets);
        this.addWidgets();
    }

    addWidgets() {
        const data = {
            questions: mostUsedSkill,
            options: ['Never', 'Rarely', 'Half the time', 'Often', 'Always', 'N/A'],
            title: 'How often do you use digital technologies to perform the following ACTIVITIES in your workplace?'
        }
        const multiradio = this.widgets.multiradio.newElement(data);
        console.log(multiradio.getResult());
        this.appendChild(multiradio.container);
    }
}