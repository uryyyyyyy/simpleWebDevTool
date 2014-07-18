'use strict';

var controller ={};
var simpleWebDevTool = {};
simpleWebDevTool.controller = {};
simpleWebDevTool.views = {};
simpleWebDevTool.service = {};
simpleWebDevTool.dao = {};
simpleWebDevTool.util = {};
simpleWebDevTool.cache = {};
simpleWebDevTool.component = {};

// prefix

console.logBlack = function(msg){
    console.log('%c' + msg, 'color:#fff;background:#000;');
};

jQuery(function() {
// define a new Sammy.Application bound to the #main element selector
    var app = Sammy('#SimpleWebDevTool', function(app) {

        // define a 'get' route that will be triggered at '#/path'
        app.get('#/path', function() {
            $('#template').html(_.template(simpleWebDevTool.util.render('template1')));
            controller = simpleWebDevTool.controller.pathController();
            controller.init();
        });

        app.get('#/path2', function() {
            $('#template').html(_.template(simpleWebDevTool.util.render('template2')));
            controller = simpleWebDevTool.controller.path2Controller();
            controller.init();
        });
        app.get('#/vue', function() {
            console.log('access to #/vue');
            $('#template').html(_.template(simpleWebDevTool.util.render('vueTemplate')));
            controller = simpleWebDevTool.controller.vueController();
            controller.load();
        });
        app.get('#/jquery', function() {
            console.log('access to #/jquery');
            $('#template').html(_.template(simpleWebDevTool.util.render('jqueryTemplate')));
            controller = simpleWebDevTool.controller.jqueryController();
            controller.load();
        });
        app.get('#/path2/:id', function(context) {
            // this context is a Sammy.EventContext
            console.log(context.params.id);
        });

    });
    app.run();
});
;/**
 * Created by shiba on 14/07/14.
 */

'use strict';

simpleWebDevTool.component.basicSelector = function(selector) {

    var returnObj = {};
    var currentData = {};

    returnObj.refresh = function(newData){
        if((!_.isEqual(currentData, newData)) && newData){
            currentData = _.cloneDeep(newData);
            $(selector).select2({ data: newData });
        }
    };

    returnObj.getSelectedData = function(){
        return $(selector).select2('data');
    };

    return returnObj;
};;/**
 * Created by shiba on 14/07/14.
 */

'use strict';

simpleWebDevTool.component.jstree = function(selector) {

    var returnObj = {};
    var currentData = {};
    var treeDom = $(selector);

    returnObj.search = function(str){
        treeDom.jstree(true).search(str);
    };

    returnObj.getSelectNode= function () {
        return treeDom.jstree(true).get_selected();
    };

    returnObj.demoCreate= function () {
        var ref = treeDom.jstree(true),
            sel = ref.get_selected();
        if (!sel.length) {
            return false;
        }
        sel = sel[0];
        sel = ref.create_node(sel, {"type": "file"});
        if (sel) {
            ref.edit(sel);
        }
    };

    returnObj.demoRename= function () {
        var ref = treeDom.jstree(true),
            sel = ref.get_selected();
        if (!sel.length) {
            return false;
        }
        sel = sel[0];
        ref.edit(sel);
    };

    returnObj.demoDelete= function () {
        var ref = treeDom.jstree(true),
            sel = ref.get_selected();
        if (!sel.length) {
            return false;
        }
        ref.delete_node(sel);
    };

    returnObj.refresh= function (newData) {
        if((!_.isEqual(newData, currentData) && newData)){
            console.log('jstree refresh');
            currentData = _.cloneDeep(newData);
            treeDom.jstree({
                    "core": {
                        "animation": 0,
                        "check_callback": true,
                        "themes": { "stripes": true },
                        'data': [
                            { "id": "node_1", "text": "Root node",
                                "children" : [
                                    { "id": "node_1_1", "text" : "Child 1" },
                                    { "id": "node_1_2", "text" : "Child 2"}
                                ]
                            },
                            { "id": "node_2", "text": "Root node with options",
                                "state": { "opened": true, "selected": true },
                                "children": [
                                    { "id": "node_2_1", "text": "Child A" },
                                    { "id": "node_2_2", "text": "Child B"}
                                ]
                            }
                        ]
                    },
                    "types": {
                        "#": { "max_children": 1, "max_depth": 4, "valid_children": ["root"] },
                        "root": { "icon": "/static/3.0.2/assets/images/tree_icon.png", "valid_children": ["default"] },
                        "default": { "valid_children": ["default", "file"] },
                        "file": { "icon": "glyphicon glyphicon-file", "valid_children": true }
                    },
                    "plugins": [ "contextmenu", "dnd", "search", "state", "types", "wholerow" ]
                });
        }
    };

    return returnObj;
};;/**
 * Created by shiba on 14/07/14.
 */

