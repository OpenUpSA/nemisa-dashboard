import d3 from '../d3';

class Pagination {
    constructor(startPage, totalPages) {
        this.currentPage = startPage;
        this.totalPages = totalPages;
        this.prepareDOM();
    }

    prepareDOM() {
        const container = d3.select('.pagination-page');
        this.currentPageLabel = container.select('#pagination-current');
        this.totalPageLabel = container.select('#pagination-total');
        this.updateLabels();
    }

    updateLabels() {
        this.currentPageLabel.text(this.currentPage);
        this.totalPageLabel.text(this.totalPages);
    }

    forward() {
        this.currentPage += 1;
        this.updateLabels();
    }

    back() {
        this.currentPage -= 1;
        this.updateLabels();
    }
}

export class FormNav {
    constructor(pages) {
        this.prepareDOM();
        this.currentPage = 0;
        this.firstPage = 0;
        this.lastPage = pages - 1;
        this.pagination = new Pagination(this.firstPage + 1, this.lastPage + 1);

        this.listeners = [];
    }

    enableButton(button) {
        button.classed('button--disabled', false)
    }

    disableButton(button) {
        button.classed('button--disabled', true)
    }

    atStart() {
        return this.currentPage <= this.firstPage;
    }

    atEnd() {
        return this.currentPage >= this.lastPage;
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    setButtons() {
        if (this.atStart())
            this.disableButton(this.prevButton);
        else
            this.enableButton(this.prevButton);

        if (this.atEnd())
            this.disableButton(this.nextButton);
        else
            this.enableButton(this.nextButton);
    }

    back() {
        if (this.atStart())
            return

        this.currentPage -= 1
        this.setButtons();
        this.pagination.back();

        this.listeners.forEach(listener => listener.onBack(this.currentPage));
    }

    forward() {
        if (this.atEnd())
            return

        this.currentPage += 1
        this.setButtons();
        this.pagination.forward();
        this.listeners.forEach(listener => listener.onForward(this.currentPage));
    }

    prepareDOM() {

        const self = this;
        this.prevButton = d3.selectAll("#survey-prev")
        this.nextButton = d3.selectAll("#survey-next")

        this.prevButton.on('click', () => this.back());
        this.nextButton.on('click', () => this.forward());
    }
}

