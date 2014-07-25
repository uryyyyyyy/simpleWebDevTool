/**
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

    returnObj.refresh = function(refreshData) {
        console.logBlack('refresh');
        var tmp = _.cloneDeep(refreshData);

        sampleList.refresh(tmp.listData);
        sampleList2.refresh(tmp.listData);
        jstree.refresh(tmp.jsData);
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

    returnObj.refreshBacon = function(ajaxData) {
        console.logBlack('refresh');
        sampleList.refresh(ajaxData.list);
        sampleList2.refresh(ajaxData.list);
        jstree.refresh(ajaxData.jsTree);
        slickGrid.refresh(ajaxData.slickGrid);
        select2.refresh(ajaxData.select2);
        select2Multi.refresh(ajaxData.select2);
        tinyMce.refresh(ajaxData.tinyMce);
        tinyMceTitle.refresh(ajaxData.tinyMce);
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

//    var allKeyUps = $(document).asEventStream("keyup");
//
//    var spaceBarKeyUps = allKeyUps
//        .filter(function(event) { return event.keyCode == 32 });
//
//    spaceBarKeyUps.onValue(function(event) { alert("you pressed space" + event) });

    return returnObj;
};