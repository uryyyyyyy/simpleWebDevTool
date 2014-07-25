/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.dao.mainDao = {};

(function() {
    var mainDao = simpleWebDevTool.dao.mainDao;
    var util = simpleWebDevTool.util;

    mainDao.load = function(){
        console.log('dao.mainDao.load');
        Bacon.combineTemplate({
            list: Bacon.fromPromise($.ajax("jsonApi/path/2")),
            jsTree: Bacon.fromPromise($.ajax("jsonApi/jstree/1")),
            slickGrid: Bacon.fromPromise($.ajax("jsonApi/slickGrid/1")),
            select2: Bacon.fromPromise($.ajax("jsonApi/select2/1")),
            tinyMce: Bacon.fromPromise($.ajax("jsonApi/tinyMce/1"))
        }).onValue(controller.refreshBacon);
    };

    mainDao.save = function(reqData){
        console.log('dao.mainDao.save');
        return util.putAjaxAsync('jsonApi/path/2', reqData, controller.refresh);
    };
})(jQuery);