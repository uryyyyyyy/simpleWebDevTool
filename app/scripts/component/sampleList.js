/**
 * Created by shiba on 14/07/16.
 */

'use strict';

simpleWebDevTool.component.sampleList = function(selector) {

    var list = $(selector);
    var returnObj = {};
    var currentData = {};

    returnObj.refresh = function(newArray){
        if((!_.isEqual(currentData, newArray) && newArray)){
            currentData = _.cloneDeep(newArray);
            //recreate DOM
            list.empty();
            _.forEach(newArray, function(elem){
                list.append('<li>'+ elem + '</li>');
            });
            //attach event on li
            $(selector + ' li').on('click', function(){
                var index = $(selector + ' li').index(this) + 1;
                controller.listEvent(selector, index);
            });
        }
    };

    returnObj.getList = function(){
        //get Data from DOM
        //TODO get from currentData is fast but sometimes not correct
        return $(selector + ' li').map(function() {
            return Number(this.innerHTML);
        }).get();
    };
    return returnObj;
};