/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.dao.mainDao = function(){
    var daoName = 'mainDao';

    return {
        load : function(serviceData){
            console.log('load '  + daoName);
            return simpleWebDevTool.util.getAjaxAsync('jsonApi/path/2', serviceData, 'data', controller.refresh);
        },
        loadJsTree : function(serviceData){
            console.log('loadJsTree '  + daoName);
            return simpleWebDevTool.util.getAjaxAsync('jsonApi/jstree/1', serviceData, 'jsData', controller.refresh);
        },
        save : function(serviceData, reqData){
            console.log('save '  + daoName);
            return simpleWebDevTool.util.putAjaxAsync('jsonApi/path/2', serviceData, 'data', reqData, controller.refresh);
        }
    };
};