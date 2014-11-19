
simpleWebDevTool.dao.componentSampleDao = function(){
	'use strict';
	var util = simpleWebDevTool.util;
	return{

		import : function () {
			console.log('dao.import');
			var promise = util.postAjaxAsync('jsonApi/component/import', {});
			promise.fail(util.showNgMsg);
			return promise.then(util.showOkMsg);
		},

		getJsTree : function () {
			console.log('dao.getJsTree');
			var promise = util.getAjaxAsync('jsonApi/component/jsTree');
			promise.fail(util.showNgMsg);
			return promise.then(util.showOkMsg);
		}

	};
};