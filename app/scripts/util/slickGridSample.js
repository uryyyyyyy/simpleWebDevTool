
'use strict';

simpleWebDevTool.util.slickGrid = function(selector) {

    var dataView;
    var grid;
    var data = [];
    var columns = [
        {id: "sel", name: "#", field: "num", behavior: "select", cssClass: "cell-selection", width: 40, resizable: false, selectable: false, sortable: true},
        {id: "title", name: "Title", field: "title", width: 120, minWidth: 120, cssClass: "cell-title"},
        {id: "duration", name: "Duration", field: "duration"},
        {id: "%", name: "% Complete", field: "percentComplete", width: 80, resizable: false, formatter: Slick.Formatters.PercentCompleteBar},
        {id: "start", name: "Start", field: "start", minWidth: 60},
        {id: "finish", name: "Finish", field: "finish", minWidth: 60},
        {id: "effort-driven", name: "Effort Driven", width: 80, minWidth: 20, maxWidth: 80, cssClass: "cell-effort-driven", field: "effortDriven", formatter: Slick.Formatters.Checkmark}
    ];

    var options = {
        editable: false,
        enableAddRow: false,
        enableCellNavigation: true
    };

    var percentCompleteThreshold = 0;
    var prevPercentCompleteThreshold = 0;
    var h_runfilters = null;

    function myFilter(item, args) {
        return item["percentComplete"] >= args;
    }

    function DataItem(i) {
        this.num = i;
        this.id = "id_" + i;
        this.percentComplete = Math.round(Math.random() * 100);
        this.effortDriven = (i % 5 == 0);
        this.start = "01/01/2009";
        this.finish = "01/05/2009";
        this.title = "Task " + i;
        this.duration = "5 days";
    }


    // prepare the data
    for (var i = 0; i < 1000; i++) {
        data[i] = new DataItem(i);
    }

    dataView = new Slick.Data.DataView({ inlineFilters: true });
    grid = new Slick.Grid(selector, dataView, columns, options);
    var pager = new Slick.Controls.Pager(dataView, grid, $("#pager"));

    // wire up model events to drive the grid
    dataView.onRowCountChanged.subscribe(function (e, args) {
        grid.updateRowCount();
        grid.render();
    });

    dataView.onRowsChanged.subscribe(function (e, args) {
        grid.invalidateRows(args.rows);
        grid.render();
    });


    // initialize the model after all the events have been hooked up
    dataView.beginUpdate();
    dataView.setItems(data);
    dataView.setFilter(myFilter);
    dataView.setFilterArgs(0);
    dataView.endUpdate();

    return {
        filterAndUpdate: function (percentCompleteThreshold) {
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
        }
    }
};