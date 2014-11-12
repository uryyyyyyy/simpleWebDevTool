
simpleWebDevTool.service.editorService = function(){
	'use strict';
	var mainDao = simpleWebDevTool.dao.mainDao();

	return {
		load : function (id) {
			console.log('service.mainService.load');
			return $.when(
				mainDao.getTinyMce(1)
			);
		},

		refer : function (str) {
			console.log('service.mainService.refer');
			return str + ' ほげほげほげ';
		}
	};
};