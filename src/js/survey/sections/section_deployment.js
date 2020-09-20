import {d3} from '../../d3';
import {Section} from './section_base';

export class SectionDigitalDeployment extends Section {
    constructor(block, title, widgets) {
        super(block, title, widgets);
        this.addWidgets();
    }

    addWidgets() {
        const data = {
            questions: [
                {label: 'Accounting/financial management', key: 'activities_accounting'},
                {label: 'Make Bookings (Travel bookings, scheduling meetings, venue booking etc.)',  key: 'activities_booking'},
                {label: 'Emailing', key: 'activities_emailing'},
                {label: 'Making audio or video calls', key: 'activities_audio_video_calls'},
                {label: 'Marketing', key: 'activities_marketing'},
                {label: 'Printing and scanning', key: 'activities_printing'},
                {label: 'Designing', key: 'activities_designing'},
                {label: 'Monitoring (e.g. employees, production, security etc)', key: 'activities_monitoring'},
                {label: 'Research and development', key: 'activities_rnd'},
                {label: 'Training', key: 'activities_training'},
                {label: 'Filing', key: 'activities_filing'},
            ],
            options: ['Never', 'Rarely', 'Half the time', 'Often', 'Always', 'N/A'],
            title: 'How often do you use digital technologies to perform the following ACTIVITIES in your workplace?'
        }
        const multiradio = this.widgets.multiradio.newElement(data);
        console.log(multiradio.getResult());
        this.appendChild(multiradio.container);
    }
}