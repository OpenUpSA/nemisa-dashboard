import {d3} from '../../d3';
import {TextWidgetFactory} from './widget_textbox';
import {SelectWidgetFactory} from './widget_selectbox';
import {MultiRadioWidgetFactory} from './widget_multiradio';
import {CheckboxesWidgetFactory} from './widget_checkboxes';

export const widget_factories = {
    textbox: TextWidgetFactory,
    select: SelectWidgetFactory,
    multiradio: MultiRadioWidgetFactory,
    checkboxes: CheckboxesWidgetFactory,
}