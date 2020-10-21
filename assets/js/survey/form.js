import d3 from '../d3';
import {widget_factories} from './widgets/factories'
import {sections} from './sections/sections'
// import fetch from 'fetch'
import fetch from 'isomorphic-fetch'
import regeneratorRuntime from "regenerator-runtime";
import {FormNav} from './form_nav';

class Form {
    constructor() {
        this.prepareDOM();
    }


    prepareDOM() {
        // d3.select('.w-iframe').remove();
        this.elSurvey = d3.select('.survey__wrap');
        this.tmplSection = d3.select('.survey__wrap > .block').node().cloneNode(true);
        this.warningContainer = this.elSurvey.select('.form-warning');
        this.tmplSection.appendChild(this.warningContainer.node());
        d3.select(this.tmplSection).selectAll(".survey-block").remove();

        const widgets = this.createWidgetFactories()
        d3.selectAll('.survey__wrap > .block').remove();

        this.formSections = this.createFormSections(widgets);
        this.formNav = new FormNav(this.formSections.length)
        this.formNav.addListener(this);

        this.renderForm(0);
    }

    onBack(page) {
        this.renderForm(page)
    }


    onForward(page) {
        this.renderForm(page)
    }

    renderForm(page) {
        const sections = this.formSections[page];
        this.elSurvey.selectAll('.block').remove()
        this.elSurvey.select('button').remove();

        sections.forEach(section => {
            this.elSurvey.node().appendChild(section.section.node);
        })

        this.addButton();
    }

    addButton() {
        const self = this;
        d3.select('.survey__wrap').append('button').text('Submit form').on('click', function() {
            self.submitSurvey();
        })
    }


    getResult() {
        const result = {}
        this.formSections.forEach(section => {
            section.forEach(subsection => {
                result[subsection.label] = subsection.section.getResult()
            })
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

    createFormSections(widgets) {
        const newSection = () => this.tmplSection.cloneNode(true);

        const formSections = [
            [
                {label: "general", section: new sections.general(newSection(), "General Information", widgets)},
                {label: "digitalDeployment", section: new sections.digital_deployment(newSection(), "Digital Technology Deployment", widgets)},
            ],
            [{label: "digitalUsed", section: new sections.technology_used(newSection(), "Digital Technology Used", widgets)}],
            [{label: "digitalFuture", section: new sections.future_technologies(newSection(), "Future Digital Technologies Needed", widgets)}],
            [{label: "digitalSkills", section: new sections.skills_supply(newSection(), "Digital Skills Supply", widgets)}],
            [{label: "digitalSupport", section: new sections.skills_support(newSection(), "Digital Skills Support", widgets)}],
            [{label: "risk", section: new sections.perceived_risk(newSection(), "Risks", widgets)}],
            [{label: "attitude", section: new sections.attitudes(newSection(), "Attitude", widgets)}],
            [{label: "demographics", section: new sections.demographics(newSection(), "Demographics", widgets)}]
        ]
        return formSections;

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
