
simpleWebDevTool.util.getAjaxAsync = function(url) {
	'use strict';
	console.log('GET url:' + url);
	return $.ajax({
		type: 'GET',
		url: url,
		async: true
	});
};

simpleWebDevTool.util.postAjaxAsync = function(url, reqData) {
	'use strict';
	console.log('POST url:' + url);
	console.log(reqData);
	var util = simpleWebDevTool.util;
	return $.ajax({
		type: 'POST',
		url: url,
		async: true,
		contentType: 'text/json',
		data: JSON.stringify(reqData)
	});
};

simpleWebDevTool.util.postFileAsync = function(url, file) {
	'use strict';
	console.log('POST url:' + url);
	return $.ajax({
		type: 'POST',
		url: url,
		async: true,
		data : file,
		processData : false, //specification (not allow jQuery to exec data)
		contentType : false //specification
	});
};
