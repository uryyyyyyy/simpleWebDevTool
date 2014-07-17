/**
 * Created by shiba on 14/07/17.
 */


'use strict';

simpleWebDevTool.component.sampleForm = function(selector) {

    var returnObj = {};
    var currentData = {};

    var form = $(selector);

//    form.validate();

    returnObj.refresh = function(newData){
        form.val(newData);
    };

    returnObj.getValue = function(){
        return form.val();
    };

    return returnObj;
};