import { Section } from './base';

export class SectionAccess extends Section {
  constructor(block, title, widgetFactories) {
    super(block, title, widgetFactories);
    this.addWidgets();
  }

  addWidgets() {
    const internetAccessOptions = [
      { key: '_internet_access_no', label: 'No' },
      { key: '_internet_access_yes', label: 'Yes' },
    ];

    const internetFreeAccessOptions = [
      { key: '_internet_free_access_no', label: 'No' },
      { key: '_internet_free_access_yes', label: 'Yes' },
    ];

    const internetAccessLocationOptions = [
      { key: '_internet_access_location_school', label: 'School/Campus' },
      { key: '_internet_access_location_work', label: 'Work' },
      { key: '_internet_access_location_community', label: 'Community Centre' },
      { key: '_internet_access_location_library', label: 'Library' },
      { key: '_internet_access_location_public', label: 'Public spaces e.g. restaurant' },
      { key: '_internet_access_location_other', label: 'Other' },
      { key: '_internet_access_location_na', label: 'Not Applicable' },
    ];

    this.widgets = [
      { key: 'access', widget: this.widgetFactories.select.newElement('Do you have access to the internet at home?', internetAccessOptions) },
      { key: 'free_access', widget: this.widgetFactories.select.newElement('Do you have access to free internet?', internetFreeAccessOptions) },
      { key: 'access_location', widget: this.widgetFactories.select.newElement('If you said "yes" above, then indicate where you obtain free access?', internetAccessLocationOptions) },
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
