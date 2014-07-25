/**
 * Created by shiba on 14/07/17.
 */

simpleWebDevTool.component.sampleBox = function(selector) {
    'use strict';
    var $list = $(selector);
    var returnObj = {};
    var currentData = {};

    returnObj.refresh = function(newArray){
        if((!_.isEqual(currentData, newArray) && newArray)){
            currentData = _.cloneDeep(newArray);
            //recreate DOM
            $list.empty();
            _.forEach(newArray, function(elem){
                var _id = elem+'_box';
                $list.append(_.template(simpleWebDevTool.util.render('template_partial'), {_id: _id}));
                var tiny = simpleWebDevTool.component.tinyMce('#' + _id);
                tiny.refresh({main_text:elem});
            });
        }
    };

    returnObj.getValue = function(){
        return $list.val();
    };

    return returnObj;
};