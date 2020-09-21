import * as dc from 'dc';
import {d3} from './d3';
import {BaseMixin} from 'dc';

export class CustomBubbleChart extends BaseMixin {
    constructor(parent, dataFilter, group) {
        super();

        this._groupAll = null;
        this._colors = null;
        this._width = this._height = 200;
        this._minRadius = 5, this._maxRadius = 20;
        this._duration = 50;
        this._root = d3.select(parent);
        this._circles = null;
        this._nodes = null;
        this._minRadiusLabel = 20;
        this._total = dataFilter.total();

        dc.registerChart(this, group);
    }

    dimensions(dimensions) {
        if (!arguments.length)
            return this._dimensions;
        this._dimensions = dimensions;
        return this;
    }

    colors(colors) {
        if (!arguments.length)
            return this._colors;
        this._colors = colors;
        return this;
    }

    clickCircle(el, data) {
        if (data.selected) {
            data.dimension.filterAll();
            d3.select(el).classed("selected", false);
            d3.select(el).classed("deselected", true);
        }
        else {
            data.dimension.filterExact(1);
            d3.select(el).classed("deselected", false);
            d3.select(el).classed("selected", true);
        }
        data.selected = !data.selected;

        this.redrawGroup();
    }

    prepareNodes() {
        if (this._nodes == null) {
            this._nodes = this._dimensions.map(d => ({
                dimension: d.dimension,
                group: d.dimension.group(),
                selected: Boolean(d.dimension.currentFilter()),
                x: this._width / 2,
                y: this._height / 2,
                label: d.label
            }))
        }

        this._nodes.forEach(node => {
            node.selected = Boolean(node.dimension.currentFilter())
            node.count = node.group.all()[0].value
            node.radius = node.group.all()[0].value
        })

        return this._nodes;
    }

    setDefaultState() {
        let counter = 0;


        this._elements.each(function(d) {
            if (d.selected) {
                d3.select(this).classed("selected", true)
                d3.select(this).classed("deselected", false)
                counter++;
            }
            else {
                d3.select(this).classed("selected", false)
                d3.select(this).classed("deselected", true)
            }
        })

        if (counter == 0) {
            this._elements.classed("selected", false)
            this._elements.classed("deselected", false)
        }
    }

    render() {
        const self = this;
        this._chartRoot = this._root.selectAll('.overview-chart__chart')

        let svg = this._chartRoot.selectAll('svg')
            .data([0])
            .join('svg')
            .attr('width', this._width)
            .attr('height', this._height)

        this._nodes = this.prepareNodes();

        this._elements = svg.selectAll('g.circle')
            .data(this._nodes)
            .join('g')
            .attr('class', 'circle')

        this._tip = d3.tip().attr('class', 'tooltip').html(function(d) { console.log(d);return `${d.count}<br>${d.label}`});
        svg.call(this._tip);

        this._circles = this._elements
            .append('circle')
                .on("mouseover", function(ev, d) {
                    self._tip.show(d, this);
                })
                .on("mouseout", function(ev, d) {
                    self._tip.hide(d, this);
                })

        this._elements
            .on("click", function(ev, d) {
                self.clickCircle(this, d);
            })

        this._text = this._elements
            .append('text')
            .text(function(d) {
                if (d.radius >= self._minRadiusLabel)
                    return d.count
                return "";
            })

        this.redraw();
    }

    getRadiusScale() {
        const minCount = d3.min(this._nodes.map(el => el.count))
        const maxCount = d3.max(this._nodes.map(el => el.count))
        const maxIndex = d3.maxIndex(this._nodes, el => el.count);
        const radiusScale = d3.scaleSqrt()
            .domain([minCount, maxCount])
            // .domain([0, this._total])
            .range([this._minRadius, this._maxRadius])

        return radiusScale;
    }

    setLargestText(text) {
        this._root.select('.overview-chart__largest_name').text(text);
    }

    redraw() {
        const self = this;
        this._nodes = this.prepareNodes();

        const maxIndex = d3.maxIndex(this._nodes, el => el.count);
        const maxNode = this._nodes[maxIndex];
        this._radiusScale = this.getRadiusScale();


        this._circles.each(function(d) {
            if (d == maxNode)
                d3.select(this).classed("largest", true)
            else
                d3.select(this).classed("largest", false)

        })

        this.setDefaultState();

        this.setLargestText(maxNode.label);

        this._text.text(function(d){
            const radius = self._radiusScale(d.count);
            if (radius >= self._minRadiusLabel)
                return d.count
            return "";
        })

        if (this._simulation)
            this._simulation.stop();

        this._simulation = d3
            .forceSimulation(self._nodes)
            .force('charge', d3.forceManyBody().strength(2))
            .force('x', d3.forceX(this._width / 2))
            .force('y', d3.forceY(this._height / 2))
            .force("collide", d3.forceCollide().radius(d => {
                return self._radiusScale(d.count) * 1.1
            }))
            .on('tick', () => {
                this._elements.transition()
                    .duration(this._duration)
                    .attr("transform", d => {
                        return `translate(${d.x}, ${d.y})`
                    })
                    .select("circle")
                        .attr("r", d => self._radiusScale(d.count))
            })
    }
}