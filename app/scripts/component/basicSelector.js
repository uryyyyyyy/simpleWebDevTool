/**
 * Created by shiba on 14/07/14.
 */

'use strict';

simpleWebDevTool.component.basicSelector = function(selector) {

    var returnObj = {};
    var currentData = {};

    returnObj.refresh = function(newData){
        if((!_.isEqual(currentData, newData)) && newData){
            currentData = _.cloneDeep(newData);
            $(selector).select2({ data: newData });
        }
    };

    returnObj.getSelectedData = function(){
        return $(selector).select2('data');
    };

    return returnObj;
};