import d3 from '../../d3';
import {Section} from './base';
import {mostUsedSkill} from '../../strings';

export class SectionDigitalDeployment extends Section {
    constructor(block, title, widgetFactories) {
        super(block, title, widgetFactories);
        this.addWidgets();
    }

    addWidgets() {
        const data = {
            questions: mostUsedSkill,
            options: ['Never', 'Rarely', 'Half the time', 'Often', 'Always', 'N/A'],
            title: 'How often do you use digital technologies to perform the following ACTIVITIES in your workplace?'
        }
        this.multiradio = this.widgetFactories.multiradio.newElement(data);
        this.appendChild(this.multiradio.container);
    }

    getResult() {
        return {attitude: this.multiradio.getResult()}
    }
}