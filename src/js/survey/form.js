import {d3} from '../d3';
import {widget_factories} from './widgets/factories'
import {sections} from './sections/sections'

class Form {
    constructor() {
        this.prepareDOM();
    }

    prepareDOM() {
        this.elSurvey = d3.select('.survey__wrap').node();
        this.tmplSection = d3.select('.survey__wrap > .block').node().cloneNode(true);
        d3.select(this.tmplSection).selectAll(".survey-block").remove();

        const elements = d3.selectAll('.survey__wrap > .block .survey-block');

        const widgets = {
            textbox: new widget_factories.textbox(elements.nodes()[0].cloneNode(true)),
            select: new widget_factories.select(elements.nodes()[1].cloneNode(true)),
            multiradio: new widget_factories.multiradio(elements.nodes()[2].cloneNode(true)),
            checkboxes: new widget_factories.checkboxes(elements.nodes()[3].cloneNode(true)),
        }

        const newSection = () => this.tmplSection.cloneNode(true);

        const formSections = [
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

        elements.remove();
        d3.selectAll('.survey__wrap > .block').remove();

        formSections.forEach(section => {
            this.elSurvey.appendChild(section.section.block);
        })

        const result = {}
        formSections.forEach(el => {
            result[el.label] = el.section.getResult()
        })

        console.log(result);

        // this.elSurvey.appendChild(sectionGeneral.block);
        // this.elSurvey.appendChild(sectionDigitalDeployment.block);
        // this.elSurvey.appendChild(sectionDigitalUsed.block);
        // this.elSurvey.appendChild(sectionDigitalFuture.block);
        // this.elSurvey.appendChild(sectionDigitalSkills.block);
        // this.elSurvey.appendChild(sectionDigitalSupport.block);
        // this.elSurvey.appendChild(sectionRisk.block);
        // this.elSurvey.appendChild(sectionAttitude.block);
        // this.elSurvey.appendChild(sectionDemographics.block);

    }
}



const form = new Form();
// Webflow.require('ix2').init()
