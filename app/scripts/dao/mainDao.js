/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.dao.mainDao = function(){
    var daoName = 'mainDao';

    var returnObj = {};

    returnObj.load = function(){
        console.log('load '  + daoName);
        return simpleWebDevTool.util.getAjaxAsync('jsonApi/path/2', controller.init);
    };

    returnObj.loadJsTree = function(){
        console.log('loadJsTree '  + daoName);
        return simpleWebDevTool.util.getAjaxAsync('jsonApi/jstree/1', controller.init);
    };

    returnObj.loadSlickGrid = function(){
        console.log('loadJsTree '  + daoName);
        return simpleWebDevTool.util.getAjaxAsync('jsonApi/slickGrid/1', controller.init);
    };

    returnObj.getData = function(){
        console.log('load '  + daoName);
        return simpleWebDevTool.util.getAjaxIfExist('jsonApi/path/2');
    };

    returnObj.getJsTree = function(){
        console.log('loadJsTree '  + daoName);
        return simpleWebDevTool.util.getAjaxIfExist('jsonApi/jstree/1');
    };

    returnObj.getSlickGrid = function(){
        console.log('loadJsTree '  + daoName);
        return simpleWebDevTool.util.getAjaxIfExist('jsonApi/slickGrid/1');
    };

    returnObj.save = function(reqData){
        console.log('save '  + daoName);
        return simpleWebDevTool.util.putAjaxAsync('jsonApi/path/2', reqData, controller.refresh);
    };

    return returnObj;
};