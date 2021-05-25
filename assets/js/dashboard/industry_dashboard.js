import 'babel-polyfill';
import * as dc from 'dc';
import crossfilter from 'crossfilter2';

import d3 from '../d3';
import {skillsExternalTraining} from '../strings';

import {WidgetContainer} from './widgets';
import {FilteredCount} from './filtered_count';
import {ScreenElements} from './screen_elements';
import {CustomBubbleChart} from './custom_bubble_chart';
import {Filter} from './filter';
import {GenderPie} from './gender';
import {AgeChart} from './age';
import {IndustryChart} from './industry';
import { RowChart } from './row_chart';
import {FilterBar} from './filter_bar';

// TODO: use $container as relevant below (`$container.find('some selector')`)
export default function industryDashboard($container, data) {

    const dataFilter = new Filter(data);

    const widgetContainer = new WidgetContainer();
    const filteredCount = new FilteredCount($('.chart-filters__filtered .chart-filters__filtered_inner')[1], dataFilter);
    const screenElements = new ScreenElements(dataFilter);

    const dimSkills = dataFilter.dimensions['mostUsedSkill'];
    const dimLearntSkills = dataFilter.dimensions['learntSkills'];
    const dimCurrentTech = dataFilter.dimensions['currentTech'];
    const dimFutureTech = dataFilter.dimensions['futureTech'];
    const dimPerceivedRisk = dataFilter.dimensions['perceivedRisk'];
    const dimAttitudes = dataFilter.dimensions['attitudes'];

    const bubbleUsedSkills = new CustomBubbleChart($('.summary-block')[0], dataFilter);


    const bubbleLearntSkills = new CustomBubbleChart($('.summary-block')[1], dataFilter);
    const bubbleCurrentTech = new CustomBubbleChart($('.summary-block')[2], dataFilter);
    const bubbleFutureTech = new CustomBubbleChart($('.summary-block')[3], dataFilter);
    const bubblePerceivedRisks = new CustomBubbleChart($('.summary-block')[4], dataFilter);
    const bubbleAttitudes = new CustomBubbleChart($('.summary-block')[5], dataFilter);
    const chartGender = new GenderPie(dataFilter, $('.demographics__grid .block .results-card__chart .chart-embed')[2])

    const chartAge = new AgeChart(dataFilter, $('.demographics__grid .block .results-card__chart .chart-embed')[1])
    // const chartIndustry = new IndustryChart(dataFilter, $('.demographics__grid .block .results-card__chart .chart-embed')[0])

    new RowChart($('.demographics__grid .block .results-card__chart .chart-embed')[0], 'industry', dataFilter);
    const filterBarContainer = $container.find('.chart-filters__wrap')[0];
    $(filterBarContainer).show()
    const filterBar = new FilterBar(filterBarContainer, dataFilter);

    bubbleUsedSkills.dimensions(dimSkills);
    bubbleLearntSkills.dimensions(dimLearntSkills);
    bubbleFutureTech.dimensions(dimFutureTech);
    bubblePerceivedRisks.dimensions(dimPerceivedRisk);
    bubbleAttitudes.dimensions(dimAttitudes);
    bubbleCurrentTech.dimensions(dimCurrentTech);

    dc.renderAll();
}
