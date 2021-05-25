import 'babel-polyfill';
import $ from 'jquery';
import * as dc from 'dc';

import { WidgetContainer } from '../widgets';
import { FilteredCount } from '../filtered_count';
import { ScreenElements } from '../screen_elements';
import { Filter } from './filter';
import { RowChart } from '../row_chart';
import { PieChart } from '../pie_chart';
import { Charts } from '../charts';

import { FilterBar } from '../filter_bar';
import { FilterSelect } from '../filter_select';

export default function individualDashboard($container, data) {
  const dataFilter = new Filter(data);

  new WidgetContainer();
  new FilteredCount($container.find('.chart-filters__filtered_inner')[0], dataFilter);
  new ScreenElements(dataFilter);

  new FilterSelect($container.find('.filter--1 .dropdown-list__inner')[0], 'gender', dataFilter);
  new FilterSelect($container.find('.filter--2 .dropdown-list__inner')[0], 'age', dataFilter);
  new FilterSelect($container.find('.filter--3 .dropdown-list__inner')[0], 'province', dataFilter);
  new FilterSelect($container.find('.filter--4 .dropdown-list__inner')[0], 'areaType', dataFilter);
  new FilterSelect($container.find('.filter--5 .dropdown-list__inner')[0], 'educationLevel', dataFilter);
  new FilterSelect($container.find('.filter--6 .dropdown-list__inner')[0], 'employmentStatus', dataFilter);

  const mobileDataMonthlySpendOrder = [
    'R0',
    'R1-R50',
    'R51-R100',
    'R101-R150',
    'R151-R200',
    '>R200',
  ];
  const charts = [
    {
      Class: RowChart,
      dimensionName: 'mobileDataMonthlySpend',
      sortOrder: mobileDataMonthlySpendOrder,
      icon: 'mobile-alt',
    },
    {
      Class: PieChart,
      dimensionName: 'participateFutureConsent',
      icon: 'clipboard-check',
    },
    {
      Class: PieChart,
      dimensionName: 'accessHome',
      icon: 'home',
    },
    {
      Class: PieChart,
      dimensionName: 'accessFree',
      icon: 'wifi',
    },
    {
      Class: RowChart,
      dimensionName: 'accessLocation',
      icon: 'glasses',
    },
    {
      Class: RowChart,
      dimensionName: 'internetUsage',
      icon: 'chart-bar',
    },
    {
      Class: RowChart,
      dimensionName: 'benefits',
      icon: 'glasses',
    },
    {
      Class: PieChart,
      dimensionName: 'visitedGovWebsite',
      icon: 'glasses',
    },
    {
      Class: RowChart,
      dimensionName: 'servicesCompleted',
      icon: 'glasses',
    },
    {
      Class: RowChart,
      dimensionName: 'completionSuccess',
      icon: 'glasses',
    },
    {
      Class: RowChart,
      dimensionName: 'howOftenOfficialsRespond',
      icon: 'comments',
    },
    {
      Class: PieChart,
      dimensionName: 'trustGovWebApp',
      icon: 'glasses',
    },
    {
      Class: PieChart,
      dimensionName: 'homeLang',
      icon: 'glasses',
    },
  ];

  new Charts($container.find('.demographics-wrapper'), dataFilter, charts);

  const filterBarContainer = $container.find('.chart-filters__wrap')[0];
  $(filterBarContainer).show();
  new FilterBar(filterBarContainer, dataFilter);

  dc.renderAll();
}
