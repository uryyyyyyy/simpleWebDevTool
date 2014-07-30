/**
 * Created by shiba on 14/07/14.
 */

simpleWebDevTool.component.mergely = function(selector) {
    'use strict';
    var $select = $(selector);
    var currentData = {};

    return {
        refresh : function(newData){
            if((!_.isEqual(currentData, newData)) && newData){
                currentData = _.cloneDeep(newData);
                $(selector).mergely({
                    cmsettings: { readOnly: false, lineNumbers: true },
                    lhs: function(setValue) {
                        setValue('the quick red fox\njumped over the hairy dog');
                    },
                    rhs: function(setValue) {
                        setValue('the quick brown fox\njumped over the lazy dog');
                    }
                });
            }
        },

        getSelectedData : function(){
            return $(selector).select2('data');
        },

        clickEStream : $select.asEventStream('click')
    };
};