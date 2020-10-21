import d3 from '../../d3';

export class Section {
    constructor(block, title, widgetFactories) {
        this.block = d3.select(block);
        this.title = title;
        this.widgetFactories = widgetFactories;
        this.prepareDOM();
    }

    prepareDOM() {
        this.block.select("h3").text(this.title);
    }

    appendChild(element) {
        const warningContainer = this.block.select('.form-warning')
        this.block.node().insertBefore(element, warningContainer.node());
    }

    get node() {
        return this.block.node();
    }
}
