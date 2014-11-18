
simpleWebDevTool.util.showOkMsg = function(res) {
	'use strict';
	var util = simpleWebDevTool.util;
	console.log('Ajax Success');
	console.log(res);
	if(res.successMsg){
		$('#alert').append(_.template(util.render('alert/successTemplate'), { 'value': _.escape(res.successMsg) }));
	}
	return res;
};

simpleWebDevTool.util.showNgMsg = function(res) {
	'use strict';
	var util = simpleWebDevTool.util;
	console.log('Ajax Fail');
	console.log(res);
	if(res.responseJSON.errMsg){
		$('#alert').append(_.template(util.render('alert/errorTemplate'), { 'value': _.escape(res.responseJSON.errMsg)}));
	}
};