/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.controller.jqueryController = function(){
    var controllerName = 'jqueryController';
    var service = simpleWebDevTool.service.mainService();

    var bindData = {};
    bindData.sampleData = [];

    watch(bindData, "sampleForm", function (id,oldval,newval) {
        console.info(
                "bindData." + id + " は " +
                oldval + " から " +
                newval + " に変更されました"
        );
    });

    var refreshArray = function(oldArray, newArray){
        if(!_.isEqual(oldArray, newArray)){
            var clone = _.cloneDeep(newArray);
            simpleList.empty();
            _.forEach(clone, function(elem){
                simpleList.append('<li>'+ elem + '</li>');
            });
        }
    };

    var jstree = simpleWebDevTool.util.jstree('#jstree_demo');
    var slickGrid = simpleWebDevTool.util.slickGrid('#myGrid');
    var tinyMce = simpleWebDevTool.util.tinyMce('#editable');
    var tinyMceTitle = simpleWebDevTool.util.tinyMceTitle('#editable_title');
    var simpleForm = $('#sampleForm');
    var jstreeSearchFrom = $('#demo_q');
    var simpleList = $('#list');

    var returnObj = {};

    returnObj.add = function(){
        console.log('func1 ' + controllerName);
        var addStr = simpleForm.val();
        service.add(addStr);
        controller.refresh();
        console.log('func1 done');
    };

    returnObj.search = function(){
        console.log('search '  + controllerName);
        var searchStr = simpleForm.val();
        service.search(searchStr);
        controller.refresh();
        console.log('search done');

        slickGrid.filterAndUpdate(Number(searchStr));
    };

    returnObj.addElem = function(){
        console.log('search '  + controllerName);
        var searchStr = simpleForm.val();
        service.addElem(searchStr);
        controller.refresh();
        console.log('search done');
    };

//    returnObj.init = function(){
//        //simpleWebDevTool.util.countStart();
//        console.log('init '  + controllerName);
//        service.load();
//        service.loadJsTree();
//        service.loadSlickGrid();
//        //simpleWebDevTool.util.timeShow();
//    };

    returnObj.refer = function(){
        var str = tinyMce.getHtml();
        bindData.sampleForm = simpleForm.val();
        service.refer(str);
        controller.refresh();
    };

    returnObj.refresh = function() {
        var tmp = _.cloneDeep(service.getData());
        refreshArray(bindData.sampleData, tmp.data);
        bindData.sampleData = tmp.data;
        $('#text').text(tmp.refHtml);
        jstree.refresh(tmp.jsData);
        slickGrid.refresh(tmp.slickData);
    };

    returnObj.demo_create = function() {
        jstree.demo_create();
    };

    returnObj.demo_delete = function() {
        jstree.demo_delete();
    };

    returnObj.demo_rename = function() {
        jstree.demo_rename();
    };

    returnObj.jstreeSearch = function() {
        var v = jstreeSearchFrom.val();
        jstree.search(v);
    };

    returnObj.jstreeRefToForm = function() {
        var node = jstree.getSelectNode();
        jstreeSearchFrom.val(node);
    };

    return returnObj;
};