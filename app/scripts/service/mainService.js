/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.service.mainService = {};

(function() {
    var mainService = simpleWebDevTool.service.mainService;
    var dao = simpleWebDevTool.dao;

    mainService.add = function (listElems, addStr) {
        console.log('service.mainService.add');
        return _.map(listElems, function (num) {
            return num + Number(addStr);
        });
    };

    mainService.search = function (listElems, searchStr) {
        console.log('service.mainService.search');
        return _.filter(listElems, function (num) {
            return (String(num).indexOf(searchStr) !== -1);
        });
    };

    mainService.addElem = function (listElems, searchStr) {
        console.log('service.mainService.addElem');
        for (var i = 0; i < Number(searchStr); ++i) {
            listElems.push(Math.random());
        }
        return listElems;
    };

    mainService.load = function () {
        console.log('service.mainService.load');
        dao.mainDao.load();
        dao.mainDao.loadJsTree();
        dao.mainDao.loadSlickGrid();
        dao.mainDao.loadSelect2();
    };

    mainService.refer = function (str) {
        console.log('service.mainService.refer');
        return str + ' ほげほげほげ';
    };

    mainService.getData = function () {
        console.log('service.mainService.getData');
        var dataBox = {};
        dataBox.listData = dao.mainDao.getData();
        dataBox.jsData = dao.mainDao.getJsTree();
        dataBox.slickData = dao.mainDao.getSlickGrid();
        dataBox.select2Data = dao.mainDao.getSelect2();
        return dataBox;
    };
})(jQuery);