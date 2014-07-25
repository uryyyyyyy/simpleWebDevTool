/**
 * Created by shiba on 14/07/13.
 */

simpleWebDevTool.dao.mainDao = {};

(function() {
    'use strict';
    var mainDao = simpleWebDevTool.dao.mainDao;
    var util = simpleWebDevTool.util;

    mainDao.load = function(){
        console.log('dao.mainDao.load');
        return Bacon.combineTemplate({
            listData: Bacon.fromPromise(util.getAjaxAsync('jsonApi/path/2')),
            jsData: Bacon.fromPromise(util.getAjaxAsync('jsonApi/jstree/1')),
            slickData: Bacon.fromPromise(util.getAjaxAsync('jsonApi/slickGrid/1')),
            select2Data: Bacon.fromPromise(util.getAjaxAsync('jsonApi/select2/1')),
            tinyMceData: Bacon.fromPromise(util.getAjaxAsync('jsonApi/tinyMce/1'))
        });
    };

    mainDao.save = function(reqData){
        console.log('dao.mainDao.save');
        return util.putAjaxAsync('jsonApi/path/2', reqData, controller.refresh);
    };
})(jQuery);