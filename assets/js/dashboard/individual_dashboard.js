import 'babel-polyfill';
import $ from 'jquery';
import * as dc from 'dc';

import { WidgetContainer } from './widgets';
import { FilteredCount } from './filtered_count';
import { ScreenElements } from './screen_elements';
import { Filter } from './filter';
import { IndustryChart } from './industry';
import { FilterBar } from './filter_bar';
import { FilterSelect } from './filter_select';

export default function individualDashboard($container, data) {
  const dataFilter = new Filter(data);

  new WidgetContainer();
  new FilteredCount($container.find('.chart-filters__filtered_inner')[0], dataFilter);
  new ScreenElements(dataFilter);

  new FilterSelect($container.find('.filter--1 .dropdown-list__inner')[0], 'gender', dataFilter);
  new FilterSelect($container.find('.filter--2 .dropdown-list__inner')[0], 'age', dataFilter);
  new FilterSelect($container.find('.filter--3 .dropdown-list__inner')[0], 'location', dataFilter);
  // new FilterSelect($container.find('.filter--4 .dropdown-list__inner')[0], 'areaType', dataFilter);
  new FilterSelect($container.find('.filter--5 .dropdown-list__inner')[0], 'educationLevel', dataFilter);
  // new FilterSelect($container.find('.filter--6 .dropdown-list__inner')[0], 'employmentStatus', dataFilter);

  new IndustryChart(dataFilter, $('#w-node-b1681b5d0ac6-ee3cca63 .chart-embed')[0]);

  const filterBarContainer = $('.chart-filters__inner')[1];
  $(filterBarContainer).show();
  new FilterBar(filterBarContainer, dataFilter);

  dc.renderAll();
}
