/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.service.mainService = function(){
    var serviceName = 'mainService';
    var dao = simpleWebDevTool.dao.mainDao();
    var bindData = {};

    var returnObj = {};

    returnObj.add = function(addStr){
        console.log('func1 ' + serviceName);
        bindData.data =  _.map(bindData.data, function(num) { return num + Number(addStr); });
    };

    returnObj.search = function(searchStr){
        console.log('func2 '  + serviceName);
        bindData.str = searchStr;
        bindData.data = _.filter(bindData.data, function(num) {
            return (String(num).indexOf(searchStr) !== -1)
        });
    };

    returnObj.addElem = function(searchStr){
        console.log('func2 '  + serviceName);
        for(var i = 0; i < Number(searchStr); ++i) {
            bindData.data.push(Math.random());
        }
    };

    returnObj.load = function(){
        console.log('load '  + serviceName);
        dao.load(bindData);
        console.log(bindData);
    };

    returnObj.loadJsTree = function(){
        console.log('load '  + serviceName);
        dao.loadJsTree(bindData);
    };

    returnObj.refer = function(str){
        bindData.refHtml = str + ' refer';
    };

    returnObj.getData = function(){
        console.log('refresh '  + serviceName);
        return bindData;
    };

    return returnObj;
};