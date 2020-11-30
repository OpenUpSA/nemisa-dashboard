import { Section } from './base';

export class SectionG2c extends Section {
  constructor(block, title, widgetFactories) {
    super(block, title, widgetFactories);
    this.addWidgets();
  }

  addWidgets() {
    const visitedWebsiteOptions = [
      { key: '_visited_no', label: 'No' },
      { key: '_visited_yes', label: 'Yes' },
    ];

    const servicesCompletedOptions = [
      { key: '_services_applied', label: 'Applied for a government service' },
      { key: '_services_log_query', label: 'Log a query regarding government service' },
      { key: '_services_pay', label: 'Pay for a service e.g. Municipal Bill' },
      { key: '_services_other', label: 'Other' },
    ];

    const completeSuccessOptions = [
      { key: '_complete_success_always', label: 'Always' },
      { key: '_complete_success_often', label: 'Often' },
      { key: '_complete_success_half', label: 'Half the time' },
      { key: '_complete_success_rarely', label: 'Rarely' },
      { key: '_complete_success_never', label: 'Never' },
    ];

    const oftenInteractOptions = [
      { key: '_often_interact_always', label: 'Always' },
      { key: '_often_interact_often', label: 'Often' },
      { key: '_often_interact_half', label: 'Half the time' },
      { key: '_often_interact_rarely', label: 'Rarely' },
      { key: '_often_interact_never', label: 'Never' },
    ];

    const oftenSatisfiedOptions = [
      { key: '_often_satisfied_always', label: 'Always' },
      { key: '_often_satisfied_often', label: 'Often' },
      { key: '_often_satisfied_half', label: 'Half the time' },
      { key: '_often_satisfied_rarely', label: 'Rarely' },
      { key: '_often_satisfied_never', label: 'Never' },
    ];

    const trustOptions = [
      { key: '_trust_no', label: 'No' },
      { key: '_trust_yes', label: 'Yes' },
    ];

    const homeLanguageOptions = [
      { key: '_home_lang_no', label: 'No' },
      { key: '_home_lang_yes', label: 'Yes' },
    ];

    this.widgets = [
      { key: 'visited_website', widget: this.widgetFactories.select.newElement('Have you visited any government website before?', visitedWebsiteOptions) },
      { key: 'completed_service', widget: this.widgetFactories.checkboxes.newElement('Which of the following services have you completed online? (Tick those that apply)', servicesCompletedOptions) },
      { key: 'complete_success', widget: this.widgetFactories.select.newElement('How often do you successfully complete what you have tried to do on a government website (e.g. resolve a query, apply for services)?', completeSuccessOptions) },
      { key: 'often_interact', widget: this.widgetFactories.select.newElement('How often do government officials/departments that you interact with on social networking sites respond to your communication?', oftenInteractOptions) },
      { key: 'often_satisfied', widget: this.widgetFactories.select.newElement('How often have you been satisfied with the responses you received from government officials/departments?', oftenSatisfiedOptions) },
      { key: 'trust', widget: this.widgetFactories.select.newElement('Do you trust government websites or apps?', trustOptions) },
      { key: 'home_lang', widget: this.widgetFactories.select.newElement('Do you believe government websites/apps should be available in your home language (official languages of South Africa)?', homeLanguageOptions) },
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
