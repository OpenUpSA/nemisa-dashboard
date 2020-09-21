import {d3} from '../../d3';
import {TextWidgetFactory} from './textbox';
import {SelectWidgetFactory} from './selectbox';
import {MultiRadioWidgetFactory} from './multiradio';
import {CheckboxesWidgetFactory} from './checkboxes';

export const widget_factories = {
    textbox: TextWidgetFactory,
    select: SelectWidgetFactory,
    multiradio: MultiRadioWidgetFactory,
    checkboxes: CheckboxesWidgetFactory,
}