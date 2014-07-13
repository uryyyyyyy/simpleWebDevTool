/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.dao.pathDao = function(){
    var daoName = 'pathDao';

    return {
        load : function(){
            console.log('load '  + daoName);
            return simpleWebDevTool.util.getAjaxAsync('jsonApi/path/2', controller.refresh);
        },
        save : function(reqData){
            console.log('save '  + daoName);
            return simpleWebDevTool.util.putAjaxAsync('jsonApi/path/2', reqData, controller.refresh);
        }
    };
};