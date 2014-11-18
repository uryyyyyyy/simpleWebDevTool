/**
 * Created by shiba on 14/07/13.
 */

(function() {
	'use strict';
	simpleWebDevTool.dao.componentSampleDao = function(){
		var util = simpleWebDevTool.util;
		return{

			import : function () {
				console.log('dao.import');
				var promise = util.postAjaxAsync('jsonApi/component/import', {});
				promise.fail(util.showNgMsg);
				return promise.then(util.showOkMsg);
			}

		};
	};
})(jQuery);