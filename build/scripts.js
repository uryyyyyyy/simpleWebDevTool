
var simpleWebDevTool = {};
simpleWebDevTool.controller = {};
simpleWebDevTool.views = {};
simpleWebDevTool.service = {};
simpleWebDevTool.dao = {};
simpleWebDevTool.util = {};
simpleWebDevTool.cache = {};
simpleWebDevTool.component = {};

jQuery(function() {
    'use strict';
    var app = Sammy('#SimpleWebDevTool', function(app) {
        // define a 'get' route that will be triggered at '#/path'
        app.get('#/path', function() {
            $('#template').html(_.template(simpleWebDevTool.util.render('template1')));
            simpleWebDevTool.controller.pathController().init();
        });

        app.get('#/path2', function() {
            $('#template').html(_.template(simpleWebDevTool.util.render('template2')));
            simpleWebDevTool.controller.path2Controller().init();
        });
        app.get('#/vue/:id', function(context) {
            console.log('access to #/vue');
            $('#template').html(_.template(simpleWebDevTool.util.render('vueTemplate')));
            simpleWebDevTool.controller.vueController(context.params.id).load();
        });
        app.get('#/jquery/:id', function(context) {
            console.log('access to #/jquery');
            $('#template').html(_.template(simpleWebDevTool.util.render('jqueryTemplate')));
            simpleWebDevTool.controller.jqueryController(context.params.id).load();
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

simpleWebDevTool.component.basicSelector = function(selector) {
    'use strict';
    var $select = $(selector);
    var currentData = {};

    return {
        refresh : function(newData){
            if((!_.isEqual(currentData, newData)) && newData){
                currentData = _.cloneDeep(newData);
                $(selector).select2({ data: newData });
            }
        },

        getSelectedData : function(){
            return $(selector).select2('data');
        },

        clickEStream : $select.asEventStream('click')
    };
};;/**
 * Created by shiba on 14/07/14.
 */

simpleWebDevTool.component.jstree = function(selector) {
    'use strict';
    var currentData = {};
    var $select = $(selector);

    return {
        search : function(str){
            $select.jstree(true).search(str);
        },

        getSelectNode : function () {
            return $select.jstree(true).get_selected();
        },

        demoCreate : function () {
            var ref = $select.jstree(true),
                sel = ref.get_selected();
            if (!sel.length) {
                return false;
            }
            sel = sel[0];
            sel = ref.create_node(sel, {"type": "file"});
            if (sel) {
                ref.edit(sel);
            }
        },

        demoRename : function () {
            var ref = $select.jstree(true),
                sel = ref.get_selected();
            if (!sel.length) {
                return false;
            }
            sel = sel[0];
            ref.edit(sel);
        },

        demoDelete : function () {
            var ref = $select.jstree(true),
                sel = ref.get_selected();
            if (!sel.length) {
                return false;
            }
            ref.delete_node(sel);
        },

        refresh : function (newData) {
            if((!_.isEqual(newData, currentData) && newData)){
                console.log('jstree refresh');
                currentData = _.cloneDeep(newData);
                $select.jstree({
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
        },

        clickEStream : $select.asEventStream("click")
    }
};;/**
 * Created by shiba on 14/07/14.
 */

simpleWebDevTool.component.mergely = function(selector) {
    'use strict';
    var $select = $(selector);
    var currentData = {};

    return {
        refresh : function(newData){
            if((!_.isEqual(currentData, newData)) && newData){
                currentData = _.cloneDeep(newData);
                $select.mergely({
                    cmsettings: { readOnly: false, lineNumbers: true },
                    lhs: function(setValue) {
                        setValue('the quick red fox\njumped over the hairy dog');
                    },
                    rhs: function(setValue) {
                        setValue('the quick brown fox\njumped over the lazy dog');
                    },
                    editor_width : '250px'
                });
            }
        },

        clickEStream : $select.asEventStream('click')
    };
};;/**
 * Created by shiba on 14/07/14.
 */

simpleWebDevTool.component.multiSelector = function(selector) {
    'use strict';
    var $select = $(selector);
    var currentData = {};

    return {

        refresh : function(newData){
            if((!_.isEqual(currentData, newData)) && newData){
                currentData = _.cloneDeep(newData);
                $(selector).select2({
                    data: newData,
                    multiple: true
                });
            }
        },

        getSelectedData : function(){
            return $(selector).select2('data');
        },

        clickEStream : $select.asEventStream('click')
    };
};;/**
 * Created by shiba on 14/07/17.
 */

simpleWebDevTool.component.sampleBox = function(selector) {
    'use strict';
    var $select = $(selector);
    var currentData = {};

    return {
        refresh : function(newArray){
            if((!_.isEqual(currentData, newArray) && newArray)){
                currentData = _.cloneDeep(newArray);
                //recreate DOM
                $select.empty();
                _.forEach(newArray, function(elem){
                    var _id = elem+'_box';
                    $select.append(_.template(simpleWebDevTool.util.render('template_partial'), {_id: _id}));
                    var tiny = simpleWebDevTool.component.tinyMce('#' + _id);
                    tiny.refresh({mainText:elem});
                });
            }
        },

        getValue : function(){
            return $select.val();
        }
    };
};;/**
 * Created by shiba on 14/07/16.
 */

simpleWebDevTool.component.sampleButton = function(selector) {
    'use strict';
    var $select = $(selector);
    var currentData = {};

    return {
        refresh: function (text) {
            if ((!_.isEqual(currentData, text) && text)) {
                currentData = _.cloneDeep(text);
                $select.val(text);
            }
        },

        getText: function () {
            return $select.val();
        },
        clickEStream : $(selector).asEventStream('click')
    };
};;/**
 * Created by shiba on 14/07/17.
 */

simpleWebDevTool.component.sampleFloat = function(selector) {
    'use strict';
    $(selector).portamento();
};;/**
 * Created by shiba on 14/07/17.
 */

simpleWebDevTool.component.sampleForm = function(selector) {
    'use strict';
    var currentData = {};
    var $select = $(selector);

//    form.validate();

    return {
        refresh : function(newData){
            $select.val(newData);
        },

        getValue : function(){
            return $select.val();
        },

        keyUpEStream : $select.asEventStream('keyup')
    };
};;/**
 * Created by shiba on 14/07/16.
 */

simpleWebDevTool.component.sampleList = function(selector) {
    'use strict';
    var $select = $(selector);
    var currentData = {};

    var _getChildNumber = function(event){
        var target = event.target;
        var index = _.findIndex(target.parentElement.children, function(elem) {
            return _.isEqual(elem, target);
        });
        return index + 1;
    };

    return {
        refresh: function (newArray) {
            if ((!_.isEqual(currentData, newArray) && newArray)) {
                currentData = _.cloneDeep(newArray);
                //recreate DOM
                $select.empty();
                _.forEach(newArray, function (elem) {
                    $select.append('<li>' + elem + '</li>');
                });
            }
        },

        getList: function () {
            //get Data from DOM
            //TODO get from currentData is fast but sometimes not correct
            return $(selector + ' li').map(function () {
                return Number(this.innerHTML);
            }).get();
        },
        clickEStream : $(selector)
            .asEventStream('click', 'li')
            .map(function(event){ return _getChildNumber(event); })
    };
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

simpleWebDevTool.component.tinyMce = function(selector) {

    'use strict';
    var currentData;
    var $select = $(selector);

    return{
        getHtml : function() {
            return $select.html();
        },

        refresh : function(data) {
            if((data && !_.isEqual(currentData, data))) {

                tinymce.init({
                    selector: selector,
                    inline: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table contextmenu paste'
                    ],
                    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                    image_list: data.imageList
                });
                $select.html(data.mainText);
                currentData = data;
            }
        },

        keyUpEStream : $select.asEventStream("keyup")
    };
};

simpleWebDevTool.component.tinyMceTitle = function(selector) {
    'use strict';
    var currentData;
    var $select = $(selector);
    return{
        getValue : function() {
            return $select.val();
        },

        refresh : function(data) {
            if ((!_.isEqual(currentData, data)) && data) {
                tinymce.init({
                    selector: selector,
                    inline: true,
                    toolbar: 'undo redo',
                    menubar: false
                });
                $select.val(data.mainText);
            }
        }
    };
};;/**
 * Created by shiba on 14/07/13.
 */

simpleWebDevTool.controller.jqueryController = function(optionId){
    'use strict';
    var id = Number(optionId);
    var component = simpleWebDevTool.component;
    var service = simpleWebDevTool.service.mainService;
    var jsTree = component.jstree('#jstree_demo');
    var slickGrid = component.slickGrid('#myGrid');
    var tinyMce = component.tinyMce('#editable');
    var tinyMceTitle = component.tinyMceTitle('#editable_title');
    var simpleForm = component.sampleForm('#sampleForm');
    var jsTreeSearchFrom = component.sampleForm('#jstree_text');
    var textArea = $('#text');
    var sampleList = component.sampleList('#list');
    var sampleList2 = component.sampleList('#list2');
    var select2 = component.basicSelector('#basicSelect');
    var select2Multi = component.multiSelector('#multiSelect');
    var sampleBox = component.sampleBox('#box');
    var floating = component.sampleFloat('#float_');
    var mergely = component.mergely('#compare');
    var addButton = component.sampleButton('#addButton');
    var searchButton = component.sampleButton('#searchButton');
    var addElemButton = component.sampleButton('#addElemButton');
    var demoCreateButton = component.sampleButton('#demoCreateButton');
    var demoRenameButton = component.sampleButton('#demoRenameButton');
    var demoDeleteButton = component.sampleButton('#demoDeleteButton');

    tinyMce.keyUpEStream.assign(function() {
        console.log('tinyMce.keyUpEStream');
        var txt = service.refer(tinyMce.getHtml());
        _refresh({ textData: txt});
    });

    sampleList.clickEStream.assign(function(val) {
        console.log('sampleList.clickEStream');
        simpleForm.refresh('click the 1st list ' + val + 'th');
    });

    sampleList2.clickEStream.assign(function(val) {
        console.log('sampleList2.clickEStream');
        simpleForm.refresh('click the 2nd list ' + val + 'th');
    });

    jsTree.clickEStream.assign(function() {
        var node = jsTree.getSelectNode();
        jsTreeSearchFrom.refresh(node);
    });

    select2.clickEStream.assign(function() {
        var data = select2.getSelectedData();
        _refresh({textData:JSON.stringify(data)});
    });

    select2Multi.clickEStream.assign(function() {
        var data = select2Multi.getSelectedData();
        _refresh({textData:JSON.stringify(data)});
    });

    addButton.clickEStream.assign(function() {
        console.log('addButton');
        var addStr = simpleForm.getValue();
        var listElems = sampleList.getList();
        listElems = service.add(listElems, addStr);
        _refresh({ listData: listElems});
    });

    searchButton.clickEStream.assign(function() {
        console.log('searchButton');
        var listElems = service.search(sampleList.getList(), simpleForm.getValue());
        _refresh({ listData: listElems});
        slickGrid.filterAndUpdate(Number(simpleForm.getValue()));
    });

    addElemButton.clickEStream.assign(function() {
        console.log('addElemButton');
        var listElems = service.addElem(sampleList.getList(), simpleForm.getValue());
        _refresh({ listData: listElems});
    });

    demoCreateButton.clickEStream.assign(function() {
        jsTree.demoCreate();
    });

    demoRenameButton.clickEStream.assign(function() {
        jsTree.demoRename();
    });

    demoDeleteButton.clickEStream.assign(function() {
        jsTree.demoDelete();
    });

    jsTreeSearchFrom.keyUpEStream.assign(function() {
        jsTree.search(jsTreeSearchFrom.getValue());
    });

    var _refresh = function(refreshData){
        console.log('refresh');
        var tmp = _.cloneDeep(refreshData);

        sampleList.refresh(tmp.listData);
        sampleList2.refresh(tmp.listData);
        jsTree.refresh(tmp.jsData);
        slickGrid.refresh(tmp.slickData);
        select2.refresh(tmp.select2Data);
        select2Multi.refresh(tmp.select2Data);
        sampleBox.refresh(tmp.listData);
        tinyMce.refresh(tmp.tinyMceData);
        tinyMceTitle.refresh(tmp.tinyMceData);
        mergely.refresh(tmp.tinyMceData);
        if(tmp.textData){
            textArea.text(tmp.textData);
        }
    };

    return {
        load : function(){
            //simpleWebDevTool.util.countStart();
            console.log('load');
            service.load(id).assign(_refresh);
            //simpleWebDevTool.util.timeShow();
        }
    };
};;/**
 * Created by shiba on 14/07/13.
 */

simpleWebDevTool.controller.vueController = function(optionId){
    'use strict';
    var id = Number(optionId);
    var component = simpleWebDevTool.component;
    var service = simpleWebDevTool.service.mainService;
    var addButton = component.sampleButton('#addButton');
    var tinyMce = component.tinyMce('#editable');
    var tinyMceTitle = component.tinyMceTitle('#editable_title');
    var searchButton = component.sampleButton('#searchButton');
    var addElemButton = component.sampleButton('#addElemButton');
    var vue = new Vue({
        el: '#template',
        data: {
            text: '# hello',
            list: [],
            form_:''
        }
    });

    tinyMce.keyUpEStream.assign(function() {
        console.log('tinyMce.keyUpEStream');
        vue.text = service.refer(tinyMce.getHtml());
    });

    addButton.clickEStream.assign(function() {
        console.log('addButton');
        var addStr = vue.form_;
        var listElems = vue.list;
        vue.list = service.add(listElems, addStr);
    });

    searchButton.clickEStream.assign(function() {
        console.log('searchButton');
        vue.list = service.search(vue.list, vue.form_);
    });

    addElemButton.clickEStream.assign(function() {
        console.log('addElemButton');
        vue.list = service.addElem(vue.list, vue.form_);
    });

    var _refresh = function(refreshData) {
        console.log('refresh');
        var tmp = _.cloneDeep(refreshData);
        vue.list = tmp.listData;
        vue.text = tmp.tinyMceData.mainText;
        tinyMce.refresh(tmp.tinyMceData);
        tinyMceTitle.refresh(tmp.tinyMceData);
    };

    return {
        load : function(){
            //simpleWebDevTool.util.countStart();
            console.log('load');
            service.load(id).assign(_refresh);
            //simpleWebDevTool.util.timeShow();
        }
    };
};;/**
 * Created by shiba on 14/07/13.
 */

(function() {
    'use strict';
    var util = simpleWebDevTool.util;

    simpleWebDevTool.dao.mainDao = {
        getSampleList: function (id) {
            console.log('dao.mainDao.load');
            return Bacon.fromPromise(util.getAjaxAsync('jsonApi/path/' + id));
        },

        getJsTree: function (id) {
            console.log('dao.mainDao.load');
            return Bacon.fromPromise(util.getAjaxAsync('jsonApi/jstree/' + id));
        },

        getSlickGrid: function (id) {
            console.log('dao.mainDao.load');
            return Bacon.fromPromise(util.getAjaxAsync('jsonApi/slickGrid/' + id));
        },

        getSelect2: function (id) {
            console.log('dao.mainDao.load');
            return Bacon.fromPromise(util.getAjaxAsync('jsonApi/select2/' + id));
        },

        getTinyMce: function (id) {
            console.log('dao.mainDao.load');
            return Bacon.fromPromise(util.getAjaxAsync('jsonApi/tinyMce/' + id));
        },

        save: function (reqData) {
            console.log('dao.mainDao.save');
            return Bacon.combineTemplate({
                response: util.postAjaxAsync('jsonApi/path/2', reqData)
            });
        }
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

//simpleWebDevTool.service.mainService = {};

(function() {
    'use strict';
    var dao = simpleWebDevTool.dao;
    simpleWebDevTool.service.mainService = {

        add : function (listElems, addStr) {
            console.log('service.mainService.add');
            return _.map(listElems, function (num) {
                return num + Number(addStr);
            });
        },

        search : function (listElems, searchStr) {
            console.log('service.mainService.search');
            return _.filter(listElems, function (num) {
                return (String(num).indexOf(searchStr) !== -1);
            });
        },

        addElem : function (listElems, searchStr) {
            console.log('service.mainService.addElem');
            for (var i = 0; i < Number(searchStr); ++i) {
                listElems.push(Math.random());
            }
            return listElems;
        },

        load : function (id) {
            console.log('service.mainService.load');
            return Bacon.combineTemplate({
                listData: dao.mainDao.getSampleList(id),
                jsData: dao.mainDao.getJsTree(id),
                slickData: dao.mainDao.getSlickGrid(id),
                select2Data: dao.mainDao.getSelect2(id),
                tinyMceData: dao.mainDao.getTinyMce(id)
            });
        },

        refer : function (str) {
            console.log('service.mainService.refer');
            return str + ' ほげほげほげ';
        }
    };
})(jQuery);;/**
 * Created by shiba on 14/07/13.
 */

simpleWebDevTool.util.getAjaxAsync = function(url) {
    'use strict';
    console.log('getAjaxAsync url:' + url);
    return $.ajax({
        type: 'GET',
        url: url,
        async: true
    });
};

simpleWebDevTool.util.postAjaxAsync = function(url, reqData) {
    'use strict';
    console.log('putAjaxAsync url:' + url);
    return $.ajax({
        type: 'POST',
        url: url,
        async: true,
        data: reqData
    });
};;/**
 * Created by shiba on 14/07/13.
 */

// this function is cache, you don't need to change
simpleWebDevTool.util.getAjaxSyncWithCache = function(keyUrl) {
    'use strict';
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