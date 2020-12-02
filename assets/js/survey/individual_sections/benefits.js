import { Section } from './base';

export class SectionBenefits extends Section {
  constructor(block, title, widgetFactories) {
    super(block, title, widgetFactories);
    this.addWidgets();
  }

  addWidgets() {
    const benefitOptions = [
      { key: 'increase_income', label: 'Improve/increase your income' },
      { key: 'feel_included_society', label: 'Feel more included in the society' },
      { key: 'feel_included_economy', label: 'Feel more included in the economy' },
      { key: 'find_employment', label: 'Find employment' },
      { key: 'prepare_for_employment', label: 'Prepare for employmeny' },
      { key: 'increase_confidence', label: 'Increased confidence' },
      { key: 'access_information', label: 'Access to information' },
      { key: 'save_money', label: 'I save money e.g. transportation costs' },
      { key: 'other', label: 'Other' },
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
