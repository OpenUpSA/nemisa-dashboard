import {d3} from '../../d3';
import {Section} from './base';

export class SectionDemographics extends Section {
    constructor(block, title, widgets) {
        super(block, title, widgets);
        this.addWidgets();
    }

    addWidgets() {
        const gender_options = [
            ['_gender_female', 'Female'],
            ['_gender_male', 'Male'],
            ['_gender_na', 'Prefer not to say'],
        ]

        const edu_options = [
            ['_edu_none', 'None'],
            ['_edu_primary', 'Primary School'],
            ['_edu_high', 'High School'],
            ['_edu_diploma', 'Diploma'],
            ['_edu_degree', 'Degree'],
            ['_edu_postgrad', 'Postgraduate (Honors, Masters, Doctorate)'],
        ]

        const race_options = [
            ['_race_african', 'Black'],
            ['_race_coloured', 'Coloured'],
            ['_race_indian', 'Indian'],
            ['_race_white', 'White'],
            ['_race_na', 'Prefer not to say'],
        ]

        this.appendChild(this.widgets.select.newElement('Gender', gender_options));
        this.appendChild(this.widgets.textbox.newElement('Year of birth'));
        this.appendChild(this.widgets.select.newElement('What is your highest education level?', edu_options));
        this.appendChild(this.widgets.select.newElement('Which racial group do you belong to?', race_options));
        this.appendChild(this.widgets.textbox.newElement('Which city or town do you live in?'));
    }

}