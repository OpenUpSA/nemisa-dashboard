import * as dc from 'dc';

export class FilteredCount extends dc.DataCount {
    constructor(container, dataFilter) {
        super(container)
        this.crossfilter(dataFilter.crossfilter).groupAll(dataFilter.groupAll())
    }
}