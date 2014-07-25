/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.controller.jqueryController = function(){
    var controllerName = 'jqueryController';
    var service = simpleWebDevTool.service.mainService;
    var jsTree = simpleWebDevTool.component.jstree('#jstree_demo');
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

    tinyMce.keyUpEStream.assign(function() {
        var txt = service.refer(tinyMce.getHtml());
        _refresh({ textData: txt});
    });

    sampleList.childClickStream().assign(function(val) {
        var txt = service.refer(tinyMce.getHtml());
        _refresh({ textData: txt});
    });

    $('#addButton').asEventStream("click").onValue(function() {
        console.logBlack('func1 ' + controllerName);
        var addStr = simpleForm.getValue();
        var listElems = sampleList.getList();
        listElems = service.add(listElems, addStr);
        _refresh({ listData: listElems});
    });

    $('#searchButton').asEventStream("click").onValue(function() {
        console.logBlack('search '  + controllerName);
        var listElems = service.search(sampleList.getList(), simpleForm.getValue());
        _refresh({ listData: listElems});
        slickGrid.filterAndUpdate(Number(simpleForm.getValue()));
    });

    $('#addElemButton').asEventStream("click").onValue(function() {
        console.logBlack('search '  + controllerName);
        var listElems = service.addElem(sampleList.getList(), simpleForm.getValue());
        _refresh({ listData: listElems});
    });

    $('#demoCreateButton').asEventStream("click").onValue(function() {
        jsTree.demoCreate();
    });

    $('#demoRenameButton').asEventStream("click").onValue(function() {
        jsTree.demoRename();
    });

    $('#demoDeleteButton').asEventStream("click").onValue(function() {
        jsTree.demoDelete();
    });

    var _refresh = function(refreshData){
        console.logBlack('refresh');
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
        if(tmp.textData){
            textArea.text(tmp.textData);
        }
    };

    var returnObj = {};

    returnObj.load = function(){
        //simpleWebDevTool.util.countStart();
        console.logBlack('init '  + controllerName);
        service.load().assign(_refresh);
        //simpleWebDevTool.util.timeShow();
    };

    returnObj.refresh = function(refreshData) {
        _refresh(refreshData);
    };

    returnObj.jstreeSearch = function() {
        jsTree.search(jstreeSearchFrom.getValue());
    };

    returnObj.jstreeRefToForm = function() {
        var node = jsTree.getSelectNode();
        jstreeSearchFrom.refresh(node);
    };

    returnObj.listEvent = function(selector, index) {
        console.log(selector + index);
    };

    returnObj.getSelectedData = function() {
        var data = select2.getSelectedData();
        _refresh({textData:JSON.stringify(data)});
    };

    returnObj.getSelectedDataMulti = function() {
        var data = select2Multi.getSelectedData();
        _refresh({textData:JSON.stringify(data)});
    };

    return returnObj;
};