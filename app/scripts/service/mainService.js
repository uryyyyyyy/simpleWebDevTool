/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.service.mainService = function(){
    var serviceName = 'mainService';
    var dao = simpleWebDevTool.dao.mainDao();

    var returnObj = {};

    returnObj.add = function(listElems, addStr){
        console.log('func1 ' + serviceName);
        return _.map(listElems, function(num) { return num + Number(addStr); });
    };

    returnObj.search = function(listElems, searchStr){
        console.log('func2 '  + serviceName);
        return _.filter(listElems, function(num) {
            return (String(num).indexOf(searchStr) !== -1)
        });
    };

    returnObj.addElem = function(listElems, searchStr){
        console.log('func2 '  + serviceName);
        for(var i = 0; i < Number(searchStr); ++i) {
            listElems.push(Math.random());
        }
        return listElems;
    };

    returnObj.load = function(){
        console.log('load '  + serviceName);
        dao.load();
    };

    returnObj.loadJsTree = function(){
        console.log('load '  + serviceName);
        dao.loadJsTree();
    };

    returnObj.loadSlickGrid = function(){
        console.log('loadSlickGrid '  + serviceName);
        dao.loadSlickGrid();
    };

    returnObj.refer = function(str){
        return str + ' ほげほげほげ';
    };

    returnObj.getData = function(){
        console.log('refresh '  + serviceName);
        var dataBox = {};
        dataBox.listData = dao.getData();
        dataBox.jsData = dao.getJsTree();
        dataBox.slickData = dao.getSlickGrid();
        return dataBox;
    };

    return returnObj;
};