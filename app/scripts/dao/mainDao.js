
simpleWebDevTool.dao.mainDao = function(){
	'use strict';
	var util = simpleWebDevTool.util;

	return {
		getSampleList: function (id) {
			console.log('dao.mainDao.load');
			return util.getAjaxAsync('jsonApi/path/' + id);
		},

		getJsTree: function (id) {
			console.log('dao.mainDao.load');
			return util.getAjaxAsync('jsonApi/jstree/' + id);
		},

		getSlickGrid: function (id) {
			console.log('dao.mainDao.load');
			return util.getAjaxAsync('jsonApi/slickGrid/' + id);
		},

		getSelect2: function (id) {
			console.log('dao.mainDao.load');
			return util.getAjaxAsync('jsonApi/select2/' + id);
		},

		getTinyMce: function (id) {
			console.log('dao.mainDao.load');
			return util.getAjaxAsync('jsonApi/tinyMce/' + id);
		},

		save: function (reqData) {
			console.log('dao.mainDao.save');
			return util.postAjaxAsync('jsonApi/path/2', reqData);
		}
	};
};