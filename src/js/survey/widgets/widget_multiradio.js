import {d3} from '../../d3';
import {WidgetFactory} from './widget_base';

class RadioRow {
    constructor(template, title, count) {
        this.template = template;
        this.container = template.cloneNode(true);
        this.draw(this.container, title, count)
        this.currentSelection = null;
    }

    draw(container, title, count) {
        d3.select(container).select('.survey-grid-row__label').text(title)
        this.drawRadios(container, count);
    }

    drawRadios(container, count) {
        const self = this;
        const data = [...new Array(count).keys()]
        const tmplRadio = this._getTemplateRadio(container);

        d3.select(container).selectAll('.survey-grid-row__radio')
            .data(data)
            .enter()
            .append(function(d) {
                return tmplRadio.cloneNode(true);
            })
            .style('grid-area', function(d, idx) {
                if (idx > 0)
                    return `Area-${idx + 1}`;
                else
                    return 'Area';
            })
            .select('.w-radio-input')
                .on('click', function(ev, d, idx) {
                    const clsSelected = 'w--redirected-checked';
                    d3.select(container).selectAll(`.${clsSelected}`).classed(clsSelected, false);
                    d3.select(this).classed(clsSelected, true);
                    self.currentSelection = idx;
                })
    }

    _getTemplateRadio(container) {
        const elRadios = d3.select(container).selectAll('.survey-grid-row__radio');
        const tmplRadio = elRadios.nodes()[0].cloneNode(true);
        elRadios.remove();
        return tmplRadio;
    }

}

class MultiRadioWidget {
    constructor(container, options, rows) {
        this.container = container;
        this.options = options;
        this.rows = rows || [];

        this.draw();
    } 

    draw() {
        const header = d3.select(this.container).select('.survey-grid--head');
        const labels = header.selectAll('.survey-grid-column__label')
        const tmplLabel = labels.nodes()[0].cloneNode(true);
        labels.remove();

        header.selectAll('.survey-grid-column__label')
            .data(this.options)
            .enter()
            .append(function(d, idx) {
                return tmplLabel.cloneNode(true)
            })
            .style('grid-area', function(d, idx) {
                if (idx > 0)
                    return `Area-${idx + 1}`;
                else
                    return 'Area';
            })
            .attr('id', null)
            .each(function(d) {
                d3.select(this).select('.label').text(d);
            })
    }

    addRow(row) {
        this.container.appendChild(row.container); 
        this.rows.push(row);
    }
}

export class MultiRadioWidgetFactory extends WidgetFactory {
    constructor(template) {
        super(template);
    }

    newElement(rows, options) {
        const element = super.newElement();
        const elRows = d3.select(element).selectAll('.survey-grid--row');
        const tmplRow = elRows.nodes()[0].cloneNode(true);
        elRows.remove();

        const multiRadioWidget = new MultiRadioWidget(element, options);
        rows.forEach(rowData => {
            const row = new RadioRow(tmplRow, rowData, options.length);
            multiRadioWidget.addRow(row);
        })

        return multiRadioWidget;
    }
}

