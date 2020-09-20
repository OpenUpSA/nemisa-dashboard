import {d3} from '../d3';
import {widget_factories} from './widgets/widget_factories'
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

        const sectionGeneral = new sections.general(newSection(), "General Information", widgets);
        const sectionDigitalDeployment = new sections.digital_deployment(newSection(), "Digital Technology Deployment", widgets);
        const sectionDigitalUsed = new sections.base(newSection(), "Digital Technology Used", widgets);
        const sectionDigitalFuture = new sections.base(newSection(), "Future Digital Technologies Needed", widgets);
        const sectionDigitalSkills = new sections.base(newSection(), "Digital Skills Supply", widgets);
        const sectionDigitalSupport = new sections.base(newSection(), "Digital Skills Support", widgets);
        const sectionRisk = new sections.base(newSection(), "Risks", widgets);
        const sectionAttitude = new sections.base(newSection(), "Attitude", widgets);
        const sectionDemographics = new sections.base(newSection(), "Demographics", widgets);

        elements.remove();
        d3.selectAll('.survey__wrap > .block').remove();

        this.elSurvey.appendChild(sectionGeneral.block);
        this.elSurvey.appendChild(sectionDigitalDeployment.block);
        this.elSurvey.appendChild(sectionDigitalUsed.block);
        this.elSurvey.appendChild(sectionDigitalFuture.block);
        this.elSurvey.appendChild(sectionDigitalSkills.block);
        this.elSurvey.appendChild(sectionDigitalSupport.block);
        this.elSurvey.appendChild(sectionRisk.block);
        this.elSurvey.appendChild(sectionAttitude.block);
        this.elSurvey.appendChild(sectionDemographics.block);

    }
}



const form = new Form();
// Webflow.require('ix2').init()
