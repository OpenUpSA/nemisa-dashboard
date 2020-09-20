import {d3} from '../../d3';
import {WidgetFactory} from './base';

class SelectBox {
    constructor(container, options) {
        this.container = container;

        this.draw(options);
    }

    draw(options) {
        const selectBox = d3.select(this.container).select('select');
        const elOptions = selectBox.selectAll('option');
        const tmplOption = elOptions.nodes()[0].cloneNode(true);
        elOptions.remove();

        selectBox.selectAll('option')
            .data(options)
            .enter()
            .append(function(d) {
                const newOption = d3
                    .select(tmplOption.cloneNode(true))
                    .attr('value', d.key)
                    .text(d.label)

                return newOption.nodes()[0];

            })
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