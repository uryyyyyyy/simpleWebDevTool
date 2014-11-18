
simpleWebDevTool.service.mainService = function(){
	'use strict';
	var mainDao = simpleWebDevTool.dao.mainDao();

	return{
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
			return $.when(
				mainDao.getSampleList(id),
				mainDao.getJsTree(id),
				mainDao.getSlickGrid(id),
				mainDao.getSelect2(id),
				mainDao.getTinyMce(id)
			);
		},

		refer : function (str) {
			console.log('service.mainService.refer');
			return str + ' ほげほげほげ';
		}
	};
};