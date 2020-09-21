import {d3} from '../../d3';
import {Section} from './base';

export class SectionDemographics extends Section {
    constructor(block, title, widgetFactories) {
        super(block, title, widgetFactories);
        this.addWidgets();
    }

    addWidgets() {
        const gender_options = [
            {key: '_gender_female', label: 'Female'},
            {key: '_gender_male', label: 'Male'},
            {key: '_gender_na', label: 'Prefer not to say'},
        ]

        const edu_options = [
            {key: '_edu_none', label: 'None'},
            {key: '_edu_primary', label: 'Primary School'},
            {key: '_edu_high', label: 'High School'},
            {key: '_edu_diploma', label: 'Diploma'},
            {key: '_edu_degree', label: 'Degree'},
            {key: '_edu_postgrad', label: 'Postgraduate (Honors, Masters, Doctorate)'},
        ]

        const race_options = [
            {key: '_race_african', label: 'Black'},
            {key: '_race_coloured', label: 'Coloured'},
            {key: '_race_indian', label: 'Indian'},
            {key: '_race_white', label: 'White'},
            {key: '_race_na', label: 'Prefer not to say'},
        ]

        this.widgets = [
            {key: 'Gender', widget: this.widgetFactories.select.newElement('Gender', gender_options)},
            {key: 'Year of Birth', widget: this.widgetFactories.textbox.newElement('Year of birth')},
            {key: 'education_level', widget: this.widgetFactories.select.newElement('What is your highest education level?', edu_options)},
            {key: 'Race', widget: this.widgetFactories.select.newElement('Which racial group do you belong to?', race_options)},
            {key: 'live_city', widget: this.widgetFactories.textbox.newElement('Which city or town do you live in?')}
        ]

        this.widgets.forEach(el => {
            this.appendChild(el.widget.container);
        })
    }

    getResult() {
        const js = {}
        this.widgets.forEach(el => {
            js[el.key] = el.widget.getResult();
        })

        return js
    }

}