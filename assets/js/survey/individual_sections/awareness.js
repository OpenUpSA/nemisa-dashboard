import { Section } from './base';

export class SectionAwareness extends Section {
  constructor(block, title, widgetFactories) {
    super(block, title, widgetFactories);
    this.addWidgets();
  }

  addWidgets() {
    const internetUsageOptions = [
      { key: '_internet_usage_entertainment', label: 'Entertainment' },
      { key: '_internet_usage_search_jobs', label: 'Search for jobs' },
      { key: '_internet_usage_search_information', label: 'Search for information' },
      { key: '_internet_usage_search_business_op', label: 'Search for business opportunities' },
      { key: '_internet_usage_training', label: 'To complete online training/courses' },
      { key: '_internet_usage_social', label: 'To keep in touch with others' },
      { key: '_internet_usage_banking', label: 'Online banking' },
      { key: '_internet_usage_shopping', label: 'Online shopping' },
      { key: '_internet_usage_bills', label: 'Paying bills' },
      { key: '_internet_usage_other', label: 'Other' },
    ];

    this.widgets = [
      { key: 'internet_usage', widget: this.widgetFactories.checkboxes.newElement('What do you use the internet for? (Tick any options that apply to you)', internetUsageOptions) },
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
