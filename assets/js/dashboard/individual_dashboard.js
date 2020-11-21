import 'babel-polyfill';
import * as dc from 'dc';
import crossfilter from 'crossfilter2';

import d3 from '../d3';
import {skillsExternalTraining} from '../strings';

import {WidgetContainer} from './widgets';
import {FilteredCount} from './filtered_count';
import {ScreenElements} from './screen_elements';
import {Filter} from './filter';
import {GenderPie} from './gender';
import {AgeChart} from './age';
import {IndustryChart} from './industry';
import {FilterBar} from './filter_bar';
import {FilterSelect} from './filter_select';

export default function individualDashboard($container, data) {

    data = data.map(d => d.data);

    const dataFilter = new Filter(data);

    const widgetContainer = new WidgetContainer();
    const filteredCount = new FilteredCount($container.find('.chart-filters__filtered_inner')[0], dataFilter);
    const screenElements = new ScreenElements(dataFilter);

    const selectGender = new FilterSelect($container.find('.filter--1 .dropdown-list__inner')[0], 'gender', dataFilter)
    const selectAge = new FilterSelect($container.find('.filter--2 .dropdown-list__inner')[0], 'age', dataFilter)
    const selectLocation = new FilterSelect($container.find('.filter--3 .dropdown-list__inner')[0], 'location', dataFilter)
    // const selectAreaType = new FilterSelect($container.find('.filter--4 .dropdown-list__inner')[0], 'areaType', dataFilter)
    const selectEducationLevel = new FilterSelect($container.find('.filter--5 .dropdown-list__inner')[0], 'educationLevel', dataFilter)
    // const selectEmploymentStatus = new FilterSelect($container.find('.filter--6 .dropdown-list__inner')[0], 'employmentStatus', dataFilter)

    const chartIndustry = new IndustryChart(dataFilter, $('#w-node-b1681b5d0ac6-ee3cca63 .chart-embed')[0])

    const filterBarContainer = $('.chart-filters__inner')[1];
    $(filterBarContainer).show()
    const filterBar = new FilterBar(filterBarContainer, dataFilter);

    dc.renderAll();
}
