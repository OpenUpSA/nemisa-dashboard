
import 'babel-polyfill';
import * as dc from 'dc';
import crossfilter from 'crossfilter2';

import {d3} from './d3';
import data from '/data/data.json';
import {WidgetContainer} from './widgets';
import {FilteredCount} from './filtered_count';
import {skillsExternalTraining} from './strings';
import {ScreenElements} from './screen_elements';
import {CustomBubbleChart} from './custom_bubble_chart';
import {Filter} from './filter';
import {GenderPie} from './gender';
import {AgeChart} from './age';
import {IndustryChart} from './industry';
import {FilterBar} from './filter_bar';

const dataFilter = new Filter(data);
const widgetContainer = new WidgetContainer();
const filteredCount = new FilteredCount(dataFilter);
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
const c3 = d3;
const chartGender = new GenderPie(dataFilter, $('.demographics__grid .block .results-card__chart .chart-embed')[2])
const chartAge = new AgeChart(dataFilter, $('.demographics__grid .block .results-card__chart .chart-embed')[1])
// const chartIndustry = new IndustryChart(dataFilter, $('.demographics__grid .block .results-card__chart .chart-embed')[0])
const filterBar = new FilterBar($('.chart-filters__inner')[0], dataFilter);

bubbleUsedSkills.dimensions(dimSkills);
bubbleLearntSkills.dimensions(dimLearntSkills);
bubbleFutureTech.dimensions(dimFutureTech);
bubblePerceivedRisks.dimensions(dimPerceivedRisk);
bubbleAttitudes.dimensions(dimAttitudes);
bubbleCurrentTech.dimensions(dimCurrentTech);

dc.renderAll();

// bubbleUsedSkills
//     .groupAll(groupAllSpeed)
//     .colors(d3)



// widgetContainer.addWidget(filteredCount);

// console.log(data)
// const widgets = [filteredCount];

// var filtering = results.dimension(function(d) { return d[skillsExternalTraining]; });
// console.log(filtering.filter("Agree222").reduceCount())
// // console.log(filtering.filter("Agree").group().reduceCount().size());
// // console.log(results.groupAll().reduceCount().value());