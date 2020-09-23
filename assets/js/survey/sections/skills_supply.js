import d3 from '../../d3';
import {Section} from './base';
import {skillsLearning} from '../../strings';

export class SectionSkillsSupply extends Section {
    constructor(block, title, widgetFactories) {
        super(block, title, widgetFactories);
        this.addWidgets();
    }

    addWidgets() {
        const data = {
            questions: skillsLearning,
            options: ['Yes', 'No', 'N/A'],
            title: 'How did you learn to use the digital technologies currently used in your organisation? Tick all that apply (More than one option can be selected).'
        }
        this.multiradio = this.widgetFactories.multiradio.newElement(data);
        this.appendChild(this.multiradio.container);
    }

    getResult() {
        return {skills_supply: this.multiradio.getResult()}
    }

}