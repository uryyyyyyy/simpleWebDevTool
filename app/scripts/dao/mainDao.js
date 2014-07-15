/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.dao.mainDao = function(){
    var daoName = 'mainDao';

    return {
        load : function(){
            console.log('load '  + daoName);
            return simpleWebDevTool.util.getAjaxAsync('jsonApi/path/2', controller.refresh);
        },
        loadJsTree : function(){
            console.log('loadJsTree '  + daoName);
            return simpleWebDevTool.util.getAjaxAsync('jsonApi/jstree/1', controller.refresh);
        },
        loadSlickGrid : function(){
            console.log('loadJsTree '  + daoName);
            return simpleWebDevTool.util.getAjaxAsync('jsonApi/slickGrid/1', controller.refresh);
        },
        save : function(reqData){
            console.log('save '  + daoName);
            return simpleWebDevTool.util.putAjaxAsync('jsonApi/path/2', reqData, controller.refresh);
        }
    };
};