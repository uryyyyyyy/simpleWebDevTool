/**
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
        vue.text = tmp.tinyMceData.main_text;
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
};