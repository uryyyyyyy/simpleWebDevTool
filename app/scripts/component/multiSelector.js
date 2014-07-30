/**
 * Created by shiba on 14/07/14.
 */

simpleWebDevTool.component.multiSelector = function(selector) {
    'use strict';
    var $select = $(selector);
    var currentData = {};

    return {

        refresh : function(newData){
            if((!_.isEqual(currentData, newData)) && newData){
                currentData = _.cloneDeep(newData);
                $(selector).select2({
                    data: newData,
                    multiple: true
                });
            }
        },

        getSelectedData : function(){
            return $(selector).select2('data');
        },

        clickEStream : $select.asEventStream('click')
    };
};