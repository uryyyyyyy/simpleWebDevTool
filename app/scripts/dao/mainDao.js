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
        return util.getAjaxAsync('jsonApi/path/2', controller.init);
    };

    mainDao.loadJsTree = function(){
        console.log('dao.mainDao.loadJsTree');
        return util.getAjaxAsync('jsonApi/jstree/1', controller.init);
    };

    mainDao.loadSlickGrid = function(){
        console.log('dao.mainDao.loadSlickGrid');
        return util.getAjaxAsync('jsonApi/slickGrid/1', controller.init);
    };

    mainDao.loadSelect2 = function(){
        console.log('dao.mainDao.loadSelect2');
        return util.getAjaxAsync('jsonApi/select2/1', controller.init);
    };

    mainDao.getData = function(){
        console.log('dao.mainDao.getData');
        return util.getAjaxIfExist('jsonApi/path/2');
    };

    mainDao.getJsTree = function(){
        console.log('dao.mainDao.getJsTree');
        return util.getAjaxIfExist('jsonApi/jstree/1');
    };

    mainDao.getSlickGrid = function(){
        console.log('dao.mainDao.getSlickGrid');
        return util.getAjaxIfExist('jsonApi/slickGrid/1');
    };

    mainDao.getSelect2 = function(){
        console.log('dao.mainDao.getSelect2');
        return util.getAjaxIfExist('jsonApi/select2/1');
    };

    simpleWebDevTool.dao.mainDao.save = function(reqData){
        console.log('dao.mainDao.save');
        return util.putAjaxAsync('jsonApi/path/2', reqData, controller.refresh);
    };
})(jQuery);