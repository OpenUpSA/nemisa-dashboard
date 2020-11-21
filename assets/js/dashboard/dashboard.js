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
import {FilterBar} from './filter_bar';

import industryDashboard from './industry_dashboard';
import individualDashboard from './individual_dashboard';

/*
TODO
Currently only the industry results is shown, need to:
1. Create an API endpoint to download data
2. Hook up the buttons so they toggle hide/show for the two results
3. Write the code for the individual results results - should be similar to the industry-results results

You'll need to figure when to download the results for both view, could do it on page load or when the user toggles.

There are a few fixes that are needed for the individual view
4. The clear button isn't working
5. The industry barchart isn't showing nicely - have a look here to see what it should look like: https://k4i.openup.org.za/dashboard/
 */

const DASHBOARDS = {
  individual: {
    selector: '.individual-results',
    fn: individualDashboard,
    path: '/api/responses/'
  },
  industry: {
    selector: '.industry-results',
    fn: industryDashboard,
    path: '/api/responses/'
  }
};

let selected;
let data = {};

Object.keys(DASHBOARDS).forEach(dashboard => {
  hide(dashboard);
  $(`#${dashboard}-results`).click(() => show(dashboard));
});

show('individual');

function show(dashboard) {
  let $container = $(DASHBOARDS[dashboard].selector)
  if (selected) hide(selected)
  $(`.${dashboard}-results`).show();
  if (!data[dashboard]){
    d3.json(DASHBOARDS[dashboard].path).then(response => {
      data[dashboard] = response;
      DASHBOARDS[dashboard].fn($container, response);
    });
  } else {
    DASHBOARDS[dashboard].fn($container, data[dashboard]);
  }

}

function hide(dashboard) {
  $(`.${dashboard}-results`).hide();
}
