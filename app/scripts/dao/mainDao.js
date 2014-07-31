/**
 * Created by shiba on 14/07/13.
 */

(function() {
    'use strict';
    var util = simpleWebDevTool.util;

    simpleWebDevTool.dao.mainDao = {
        getSampleList: function (id) {
            console.log('dao.mainDao.load');
            return Bacon.fromPromise(util.getAjaxAsync('jsonApi/path/' + id));
        },

        getJsTree: function (id) {
            console.log('dao.mainDao.load');
            return Bacon.fromPromise(util.getAjaxAsync('jsonApi/jstree/' + id));
        },

        getSlickGrid: function (id) {
            console.log('dao.mainDao.load');
            return Bacon.fromPromise(util.getAjaxAsync('jsonApi/slickGrid/' + id));
        },

        getSelect2: function (id) {
            console.log('dao.mainDao.load');
            return Bacon.fromPromise(util.getAjaxAsync('jsonApi/select2/' + id));
        },

        getTinyMce: function (id) {
            console.log('dao.mainDao.load');
            return Bacon.fromPromise(util.getAjaxAsync('jsonApi/tinyMce/' + id));
        },

        save: function (reqData) {
            console.log('dao.mainDao.save');
            return Bacon.combineTemplate({
                response: util.postAjaxAsync('jsonApi/path/2', reqData)
            });
        }
    };
})(jQuery);