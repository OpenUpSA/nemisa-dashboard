import { Section } from './base';

export class SectionAccess extends Section {
  constructor(block, title, widgetFactories) {
    super(block, title, widgetFactories);
    this.addWidgets();
  }

  addWidgets() {
    const noYesOptions = [
      { key: 'no', label: 'No' },
      { key: 'yes', label: 'Yes' },
    ];

    const internetAccessLocationOptions = [
      { key: 'school', label: 'School/Campus' },
      { key: 'work', label: 'Work' },
      { key: 'community_centre', label: 'Community Centre' },
      { key: 'library', label: 'Library' },
      { key: 'public_spaces', label: 'Public spaces e.g. restaurant' },
      { key: 'other', label: 'Other' },
      { key: 'na', label: 'Not Applicable' },
    ];

    this.widgets = [
      { key: 'access_home', widget: this.widgetFactories.select.newElement('Do you have access to the internet at home?', noYesOptions) },
      { key: 'access_free', widget: this.widgetFactories.select.newElement('Do you have access to free internet?', noYesOptions) },
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
