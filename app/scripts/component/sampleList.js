/**
 * Created by shiba on 14/07/16.
 */

simpleWebDevTool.component.sampleList = function(selector) {
    'use strict';
    var list = $(selector);
    var currentData = {};
    list.append('<li></li>');
    var stream = $(selector + ' li').asEventStream("click");

    return {
        refresh: function (newArray) {
            if ((!_.isEqual(currentData, newArray) && newArray)) {
                currentData = _.cloneDeep(newArray);
                //recreate DOM
                list.empty();
                _.forEach(newArray, function (elem, index) {
                    list.append('<li id=' + index +  '>' + elem + '</li>');
                });
                //attach event on li
//                $(selector + ' li').on('click', function () {
//                    var index = $(selector + ' li').index(this) + 1;
//                    controller.listEvent(selector, index);
//                });
                stream = $(selector + ' li').asEventStream("click").map(
                        function(event){
                            return Number(event.target.id) + 1;
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
        childClickStream : function(){
            return stream;
        }

//        sample: function () {
//            list.append('<li>' + 'moke' + '</li>');
//            return $(selector + ' li').asEventStream("click").map($(selector + ' li').index(this) + 1);
//        }
    }
};