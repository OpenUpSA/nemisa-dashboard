import {select as d3Select} from 'd3-selection';
import {scaleLinear as d3ScaleLinear, scaleSqrt as d3ScaleSqrt, scaleOrdinal as d3ScaleOrdinal} from 'd3-scale';
import {BubbleChart as dcBubbleChart}  from 'dc';
import {
    forceSimulation as d3ForceSimulation,
    forceCenter as d3ForceCenter,
    forceManyBody as d3ForceManyBody,
    forceCollide as d3ForceCollide,
    forceX as d3ForceX,
    forceY as d3ForceY,
} from 'd3-force';
import {max as d3Max, min as d3Min} from 'd3-array';

export class BubbleChart {
    constructor(dimension, container) {
        this.dimension = dimension;
        this.group = dimension.group();
        this.container = container;
        this.circles = [];
        this.chart = null;
        this.width = 200, this.height = 150;
        this.colors = {
            main: {
                regular: "#EE7B30",
                hover: "#FE7B30",
                selected: "blue"
            },
            grey: {
                regular: "#9F9F9F",
                hover: "#8F9F9F",
                selected: "blue"
            }
        }
        this.draw();
    }

    calcRadius(area) {
        // Area = πr²
        // r = sqrt(Area / π)
        return Math.sqrt(area / Math.PI);
    }

    // calcRandomPosition(bounds) {
    //     const x = Math.random() * (bounds.x.max - bounds.x.min) + bounds.x.min;
    //     const y = Math.random() * (bounds.y.max - bounds.y.min) + bounds.y.min;
    //     return {
    //         x: x, y: y
    //     }
    // }

    // drawD3() {
    //     const self = this;
    //     const data = this.prepareData();
    //     const findNode = label => {
    //         const nodes = data.filter(n => {
    //             return n.name == label 
    //         })

    //         return nodes[0];
    //     }

    // }

    draw() {
        const s = d3ScaleOrdinal(["hello", "world"])
        const self = this;
        const data = this.prepareData();
        const findNode = label => {
            const nodes = data.filter(n => {
                return n.name == label 
            })

            return nodes[0];
        }

        const max = d3Max(data.map(el => el.value));
        const min = d3Min(data.map(el => el.value));
        const maxRadius = this.calcRadius(max);
        const minRadius = this.calcRadius(min);
        const radiusScale = d3ScaleSqrt()
            .domain([minRadius, maxRadius])
            .range([5, 20])


        this.chart = new dcBubbleChart(this.container);
        this.chart
            .width(this.width + 2 * maxRadius)
            .height(this.height + 2 * maxRadius)
            // .margins({top: 10, right: 10, bottom: 10, left: 10})
            .dimension(this.dimension)
            .group(this.group)
            .keyAccessor(p => {
                const node = findNode(p.key);
                return node.x;
            })
            .valueAccessor(p => {
                const node = findNode(p.key);
                return node.y;
            })
            .radiusValueAccessor(p => {
                const node = findNode(p.key);
                return node.radius;
            })
            .colorAccessor((p, i) => {
                if (p.value == max)
                    return 0
                return 1;
            })
            .label(p => {
                return p.value;
            })
            .x(d3ScaleLinear().domain([-maxRadius, this.width + maxRadius]))
            .y(d3ScaleLinear().domain([-maxRadius, this.height + maxRadius]))
            .r(d3ScaleLinear().domain([minRadius, maxRadius * 2]))
            .minRadiusWithLabel(12)
            .yAxisPadding(0)
            .xAxisPadding(0)
            .title(el => el.value)
            .renderTitle(true)
            .renderLabel(true)
            .on('renderlet', function(chart) {
                function getColor(d, hover) {
                    const node = findNode(d.key);
                    let colors = self.colors["grey"];
                    if (node.main)
                        colors = self.colors["main"]

                    if (d.selected)
                        return colors.selected
                    else if (hover)
                        return colors.hover;
                    else
                        return colors.regular;
                }

                function fillCircle(node, color) {
                    d3Select(node).select("circle").style('fill', color);
                }

                chart.selectAll('.node')
                    .on('mouseover', function(d) {
                        const color = getColor(d, true);
                        fillCircle(this, color);
                    })
                    .on('mouseout', function(d) {
                        const color = getColor(d, false);
                        fillCircle(this, color);
                    })
                    .on("click", function(d) {
                        d.selected = !d.selected;
                        const color = getColor(d, false);
                        fillCircle(this, color);
                    })
            })
            .colors(el => {
                return [self.colors.main.regular, self.colors.grey.regular][el % 2]

            })

        this.chart.render();
        this.hideAxis();
        this.hidePlaceholder();

        $('text', this.container).css('font-size', '10px');
        $('text', this.container).css('fill', 'white');
    }

    hideAxis() {
        $('.axis', this.container).css('display', 'none');
    }

    hidePlaceholder() {
        $('.block-inner img'  , this.container).css('display', 'none');
    }

    prepareData() {
        const self = this;
        const nodes = this.group.all().map(el => {
            return ({
                name: el.key,
                radius: self.calcRadius(el.value),
                value: el.value
            })
        })

        const maxRadius = d3Max(nodes.map(el => el.value));
        const minRadius = d3Min(nodes.map(el => el.value));

        nodes.forEach(el => {
            if (el.value == maxRadius)
                el.main = true;
            else
                el.main = false;
        })

        const radiusScale = d3ScaleSqrt()
            .domain([minRadius, maxRadius])
            .range([5, 20])

        const simulation = d3ForceSimulation()
            .force('center', d3ForceCenter().x(this.width / 2).y(this.height / 2).strength(0.1))
            // .force("x", d3ForceX(this.width).strength(0.1))
            // .force("y", d3ForceY(this.height / 2).strength(0.1))
            .force('charge', d3ForceManyBody().strength(-2))
            // .force('collide', d3ForceCollide(el => el.value))
            .force("collide", d3ForceCollide(d => { return radiusScale(d.value)}))

        simulation.stop();
        simulation.nodes(nodes).tick(100);
        // console.log(simulation.nodes())

        return simulation.nodes();
    }
}