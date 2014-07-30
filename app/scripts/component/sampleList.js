/**
 * Created by shiba on 14/07/16.
 */

simpleWebDevTool.component.sampleList = function(selector) {
    'use strict';
    var $select = $(selector);
    var currentData = {};

    var _getChildNumber = function(event){
        var target = event.target;
        var index = _.findIndex(target.parentElement.children, function(elem) {
            return _.isEqual(elem, target);
        });
        return index + 1;
    };

    return {
        refresh: function (newArray) {
            if ((!_.isEqual(currentData, newArray) && newArray)) {
                currentData = _.cloneDeep(newArray);
                //recreate DOM
                $select.empty();
                _.forEach(newArray, function (elem) {
                    $select.append('<li>' + elem + '</li>');
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
            .map(function(event){ return _getChildNumber(event); })
    };
};