/**
 * Created by shiba on 14/07/16.
 */

simpleWebDevTool.component.sampleList = function(selector) {
    'use strict';
    var list = $(selector);
    var currentData = {};

    return {
        refresh: function (newArray) {
            if ((!_.isEqual(currentData, newArray) && newArray)) {
                currentData = _.cloneDeep(newArray);
                //recreate DOM
                list.empty();
                _.forEach(newArray, function (elem, index) {
                    list.append('<li id=' + index +  '>' + elem + '</li>');
                });
            }
        },

        getList: function () {
            //get Data from DOM
            //TODO get from currentData is fast but sometimes not correct
            return $(selector + ' li').map(function () {
                return Number(this.innerHTML);
            }).get();
        },
        clickEStream : $(selector)
            .asEventStream('click', 'li')
            .map(function(event){
                return Number(event.target.id) + 1;
            })
    };
};