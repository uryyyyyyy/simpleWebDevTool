/**
 * Created by shiba on 14/07/13.
 */

simpleWebDevTool.controller.jqueryController = function(){
    'use strict';
    var service = simpleWebDevTool.service.mainService;
    var jsTree = simpleWebDevTool.component.jstree('#jstree_demo');
    var slickGrid = simpleWebDevTool.component.slickGrid('#myGrid');
    var tinyMce = simpleWebDevTool.component.tinyMce('#editable');
    var tinyMceTitle = simpleWebDevTool.component.tinyMceTitle('#editable_title');
    var simpleForm = simpleWebDevTool.component.sampleForm('#sampleForm');
    var jsTreeSearchFrom = simpleWebDevTool.component.sampleForm('#jstree_text');
    var textArea = $('#text');
    var sampleList = simpleWebDevTool.component.sampleList('#list');
    var sampleList2 = simpleWebDevTool.component.sampleList('#list2');
    var select2 = simpleWebDevTool.component.basicSelector('#basicSelect');
    var select2Multi = simpleWebDevTool.component.multiSelector('#multiSelect');
    var sampleBox = simpleWebDevTool.component.sampleBox('#box');
    var floating = simpleWebDevTool.component.sampleFloat('#float_');

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

    $('#addButton').asEventStream('click').assign(function() {
        console.log('addButton');
        var addStr = simpleForm.getValue();
        var listElems = sampleList.getList();
        listElems = service.add(listElems, addStr);
        _refresh({ listData: listElems});
    });

    $('#searchButton').asEventStream('click').assign(function() {
        console.log('searchButton');
        var listElems = service.search(sampleList.getList(), simpleForm.getValue());
        _refresh({ listData: listElems});
        slickGrid.filterAndUpdate(Number(simpleForm.getValue()));
    });

    $('#addElemButton').asEventStream('click').assign(function() {
        console.log('addElemButton');
        var listElems = service.addElem(sampleList.getList(), simpleForm.getValue());
        _refresh({ listData: listElems});
    });

    $('#demoCreateButton').asEventStream('click').assign(function() {
        jsTree.demoCreate();
    });

    $('#demoRenameButton').asEventStream('click').assign(function() {
        jsTree.demoRename();
    });

    $('#demoDeleteButton').asEventStream('click').assign(function() {
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
        if(tmp.textData){
            textArea.text(tmp.textData);
        }
    };

    return {
        load : function(){
            //simpleWebDevTool.util.countStart();
            console.log('load');
            service.load().assign(_refresh);
            //simpleWebDevTool.util.timeShow();
        }
    };
};