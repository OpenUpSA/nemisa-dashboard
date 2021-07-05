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
        this.warningContainer = this.block.select('.form-warning');
    }

    appendChild(element) {
        this.block.node().insertBefore(element, this.warningContainer.node());
    }

    get node() {
        return this.block.node();
    }

    displayWarnings(messages) {
        this.hideWarnings();
        this.warningContainer.append("ul")
            .selectAll("li")
            .data(messages)
            .enter()
                .append("li")
                .text(d => d)

        this.warningContainer.classed('hidden', false);
    }

    hideWarnings() {
        this.warningContainer.selectAll("*").remove()
        this.warningContainer.classed('hidden', true);

    }
}