'use strict';

simpleWebDevTool.component.multiSelector = function(selector) {

    var returnObj = {};
    var currentData = {};

    returnObj.refresh = function(newData){
        if((!_.isEqual(currentData, newData)) && newData){
            currentData = _.cloneDeep(newData);
            $(selector).select2({
                data: newData,
                multiple: true
            });
        }
    };

    returnObj.getSelectedData = function(){
        return $(selector).select2('data');
    };

    return returnObj;
};;/**
 * Created by shiba on 14/07/17.
 */

'use strict';

simpleWebDevTool.component.sampleBox = function(selector) {

    var list = $(selector);
    var returnObj = {};
    var currentData = {};

//    form.validate();

    returnObj.refresh = function(newArray){
        if((!_.isEqual(currentData, newArray) && newArray)){
            currentData = _.cloneDeep(newArray);
            //recreate DOM
            list.empty();
            _.forEach(newArray, function(elem){
                var _id = elem+'_box';
                list.append(_.template(simpleWebDevTool.util.render('template_partial'), {_id: _id}));
                simpleWebDevTool.component.tinyMce('#' + _id);
            });
            //attach event on li
        }
    };

    returnObj.getValue = function(){
        return list.val();
    };

    return returnObj;
};;/**
 * Created by shiba on 14/07/17.
 */

'use strict';

simpleWebDevTool.component.sampleFloat = function(selector) {
    $(selector).portamento();
};;/**
 * Created by shiba on 14/07/17.
 */


'use strict';

simpleWebDevTool.component.sampleForm = function(selector) {

    var returnObj = {};
    var currentData = {};

    var form = $(selector);

//    form.validate();

    returnObj.refresh = function(newData){
        form.val(newData);
    };

    returnObj.getValue = function(){
        return form.val();
    };

    return returnObj;
};;/**
 * Created by shiba on 14/07/16.
 */

'use strict';

simpleWebDevTool.component.sampleList = function(selector) {

    var list = $(selector);
    var returnObj = {};
    var currentData = {};

    returnObj.refresh = function(newArray){
        if((!_.isEqual(currentData, newArray) && newArray)){
            currentData = _.cloneDeep(newArray);
            //recreate DOM
            list.empty();
            _.forEach(newArray, function(elem){
                list.append('<li>'+ elem + '</li>');
            });
            //attach event on li
            $(selector + ' li').on('click', function(){
                var index = $(selector + ' li').index(this) + 1;
                controller.listEvent(selector, index);
            });
        }
    };

    returnObj.getList = function(){
        //get Data from DOM
        //TODO get from currentData is fast but sometimes not correct
        return $(selector + ' li').map(function() {
            return Number(this.innerHTML);
        }).get();
    };
    return returnObj;
};;
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
};;/**
 * Created by shiba on 14/07/15.
 */

'use strict';

simpleWebDevTool.component.tinyMce = function(selector) {

    tinymce.init({
        selector: selector,
        inline: true,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste'
        ],
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
    });
    return{
        getHtml : function() {
            return $(selector).html();
        }
    };
};

