/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.controller.jqueryController = function(){
    var controllerName = 'jqueryController';
    var service = simpleWebDevTool.service.mainService();

    var jstree = simpleWebDevTool.component.jstree('#jstree_demo');
    var slickGrid = simpleWebDevTool.component.slickGrid('#myGrid');
    var tinyMce = simpleWebDevTool.util.tinyMce('#editable');
    var tinyMceTitle = simpleWebDevTool.util.tinyMceTitle('#editable_title');
    var simpleForm = $('#sampleForm');
    var jstreeSearchFrom = $('#demo_q');
    var sampleList = simpleWebDevTool.component.sampleList('#list');
    var sampleList2 = simpleWebDevTool.component.sampleList('#list2');
    var select2 = simpleWebDevTool.component.basicSelector('#basicselect');
    var select2Multi = simpleWebDevTool.component.multiSelector('#e9');
    var returnObj = {};

    returnObj.load = function(){
        //simpleWebDevTool.util.countStart();
        console.logBlack('init '  + controllerName);
        service.load();
        //simpleWebDevTool.util.timeShow();
    };

    returnObj.add = function(){
        console.logBlack('func1 ' + controllerName);
        var addStr = simpleForm.val();
        var listElems = sampleList.getList();

        listElems = service.add(listElems, addStr);
        controller.refresh({ listData: listElems});
        console.log('func1 done');
    };

    returnObj.search = function(){
        console.logBlack('search '  + controllerName);
        var listElems = service.search(sampleList.getList(), simpleForm.val());
        controller.refresh({ listData: listElems});
        console.log('search done');
        slickGrid.filterAndUpdate(Number(simpleForm.val()));
    };

    returnObj.addElem = function(){
        console.logBlack('search '  + controllerName);
        var listElems = service.addElem(sampleList.getList(), simpleForm.val());
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
        if(refreshData.textData){
            $('#text').text(refreshData.textData);
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
        jstree.search(jstreeSearchFrom.val());
    };

    returnObj.jstreeRefToForm = function() {
        var node = jstree.getSelectNode();
        jstreeSearchFrom.val(node);
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
};