import {d3} from '../../d3';
import {Section} from './base';
import {currentTech} from '../../strings';

export class SectionTechnologyUsed extends Section {
    constructor(block, title, widgetFactories) {
        super(block, title, widgetFactories);
        this.addWidgets();
    }

    addWidgets() {
        const data = {
            questions: currentTech,
            options: ['Yes', 'No', 'N/A'],
            title: 'Among the following digital technologies which ones do you currently use to perform your daily duties.'
        }
        this.multiradio = this.widgetFactories.multiradio.newElement(data);
        this.appendChild(this.multiradio.container);
    }

    getResult() {
        return {technology_used: this.multiradio.getResult()}
    }
}