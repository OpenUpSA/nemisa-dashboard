const labelClass = '.filtered-value';

export class FilteredCount {
    constructor(dataFilter) {
        this.dataFilter = dataFilter;
        this.element = $(labelClass);
        this.update();
        
    }

    get total() {
        return this.dataFilter.total();
    }

    get filteredCount() {
        return this.dataFilter.count();
    }

    get label() {
        return `${this.filteredCount}/${this.total}`;
    }

    update() {
        this.element.text(this.label);
    }
}