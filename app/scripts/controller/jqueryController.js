/**
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
            $("#loading").show();
            console.log('load');
            service.load(id).assign(_refresh);
            $("#loading").fadeOut(500);
            //simpleWebDevTool.util.timeShow();
        }
    };
};