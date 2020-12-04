export class Charts {
  constructor($grid, dataFilter, charts) {
    const $chartTemplate = $grid.find('.block').first().clone(true);
    debugger;
    $grid.empty();
    charts.forEach((chart) => {
      const $block = $chartTemplate.clone(true);
      $grid.append($block);
      new chart.Class($block[0], chart.dimensionName, dataFilter, chart.sortOrder);
    });
  }
}
