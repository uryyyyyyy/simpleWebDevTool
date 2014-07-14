/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.dao.mainDao = function(){
    var daoName = 'mainDao';

    return {
        load : function(serviceData){
            console.log('load '  + daoName);
            return simpleWebDevTool.util.getAjaxAsync('jsonApi/path/2', serviceData, controller.refresh);
        },
        save : function(serviceData, reqData){
            console.log('save '  + daoName);
            return simpleWebDevTool.util.putAjaxAsync('jsonApi/path/2', serviceData, reqData, controller.refresh);
        }
    };
};