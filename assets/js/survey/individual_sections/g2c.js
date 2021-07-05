import { Section } from './base';

export class SectionG2c extends Section {
  constructor(block, title, widgetFactories) {
    super(block, title, widgetFactories);
    this.addWidgets();
  }

  addWidgets() {
    const noYesOptions = [
      { key: 'no', label: 'No' },
      { key: 'yes', label: 'Yes' },
    ];

    const servicesCompletedOptions = [
      { key: 'applied_for_service', label: 'Applied for a government service' },
      { key: 'log_query', label: 'Log a query regarding government service' },
      { key: 'pay_bill', label: 'Pay for a service e.g. Municipal Bill' },
      { key: 'other', label: 'Other' },
    ];

    const frequencyOptions = [
      { key: 'always', label: 'Always' },
      { key: 'often', label: 'Often' },
      { key: 'half', label: 'Half the time' },
      { key: 'rarely', label: 'Rarely' },
      { key: 'never', label: 'Never' },
    ];

    this.widgets = [
      { key: 'visited_gov_website', widget: this.widgetFactories.select.newElement('Have you visited any government website before?', noYesOptions) },
      { key: 'services_completed', widget: this.widgetFactories.checkboxes.newElement('Which of the following services have you completed online? (Tick those that apply)', servicesCompletedOptions) },
      { key: 'completion_success', widget: this.widgetFactories.select.newElement('How often do you successfully complete what you have tried to do on a government website (e.g. resolve a query, apply for services)?', frequencyOptions) },
      { key: 'how_often_officials_respond', widget: this.widgetFactories.select.newElement('How often do government officials/departments that you interact with on social networking sites respond to your communication?', frequencyOptions) },
      { key: 'how_often_satisfied_with_response', widget: this.widgetFactories.select.newElement('How often have you been satisfied with the responses you received from government officials/departments?', frequencyOptions) },
      { key: 'trust_gov_website_or_apps', widget: this.widgetFactories.select.newElement('Do you trust government websites or apps?', noYesOptions) },
      { key: 'home_lang', widget: this.widgetFactories.select.newElement('Do you believe government websites/apps should be available in your home language (official languages of South Africa)?', noYesOptions) },
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
