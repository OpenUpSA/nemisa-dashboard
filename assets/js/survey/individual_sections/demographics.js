import { Section } from './base';

export class SectionDemographics extends Section {
  constructor(block, title, widgetFactories) {
    super(block, title, widgetFactories);
    this.addWidgets();
  }

  addWidgets() {
    const genderOptions = [
      { key: '_gender_female', label: 'Female' },
      { key: '_gender_male', label: 'Male' },
      { key: '_gender_trans', label: 'Transgender' },
      { key: '_gender_other', label: 'Other' },
    ];

    const provinceOptions = [
      { key: '_province_ec', label: 'Eastern Cape' },
      { key: '_province_fs', label: 'Free State' },
      { key: '_province_gauteng', label: 'Gauteng' },
      { key: '_province_kzn', label: 'KZN' },
      { key: '_province_limpopo', label: 'Limpopo' },
      { key: '_province_mpumalanga', label: 'Mpumalanga' },
      { key: '_province_nw', label: 'North West' },
      { key: '_province_nc', label: 'Northern Cape' },
      { key: '_province_wc', label: 'Western Cape' },
    ];

    const areaTypeOptions = [
      { key: '_area_type_urban', label: 'Urban Area' },
      { key: '_area_type_peri_urban', label: 'Peri-Urban Area' },
      { key: '_area_type_rural', label: 'Rural Area' },
    ];

    const eduOptions = [
      { key: '_edu_pre', label: 'Pre-Matric / Pre-Grade 12 / Pre-Standard 10' },
      { key: '_edu_matric', label: 'Matric / Grade 12 / Standard 10' },
      { key: '_edu_certificate', label: 'Certificate' },
      { key: '_edu_diploma', label: 'Diploma' },
      { key: '_edu_degree', label: 'Undergraduate / Bachelors / BTech Degree' },
      { key: '_edu_postgrad', label: 'Post Graduate Qualification' },
      { key: '_edu_other', label: 'Other' },
    ];

    const employmentOptions = [
      { key: '_employment_unable', label: 'Unable to work' },
      { key: '_employment_unemployed', label: 'Unemployed' },
      { key: '_employment_fulltime', label: 'Employed Full Time - Permmanent/Contract/Temp' },
      { key: '_employment_parttime', label: 'Employed Part Time - Permmanent/Contract/Temp' },
      { key: '_employment_self', label: 'Self-employed / Business owner' },
      { key: '_employment_student', label: 'Student/Scholar' },
      { key: '_employment_retired', label: 'Retired/Pensioner' },
      { key: '_employment_other', label: 'Other' },
    ];

    const mobileDataOptions = [
      { key: '_mobile_data_0', label: '0' },
      { key: '_mobile_data_1_50', label: 'R1-R50' },
      { key: '_mobile_data_51_100', label: 'R51-R100' },
      { key: '_mobile_data_101_150', label: 'R101-R150' },
      { key: '_mobile_data_151_200', label: 'R151-R200' },
      { key: '_mobile_data_200', label: '>R200' },
    ];

    const participateOptions = [
      { key: '_participate_no', label: 'No' },
      { key: '_participate_yes', label: 'Yes' },
    ];

    this.widgets = [
      { key: 'gender', widget: this.widgetFactories.select.newElement('What is your gender?', genderOptions) },
      { key: 'yob', widget: this.widgetFactories.textbox.newElement('In what year were you born?') },
      { key: 'province', widget: this.widgetFactories.select.newElement('Province of residence in South Africa?', provinceOptions) },
      { key: 'area_type', widget: this.widgetFactories.select.newElement('Which of the following would you consider to be applicable to the area where you live?', areaTypeOptions) },
      { key: 'education_level', widget: this.widgetFactories.select.newElement('Highest education', eduOptions) },
      { key: 'employment_status', widget: this.widgetFactories.select.newElement('What is your current employment status', employmentOptions) },
      { key: 'mobile_data', widget: this.widgetFactories.select.newElement('Estimate how much do you spend on mobile data per month', mobileDataOptions) },
      { key: 'participate', widget: this.widgetFactories.select.newElement('May we contact you again in future e.g. to participate in other research studies?', participateOptions) },
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
