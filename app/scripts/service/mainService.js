/**
 * Created by shiba on 14/07/13.
 */

//simpleWebDevTool.service.mainService = {};

(function() {
    'use strict';
    var dao = simpleWebDevTool.dao;
    simpleWebDevTool.service.mainService = {

        add : function (listElems, addStr) {
            console.log('service.mainService.add');
            return _.map(listElems, function (num) {
                return num + Number(addStr);
            });
        },

        search : function (listElems, searchStr) {
            console.log('service.mainService.search');
            return _.filter(listElems, function (num) {
                return (String(num).indexOf(searchStr) !== -1);
            });
        },

        addElem : function (listElems, searchStr) {
            console.log('service.mainService.addElem');
            for (var i = 0; i < Number(searchStr); ++i) {
                listElems.push(Math.random());
            }
            return listElems;
        },

        load : function (id) {
            console.log('service.mainService.load');
            return Bacon.combineTemplate({
                listData: dao.mainDao.getSampleList(id),
                jsData: dao.mainDao.getJsTree(id),
                slickData: dao.mainDao.getSlickGrid(id),
                select2Data: dao.mainDao.getSelect2(id),
                tinyMceData: dao.mainDao.getTinyMce(id)
            });
        },

        refer : function (str) {
            console.log('service.mainService.refer');
            return str + ' ほげほげほげ';
        }
    };
})(jQuery);