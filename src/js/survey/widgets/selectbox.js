import {d3} from '../../d3';
import {WidgetFactory} from './base';

class SelectBox {
    constructor(container, options) {
        this.container = container;
        this.options - options;

        this.draw(options);

        this.currentValue = null;
    }

    draw(options) {
        const self = this;
        const defaultOption = [{"key": "not_answered", "label": "Select a value"}]
        const selectBox = d3.select(this.container).select('select');
        const elOptions = selectBox.selectAll('option');
        const tmplOption = elOptions.nodes()[0].cloneNode(true);
        elOptions.remove();

        selectBox.on('change', function(ev, d) {
            const idx =ev.target.options.selectedIndex;
            this.currentValue = options[idx - 1];
        })

        selectBox.selectAll('option')
            .data(defaultOption.concat(options))
            .enter()
            .append(function(d) {
                const newOption = d3
                    .select(tmplOption.cloneNode(true))
                    .attr('value', d.key)
                    .text(d.label)

                return newOption.nodes()[0];

            })
    }

    getResult() {
        return this.currentValue
    }
}

export class SelectWidgetFactory extends WidgetFactory {
    constructor(template) {
        super(template);
    }

    newElement(title, options) {
        const element = super.newElement();
        return new SelectBox(element, options)
        // const selectBox = d3.select(element).select('select');
        // const elOptions = selectBox.selectAll('option');
        // const tmplOption = elOptions.nodes()[0].cloneNode(true);
        // elOptions.remove();

        // d3.select(element).select('.field-label').text(title);

        // options.forEach(el => {
        //     const newOption = tmplOption.cloneNode(true);
        //     d3.select(newOption).attr('value', el[0]).text(el[1]);
        //     selectBox.nodes()[0].appendChild(newOption)
        // })

        // return element
    }
}