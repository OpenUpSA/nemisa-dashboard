import { Section } from './base';

export class SectionDemographics extends Section {
  constructor(block, title, widgetFactories) {
    super(block, title, widgetFactories);
    this.addWidgets();
  }

  addWidgets() {
    const genderOptions = [
      { key: 'male', label: 'Male' },
      { key: 'female', label: 'Female' },
      { key: 'trans', label: 'Transgender' },
      { key: 'other', label: 'Other' },
    ];

    const provinceOptions = [
      { key: 'ec', label: 'Eastern Cape' },
      { key: 'fs', label: 'Free State' },
      { key: 'gauteng', label: 'Gauteng' },
      { key: 'kzn', label: 'KZN' },
      { key: 'limpopo', label: 'Limpopo' },
      { key: 'mpumalanga', label: 'Mpumalanga' },
      { key: 'nw', label: 'North West' },
      { key: 'nc', label: 'Northern Cape' },
      { key: 'wc', label: 'Western Cape' },
    ];

    const areaTypeOptions = [
      { key: 'urban', label: 'Urban Area' },
      { key: 'peri_urban', label: 'Peri-Urban Area' },
      { key: 'rural', label: 'Rural Area' },
    ];

    const eduOptions = [
      { key: 'pre_matric', label: 'Pre-Matric / Pre-Grade 12 / Pre-Standard 10' },
      { key: 'matric', label: 'Matric / Grade 12 / Standard 10' },
      { key: 'certificate', label: 'Certificate' },
      { key: 'diploma', label: 'Diploma' },
      { key: 'degree', label: 'Undergraduate / Bachelors / BTech Degree' },
      { key: 'postgrad', label: 'Post Graduate Qualification' },
      { key: 'other', label: 'Other' },
    ];

    const employmentOptions = [
      { key: 'unable', label: 'Unable to work' },
      { key: 'unemployed', label: 'Unemployed' },
      { key: 'fulltime', label: 'Employed Full Time - Permmanent/Contract/Temp' },
      { key: 'parttime', label: 'Employed Part Time - Permmanent/Contract/Temp' },
      { key: 'self', label: 'Self-employed / Business owner' },
      { key: 'student', label: 'Student/Scholar' },
      { key: 'retired', label: 'Retired/Pensioner' },
      { key: 'other', label: 'Other' },
    ];

    const mobileDataSpendOptions = [
      { key: '0', label: 'R0' },
      { key: '1-50', label: 'R1-R50' },
      { key: '51-100', label: 'R51-R100' },
      { key: '101-150', label: 'R101-R150' },
      { key: '151-200', label: 'R151-R200' },
      { key: '>200', label: '>R200' },
    ];

    const noYesOptions = [
      { key: 'no', label: 'No' },
      { key: 'yes', label: 'Yes' },
    ];

    const yearOptions = new Array(100).fill(null).map((_, i) => new Date().getFullYear() - i);

    this.widgets = [
      { key: 'gender', widget: this.widgetFactories.select.newElement('What is your gender?', genderOptions) },
      { key: 'year_of_birth', widget: this.widgetFactories.select.newElement('In what year were you born?', yearOptions) },
      { key: 'province', widget: this.widgetFactories.select.newElement('Province of residence in South Africa?', provinceOptions) },
      { key: 'area_type', widget: this.widgetFactories.select.newElement('Which of the following would you consider to be applicable to the area where you live?', areaTypeOptions) },
      { key: 'education_level', widget: this.widgetFactories.select.newElement('Highest education', eduOptions) },
      { key: 'employment_status', widget: this.widgetFactories.select.newElement('What is your current employment status', employmentOptions) },
      { key: 'mobile_data_monthly_spend', widget: this.widgetFactories.select.newElement('Estimate how much do you spend on mobile data per month', mobileDataSpendOptions) },
      { key: 'participate_future_consent', widget: this.widgetFactories.select.newElement('May we contact you again in future e.g. to participate in other research studies?', noYesOptions) },
    ];

    this.widgets.forEach((el) => {
      this.appendChild(el.widget.container);
    });
  }

  getResult() {
    const js = {};
    this.widgets.forEach((el) => {
      js[el.key] = el.widget.getResult();
    });

    return js;
  }
}
