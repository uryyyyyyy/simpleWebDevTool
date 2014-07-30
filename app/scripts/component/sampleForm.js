/**
 * Created by shiba on 14/07/17.
 */


'use strict';

simpleWebDevTool.component.sampleForm = function(selector) {
    var currentData = {};

    var $select = $(selector);

//    form.validate();

    return {
        refresh : function(newData){
            $select.val(newData);
        },

        getValue : function(){
            return $select.val();
        },

        keyUpEStream : $select.asEventStream("keyup")
    };
};