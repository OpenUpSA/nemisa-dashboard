import {d3} from '../../d3';
import {WidgetFactory} from './base';

class RadioRow {
    constructor(template, title, options) {
        this.template = template;
        this.container = template.cloneNode(true);
        this.draw(this.container, title, options)
        this.key = title.key
        this.options = options

        this.currentSelection = null;
        this.currentValue = null;
    }

    draw(container, title, options) {
        d3.select(container).select('.survey-grid-row__label').text(title.label)
        this.drawRadios(container, options);
    }

    drawRadios(container, options) {
        const self = this;
        const tmplRadio = this._getTemplateRadio(container);

        d3.select(container).selectAll('.survey-grid-row__radio')
            .data(options)
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
                    self.currentValue = d;
                })
    }

    _getTemplateRadio(container) {
        const elRadios = d3.select(container).selectAll('.survey-grid-row__radio');
        const tmplRadio = elRadios.nodes()[0].cloneNode(true);
        elRadios.remove();
        return tmplRadio;
    }

    getResult() {
        return {
            key: this.key, result: this.currentValue
        }
    }

}

class MultiRadioWidget {
    constructor(container, title, options, rows) {
        this.container = container;
        this.options = options;
        this.rows = rows || [];
        this.title = title;

        this.draw();
    } 

    draw() {
        const header = d3.select(this.container).select('.survey-grid--head');
        const richText = d3.select(this.container).select('.survey-description p').text(this.title)
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

    getResult() {
        const results = this.rows.map(row => row.getResult());
        return results;
    }
}

export class MultiRadioWidgetFactory extends WidgetFactory {
    constructor(template) {
        super(template);
    }

    newElement(data, options) {
        const element = super.newElement();
        const elRows = d3.select(element).selectAll('.survey-grid--row');
        const tmplRow = elRows.nodes()[0].cloneNode(true);
        elRows.remove();

        const multiRadioWidget = new MultiRadioWidget(element, data.title, data.options);
        data.questions.forEach(question => {
            const row = new RadioRow(tmplRow, question, data.options);
            multiRadioWidget.addRow(row);
        })

        return multiRadioWidget;
    }
}

