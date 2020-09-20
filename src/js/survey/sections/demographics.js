import {d3} from '../../d3';
import {Section} from './base';

export class SectionDemographics extends Section {
    constructor(block, title, widgets) {
        super(block, title, widgets);
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

        this.appendChild(this.widgets.select.newElement('Gender', gender_options).container);
        this.appendChild(this.widgets.textbox.newElement('Year of birth'));
        this.appendChild(this.widgets.select.newElement('What is your highest education level?', edu_options).container);
        this.appendChild(this.widgets.select.newElement('Which racial group do you belong to?', race_options).container);
        this.appendChild(this.widgets.textbox.newElement('Which city or town do you live in?'));
    }

}