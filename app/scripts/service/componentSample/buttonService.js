
simpleWebDevTool.service.componentSample.buttonService = function(){
	'use strict';
	console.log('initialize service');
	var dao = simpleWebDevTool.dao.componentSampleDao();
	var util = simpleWebDevTool.util;

	return{

		import : function() {
			return dao.import();
		}

	};
};