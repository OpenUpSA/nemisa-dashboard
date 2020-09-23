import d3 from '../d3';
import {widget_factories} from './widgets/factories'
import {sections} from './sections/sections'
// import fetch from 'fetch'
import fetch from 'isomorphic-fetch'
import regeneratorRuntime from "regenerator-runtime";

class Form {
    constructor() {
        this.prepareDOM();
    }

    prepareDOM() {
        d3.select('.w-iframe').remove();
        this.elSurvey = d3.select('.survey__wrap').node();
        this.tmplSection = d3.select('.survey__wrap > .block').node().cloneNode(true);
        d3.select(this.tmplSection).selectAll(".survey-block").remove();

        const widgets = this.createWidgetFactories()
        d3.selectAll('.survey__wrap > .block').remove();

        this.formSections = this.createFormSections(this.elSurvey, widgets);
        this.addButton();
    }

    addButton() {
        const self = this;
        d3.select('.survey__wrap').append('button').text('Submit form').on('click', function() {
            console.log(self.submitSurvey());
        })
    }

    getResult() {
        const result = {}
        this.formSections.forEach(el => {
            result[el.label] = el.section.getResult()
        })

        return result;
    }

    createWidgetFactories() {
        const elements = d3.selectAll('.survey__wrap > .block .survey-block');
        const widgetNodes = elements.nodes();

        const widgets = {
            textbox: new widget_factories.textbox(widgetNodes[0].cloneNode(true)),
            select: new widget_factories.select(widgetNodes[1].cloneNode(true)),
            multiradio: new widget_factories.multiradio(widgetNodes[2].cloneNode(true)),
            checkboxes: new widget_factories.checkboxes(widgetNodes[3].cloneNode(true)),
        }

        elements.remove();

        return widgets;
    }

    createFormSections(container, widgets) {
        const newSection = () => this.tmplSection.cloneNode(true);

        this.formSections = [
            {label: "general", section: new sections.general(newSection(), "General Information", widgets)},
            {label: "digitalDeployment", section: new sections.digital_deployment(newSection(), "Digital Technology Deployment", widgets)},
            {label: "digitalUsed", section: new sections.technology_used(newSection(), "Digital Technology Used", widgets)},
            {label: "digitalFuture", section: new sections.future_technologies(newSection(), "Future Digital Technologies Needed", widgets)},
            {label: "digitalSkills", section: new sections.skills_supply(newSection(), "Digital Skills Supply", widgets)},
            {label: "digitalSupport", section: new sections.skills_support(newSection(), "Digital Skills Support", widgets)},
            {label: "risk", section: new sections.perceived_risk(newSection(), "Risks", widgets)},
            {label: "attitude", section: new sections.attitudes(newSection(), "Attitude", widgets)},
            {label: "demographics", section: new sections.demographics(newSection(), "Demographics", widgets)}
        ]

        this.formSections.forEach(section => {
            container.appendChild(section.section.block);
        })


        return this.formSections;

    }

    async submitSurvey() {
        let data = {data: this.getResult()};
        data = flattenObject(data)
        data = {data: data}
        let response = await fetch('/api/responses/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        let result = await response.json();
        window.location.replace('/dashboard/');
    }
}

function flattenObject(ob) {
    var toReturn = {};

    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;

        if ((typeof ob[i]) == 'object' && ob[i] !== null) {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[x] = flatObject[x];
                // toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}



const form = new Form();
