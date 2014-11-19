
simpleWebDevTool.service.componentSample.jsTreeService = function(){
	'use strict';
	console.log('initialize service');
	var dao = simpleWebDevTool.dao.componentSampleDao();
	var util = simpleWebDevTool.util;

	return{

		load : function() {
			return dao.getJsTree();
		}

	};
};