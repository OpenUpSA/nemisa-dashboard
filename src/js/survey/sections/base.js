import {d3} from '../../d3';

export class Section {
    constructor(block, title, widgets) {
        this.block = block;
        this.title = title;
        this.widgets = widgets;
        this.prepareDOM();
    }

    prepareDOM() {
        d3.select(this.block).select("h3").text(this.title);
    }

    appendChild(element) {
        this.block.appendChild(element);
    }
}
