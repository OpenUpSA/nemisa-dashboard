import {d3} from '../../d3';
import {Section} from './base';
import {currentTech} from '../../strings';

export class SectionTechnologyUsed extends Section {
    constructor(block, title, widgets) {
        super(block, title, widgets);
        this.addWidgets();
    }

    addWidgets() {
        const data = {
            questions: currentTech,
            options: ['Yes', 'No', 'N/A'],
            title: 'Among the following digital technologies which ones do you currently use to perform your daily duties.'
        }
        const multiradio = this.widgets.multiradio.newElement(data);
        console.log(multiradio.getResult());
        this.appendChild(multiradio.container);
    }

}