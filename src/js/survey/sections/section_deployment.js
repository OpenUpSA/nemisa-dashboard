import {d3} from '../../d3';
import {Section} from './section_base';

export class SectionDigitalDeployment extends Section {
    constructor(block, title, widgets) {
        super(block, title, widgets);
        this.addWidgets();
    }

    addWidgets() {
        const rows = ['blah blah', 'and another']
        const options = ['never', 'never never', 'of fine']
        const multiradio = this.widgets.multiradio.newElement(rows, options);
        this.appendChild(multiradio.container);
    }
}