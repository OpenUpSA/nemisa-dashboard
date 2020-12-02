import { Section } from './base';

export class SectionAwareness extends Section {
  constructor(block, title, widgetFactories) {
    super(block, title, widgetFactories);
    this.addWidgets();
  }

  addWidgets() {
    const internetUsageOptions = [
      { key: 'entertainment', label: 'Entertainment' },
      { key: 'search_jobs', label: 'Search for jobs' },
      { key: 'search_information', label: 'Search for information' },
      { key: 'search_business_op', label: 'Search for business opportunities' },
      { key: 'training', label: 'To complete online training/courses' },
      { key: 'keep_in_touch', label: 'To keep in touch with others' },
      { key: 'banking', label: 'Online banking' },
      { key: 'shopping', label: 'Online shopping' },
      { key: 'paying_bills', label: 'Paying bills' },
      { key: 'other', label: 'Other' },
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
