import { Section } from './base';

export class SectionBenefits extends Section {
  constructor(block, title, widgetFactories) {
    super(block, title, widgetFactories);
    this.addWidgets();
  }

  addWidgets() {
    const benefitOptions = [
      { key: '_benefit_income', label: 'Improve/increase your income' },
      { key: '_benefit_included_society', label: 'Feel more included in the society' },
      { key: '_benefit_included_economy', label: 'Feel more included in the economy' },
      { key: '_benefit_employment_find', label: 'Find employment' },
      { key: '_benefit_employment_prepare', label: 'Prepare for employmeny' },
      { key: '_benefit_increase_confidence', label: 'Increased confidence' },
      { key: '_benefit_access_information', label: 'Access to information' },
      { key: '_benefit_save_money', label: 'I save money e.g. transportation costs' },
      { key: '_benefit_other', label: 'Other' },
    ];

    this.widgets = [
      { key: 'benefits', widget: this.widgetFactories.checkboxes.newElement('What benefits do you derive from using computers / mobile phones? (Tick all that apply)', benefitOptions) },
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
