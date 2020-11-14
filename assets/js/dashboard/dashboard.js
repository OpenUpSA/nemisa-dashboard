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
$('.industry-results').show();
$('.individual-results').hide();

d3.json('/api/responses/').then(function(data) {
    industryDashboard(data)
})
