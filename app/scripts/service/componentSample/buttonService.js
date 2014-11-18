
(function() {
	'use strict';
	simpleWebDevTool.service.componentSample.buttonService = function(){
		var dao = simpleWebDevTool.dao.componentSampleDao();
		var util = simpleWebDevTool.util;

		return{

			import : function() {
				return dao.import();
			}

		};
	};
})(jQuery);