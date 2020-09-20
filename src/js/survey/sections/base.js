import {d3} from '../../d3';

export class Section {
    constructor(block, title, widgetFactories) {
        this.block = block;
        this.title = title;
        this.widgetFactories = widgetFactories;
        this.prepareDOM();
    }

    prepareDOM() {
        d3.select(this.block).select("h3").text(this.title);
    }

    appendChild(element) {
        this.block.appendChild(element);
    }
}