simpleWebDevTool.component.tinyMceTitle = function(selector) {

    tinymce.init({
        selector: selector,
        inline: true,
        toolbar: 'undo redo',
        menubar: false
    });

    return{
        value : $(selector).val()
    };
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.controller.jqueryController = function(){
    var controllerName = 'jqueryController';
    var service = simpleWebDevTool.service.mainService;

    var jstree = simpleWebDevTool.component.jstree('#jstree_demo');
    var slickGrid = simpleWebDevTool.component.slickGrid('#myGrid');
    var tinyMce = simpleWebDevTool.component.tinyMce('#editable');
    var tinyMceTitle = simpleWebDevTool.component.tinyMceTitle('#editable_title');
    var simpleForm = simpleWebDevTool.component.sampleForm('#sampleForm');
    var jstreeSearchFrom = simpleWebDevTool.component.sampleForm('#demo_q');
    var textArea = $('#text');
    var sampleList = simpleWebDevTool.component.sampleList('#list');
    var sampleList2 = simpleWebDevTool.component.sampleList('#list2');
    var select2 = simpleWebDevTool.component.basicSelector('#basicselect');
    var select2Multi = simpleWebDevTool.component.multiSelector('#e9');
    var sampleBox = simpleWebDevTool.component.sampleBox('#box');
    var hoge = simpleWebDevTool.component.sampleFloat('#float_');
    var returnObj = {};

    returnObj.load = function(){
        //simpleWebDevTool.util.countStart();
        console.logBlack('init '  + controllerName);
        service.load();
        controller.init();
        //simpleWebDevTool.util.timeShow();
    };

    returnObj.add = function(){
        console.logBlack('func1 ' + controllerName);
        var addStr = simpleForm.getValue();
        var listElems = sampleList.getList();

        listElems = service.add(listElems, addStr);
        controller.refresh({ listData: listElems});
        console.log('func1 done');
    };

    returnObj.search = function(){
        console.logBlack('search '  + controllerName);
        var listElems = service.search(sampleList.getList(), simpleForm.getValue());
        controller.refresh({ listData: listElems});
        console.log('search done');
        slickGrid.filterAndUpdate(Number(simpleForm.getValue()));
    };

    returnObj.addElem = function(){
        console.logBlack('search '  + controllerName);
        var listElems = service.addElem(sampleList.getList(), simpleForm.getValue());
        controller.refresh({ listData: listElems});
        console.log('search done');
    };

    returnObj.refer = function(){
        var str = tinyMce.getHtml();
        var resultObj = service.refer(str);
        controller.refresh({ textData: resultObj});
    };

    returnObj.init = function() {
        var tmp = _.cloneDeep(service.getData());
        controller.refresh(tmp);
    };

    returnObj.refresh = function(refreshData) {
        console.logBlack('refresh');
        var tmp = _.cloneDeep(service.getData());

        sampleList.refresh(refreshData.listData);
        sampleList2.refresh(refreshData.listData);
        jstree.refresh(tmp.jsData);
        slickGrid.refresh(tmp.slickData);
        select2.refresh(tmp.select2Data);
        select2Multi.refresh(tmp.select2Data);
        sampleBox.refresh(refreshData.listData);
        if(refreshData.textData){
            textArea.text(refreshData.textData);
        }
    };

    returnObj.demoCreate = function() {
        jstree.demoCreate();
    };

    returnObj.demoDelete = function() {
        jstree.demoDelete();
    };

    returnObj.demoRename = function() {
        jstree.demoRename();
    };

    returnObj.jstreeSearch = function() {
        jstree.search(jstreeSearchFrom.getValue());
    };

    returnObj.jstreeRefToForm = function() {
        var node = jstree.getSelectNode();
        jstreeSearchFrom.refresh(node);
    };

    returnObj.listEvent = function(selector, index) {
        console.log(selector + index);
    };

    returnObj.getSelectedData = function() {
        var data = select2.getSelectedData();
        controller.refresh({textData:JSON.stringify(data)});
    };

    returnObj.getSelectedDataMulti = function() {
        var data = select2Multi.getSelectedData();
        controller.refresh({textData:JSON.stringify(data)});
    };

    return returnObj;
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.controller.path2Controller = function(){
    var controllerName = 'path2Controller';
    var service = simpleWebDevTool.service.path2Service();

    return {
        func1 : function(){
            console.log('func1 ' + controllerName);
            service.func1();
            console.log('func1 done');
        },

        func2 : function(){
            console.log('func2 '  + controllerName);
            service.func2();
            console.log('func2 done');
        },
        func3 : function(){
            var uiData = [1, 3];
            console.log('func3 '  + controllerName);
            service.save(uiData);
            console.log('func3 done');
        },
        init : function(){
            console.log('init '  + controllerName);
            service.load();
            console.log('init done');
        },
        refresh : function() {
            console.log('refresh '  + controllerName);
            var data = service.getData();
            $('#list').empty();
            _.forEach(data.data, function(elem){
                $('#list').append('<li>'+ elem + '</li>');
            });
            $('#text').text(data.refHtml);
        }
    };
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.controller.pathController = function(){
    var controllerName = 'pathController';
    var service = simpleWebDevTool.service.pathService();

    tinymce.init({
        selector: 'h1.editable',
        inline: true,
        toolbar: 'undo redo',
        menubar: false
    });

    tinymce.init({
        selector: 'div.editable',
        inline: true,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste'
        ],
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
    });

    $('div.editable').keyup(function () {
        controller.refer();
    });

    return {
        add : function(){
            console.log('func1 ' + controllerName);
            var addStr = $('#sampleForm').val();
            service.add(addStr);
            controller.refresh();
            console.log('func1 done');
        },
        search : function(){
            console.log('search '  + controllerName);
            var searchStr = $('#sampleForm').val();
            service.search(searchStr);
            controller.refresh();
            console.log('search done');
        },
        init : function(){
            //simpleWebDevTool.util.countStart();
            console.log('init '  + controllerName);
            service.load();
            //simpleWebDevTool.util.timeShow();
        },
        refer : function(){
            var str = $('div.editable').html();
            service.refer(str);
            controller.refresh();
        },
        refresh : function() {
            var data = service.getData();
            $('#list').empty();
            _.forEach(data.data, function(elem){
                $('#list').append('<li>'+ elem + '</li>');
            });
            $('#text').text(data.refHtml);
        }
    };
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.controller.vueController = function(){
    var controllerName = 'vueController';
    var service = simpleWebDevTool.service.mainService;
    var vue = new Vue({
        el: '#template',
        data: {
            texts: ['# hello'],
            list: []
        }
    });

    tinymce.init({
        selector: 'h1.editable',
        inline: true,
        toolbar: 'undo redo',
        menubar: false
    });

    tinymce.init({
        selector: 'div.editable',
        inline: true,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste'
        ],
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
    });

    $('div.editable').keyup(function () {
        controller.refer();
    });

    var returnObj = {};

    returnObj.add = function(){
        console.log('func1 ' + controllerName);
        var addStr = $('#sampleForm').val();
        var list = service.add(vue.list, addStr);
        controller.refresh({listData : list});
        console.log('func1 done');
    };

    returnObj.search = function(){
        console.log('search '  + controllerName);
        var searchStr = $('#sampleForm').val();
        service.search(searchStr);
        controller.refresh();
        console.log('search done');
    };

    returnObj.addElem = function(){
        console.log('search '  + controllerName);
        var searchStr = $('#sampleForm').val();
        service.addElem(searchStr);
        controller.refresh();
        console.log('search done');
    };

    returnObj.init = function() {
        var tmp = _.cloneDeep(service.getData());
        controller.refresh(tmp);
    };

    returnObj.load = function(){
        //simpleWebDevTool.util.countStart();
        console.logBlack('init '  + controllerName);
        service.load();
        controller.init();
        //simpleWebDevTool.util.timeShow();
    };

    returnObj.refer = function(){
        var str = $('div.editable').html();
        service.refer(str);
        controller.refresh();
    };

    returnObj.refresh = function(refreshData) {
        console.logBlack('refresh');
        var tmp = _.cloneDeep(refreshData);

        vue.list = tmp.listData;
        vue.texts = tmp.textData;
    };

    return returnObj;
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.dao.mainDao = {};

(function() {
    var mainDao = simpleWebDevTool.dao.mainDao;
    var util = simpleWebDevTool.util;

    mainDao.load = function(){
        console.log('dao.mainDao.load');
        return util.getAjaxAsync('jsonApi/path/2', controller.init);
    };

    mainDao.loadJsTree = function(){
        console.log('dao.mainDao.loadJsTree');
        return util.getAjaxAsync('jsonApi/jstree/1', controller.init);
    };

    mainDao.loadSlickGrid = function(){
        console.log('dao.mainDao.loadSlickGrid');
        return util.getAjaxAsync('jsonApi/slickGrid/1', controller.init);
    };

    mainDao.loadSelect2 = function(){
        console.log('dao.mainDao.loadSelect2');
        return util.getAjaxAsync('jsonApi/select2/1', controller.init);
    };

    mainDao.getData = function(){
        console.log('dao.mainDao.getData');
        return util.getAjaxIfExist('jsonApi/path/2');
    };

    mainDao.getJsTree = function(){
        console.log('dao.mainDao.getJsTree');
        return util.getAjaxIfExist('jsonApi/jstree/1');
    };

    mainDao.getSlickGrid = function(){
        console.log('dao.mainDao.getSlickGrid');
        return util.getAjaxIfExist('jsonApi/slickGrid/1');
    };

    mainDao.getSelect2 = function(){
        console.log('dao.mainDao.getSelect2');
        return util.getAjaxIfExist('jsonApi/select2/1');
    };

    mainDao.save = function(reqData){
        console.log('dao.mainDao.save');
        return util.putAjaxAsync('jsonApi/path/2', reqData, controller.refresh);
    };
})(jQuery);;'use strict';

/**
 * InfoWinow オブジェクトをストックするクラス。
 * 
 */
var InfoWindowStock = function() {
	/**
	 * InfoWindow をストックするハッシュ。
	 * @type {Array}
	 */
	this.stock = [];
};
InfoWindowStock.prototype = {
	/**
	 * ストックする InfoWindow のキーを生成する。
	 * 
	 * @param  {Object} location 緯度・経度を格納したオブジェクト
	 * @return {String} 生成したキー
	 */
	createKey: function(location) {
		var key = location.k + ':' + location.A;
		return key;
	},
	/**
	 * InfoWindow をストックする。
	 * 
	 * @param  {Object} location 緯度・経度を格納したオブジェクト
	 * @param  {Object} infoWindow ストックする InfoWindow オブジェクト
	 */
	put: function(location, infoWindow) {
		var key = this.createKey(location);
		this.stock[key] = infoWindow;
	},
	/**
	 * ストックしてある InfoWindow から該当するものを取得する。
	 * 
	 * @param  {Object} location 緯度・経度を格納したオブジェクト
	 * @return {Object} ストックしてあった InfoWindow オブジェクト
	 */
	get: function(location) {
		var key = this.createKey(location);
		return this.stock[key];
	}
};
;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.service.mainService = {};

(function() {
    var mainService = simpleWebDevTool.service.mainService;
    var dao = simpleWebDevTool.dao;

    mainService.add = function (listElems, addStr) {
        console.log('service.mainService.add');
        return _.map(listElems, function (num) {
            return num + Number(addStr);
        });
    };

    mainService.search = function (listElems, searchStr) {
        console.log('service.mainService.search');
        return _.filter(listElems, function (num) {
            return (String(num).indexOf(searchStr) !== -1);
        });
    };

    mainService.addElem = function (listElems, searchStr) {
        console.log('service.mainService.addElem');
        for (var i = 0; i < Number(searchStr); ++i) {
            listElems.push(Math.random());
        }
        return listElems;
    };

    mainService.load = function () {
        console.log('service.mainService.load');
        dao.mainDao.load();
        dao.mainDao.loadJsTree();
        dao.mainDao.loadSlickGrid();
        dao.mainDao.loadSelect2();
    };

    mainService.refer = function (str) {
        console.log('service.mainService.refer');
        return str + ' ほげほげほげ';
    };

    mainService.getData = function () {
        console.log('service.mainService.getData');
        var dataBox = {};
        dataBox.listData = dao.mainDao.getData();
        dataBox.jsData = dao.mainDao.getJsTree();
        dataBox.slickData = dao.mainDao.getSlickGrid();
        dataBox.select2Data = dao.mainDao.getSelect2();
        return dataBox;
    };
})(jQuery);;/**
 * Created by shiba on 14/07/13.
 */

'use strict';
simpleWebDevTool.cache.ajaxCache = {};

simpleWebDevTool.util.getAjaxAsync = function(url, callback) {
    console.log('getAjaxAsync url:' + url);
    var ajaxCache = simpleWebDevTool.cache.ajaxCache; //TODO use localStorage
    if (!ajaxCache[url]) {
        $.ajax({
            type: 'GET',
            url: url,
            async: true
        }).done(function (data) {
            console.log('success');
            console.log(data);
            //simpleWebDevTool.util.dummyWait(1000);
            ajaxCache[url] = data;
            if (callback) {
                callback();
            }
        }).fail(function () {
            console.error('error');
        });
    }
    return ajaxCache[url];
};

simpleWebDevTool.util.getAjaxIfExist = function(url) {
    console.log('getAjaxIfExist url:' + url);
    return simpleWebDevTool.cache.ajaxCache[url];
};

simpleWebDevTool.util.putAjaxAsync = function(url, reqData, callback) {
    console.log('putAjaxAsync url:' + url);
    var returnObj = {};
    $.ajax({
        type: 'POST',
        url: url,
        async: true,
        data: reqData
    }).done(function(data) {
        console.log('success');
        console.log(data);
        //simpleWebDevTool.util.dummyWait(1000);
        returnObj = data;
        callback();
    }).fail(function() {
        console.error(reqData);
    });
    return returnObj;
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

// this function is cache, you don't need to change
simpleWebDevTool.util.getAjaxSyncWithCache = function(keyUrl) {
    var cache = [];
    if ( !cache[keyUrl] ) {
        $.ajax({
            type: 'GET',
            url: keyUrl,
            async: false
        }).done(function(data) {
            console.log('success');
            console.log(data);
            //simpleWebDevTool.util.dummyWait(1000);
            cache[keyUrl] = data;
        }).fail(function() {
            console.error('error');
        });
    }
    return cache[keyUrl];
};
//postAjaxSyncWithCache is no-meaning
;/**
 * Created by shiba on 14/07/13.
 */

'use strict';
simpleWebDevTool.cache.tmplCache = {};
// this function is cache, you don't need to change
simpleWebDevTool.util.render = function(tmplName) {
    var tmplCache = simpleWebDevTool.cache.tmplCache;

    if ( ! tmplCache[tmplName] ) {
        var tmplUrl = 'views/' + tmplName + '.html';
        $.ajax({
            url: tmplUrl,
            method: 'GET',
            async: false,
            dataType: 'html',
            success: function(data) {
                tmplCache[tmplName] = data;
            }
        });
    }
    return tmplCache[tmplName];
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.util.dummyWait = function(time) {
    var d1 = new Date().getTime();
    var d2 = new Date().getTime();
    while (d2 < d1 + time) {
        d2 = new Date().getTime();
    }
    return;
};

simpleWebDevTool.util.countStart = function() {
    simpleWebDevTool.util.startTime = new Date().getTime();
    console.info('count start');
};

simpleWebDevTool.util.timeShow = function() {
    var now = new Date().getTime();
    console.info(now - simpleWebDevTool.util.startTime + ' ms');
};