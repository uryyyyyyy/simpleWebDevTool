/**
 * Created by shiba on 14/07/17.
 */

'use strict';

simpleWebDevTool.component.sampleBox = function(selector) {

    var list = $(selector);
    var returnObj = {};
    var currentData = {};

//    form.validate();

    returnObj.refresh = function(newArray){
        if((!_.isEqual(currentData, newArray) && newArray)){
            currentData = _.cloneDeep(newArray);
            //recreate DOM
            list.empty();
            _.forEach(newArray, function(elem){
                var _id = elem+'_box';
                list.append(_.template(simpleWebDevTool.util.render('template_partial'), {_id: _id}));
                simpleWebDevTool.component.tinyMce('#' + _id);
            });
            //attach event on li
        }
    };

    returnObj.getValue = function(){
        return list.val();
    };

    return returnObj;
};