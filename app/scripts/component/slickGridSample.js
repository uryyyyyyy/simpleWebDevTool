
'use strict';

simpleWebDevTool.component.slickGrid = function(selector) {

    var columns = [
        {id: 'sel', name: '#', field: 'num', behavior: 'select', cssClass: 'cell-selection', width: 40, resizable: false, selectable: false, sortable: true},
        {id: 'title', name: 'Title', field: 'title', width: 120, minWidth: 120, cssClass: 'cell-title'},
        {id: 'duration', name: 'Duration', field: 'duration'},
        {id: '%', name: '% Complete', field: 'percentComplete', width: 80, resizable: false, formatter: Slick.Formatters.PercentCompleteBar},
        {id: 'start', name: 'Start', field: 'start', minWidth: 60},
        {id: 'finish', name: 'Finish', field: 'finish', minWidth: 60},
        {id: 'effort-driven', name: 'Effort Driven', width: 80, minWidth: 20, maxWidth: 80, cssClass: 'cell-effort-driven', field: 'effortDriven', formatter: Slick.Formatters.Checkmark}
    ];

    var options = {
        editable: false,
        enableAddRow: false,
        enableCellNavigation: true
    };

    var prevPercentCompleteThreshold = 0;

    function myFilter(item, args) {
        return item.percentComplete >= args;
    }

    var dataView = new Slick.Data.DataView({ inlineFilters: true });
    var grid = new Slick.Grid(selector, dataView, columns, options);
    var pager = new Slick.Controls.Pager(dataView, grid, $('#pager'));

    // wire up model events to drive the grid
    dataView.onRowCountChanged.subscribe(function (e, args) {
        grid.updateRowCount();
        grid.render();
    });

    dataView.onRowsChanged.subscribe(function (e, args) {
        grid.invalidateRows(args.rows);
        grid.render();
    });


    var returnObj = {};
    var currentData;
    // initialize the model after all the events have been hooked up
    returnObj.refresh = function(data){
        if((!_.isEqual(currentData, data)) && data){
            currentData = _.cloneDeep(data);
            dataView.beginUpdate();
            dataView.setItems(currentData);
            dataView.setFilter(myFilter);
            dataView.setFilterArgs(0);
            dataView.endUpdate();
        }
    };

    returnObj.filterAndUpdate= function (percentCompleteThreshold) {
        var isNarrowing = percentCompleteThreshold > prevPercentCompleteThreshold;
        var isExpanding = percentCompleteThreshold < prevPercentCompleteThreshold;
        var renderedRange = grid.getRenderedRange();

        dataView.setFilterArgs(percentCompleteThreshold);
        dataView.setRefreshHints({
            ignoreDiffsBefore: renderedRange.top,
            ignoreDiffsAfter: renderedRange.bottom + 1,
            isFilterNarrowing: isNarrowing,
            isFilterExpanding: isExpanding
        });
        dataView.refresh();

        prevPercentCompleteThreshold = percentCompleteThreshold;
    };

    return returnObj;
};