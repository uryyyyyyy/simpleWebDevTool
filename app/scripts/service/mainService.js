/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.service.mainService = function(){
    var serviceName = 'mainService';
    var dao = simpleWebDevTool.dao.mainDao();
    var dataBox = {};

    var returnObj = {};

    returnObj.add = function(addStr){
        console.log('func1 ' + serviceName);
        dataBox.data =  _.map(dataBox.data, function(num) { return num + Number(addStr); });
    };

    returnObj.search = function(searchStr){
        console.log('func2 '  + serviceName);
        dataBox.str = searchStr;
        dataBox.data = _.filter(dataBox.data, function(num) {
            return (String(num).indexOf(searchStr) !== -1)
        });
    };

    returnObj.addElem = function(searchStr){
        console.log('func2 '  + serviceName);
        for(var i = 0; i < Number(searchStr); ++i) {
            dataBox.data.push(Math.random());
        }
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
        dataBox.slickData = dao.loadSlickGrid();
    };

    returnObj.refer = function(str){
        dataBox.refHtml = str + ' refer';
    };

    returnObj.getData = function(){
        console.log('refresh '  + serviceName);
        var dataBox = {};
        dataBox.data = dao.load();;
        dataBox.jsData = dao.loadJsTree();
        dataBox.slickData = dao.loadSlickGrid();
        return dataBox;
    };

    return returnObj;
};