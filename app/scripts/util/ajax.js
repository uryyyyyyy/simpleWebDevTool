
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

simpleWebDevTool.util.getJson = function(promiseObject, okCallBack) {
	'use strict';
	var util = simpleWebDevTool.util;
	promiseObject.onValue(util.showOkMsg(okCallBack));
	promiseObject.onError(util.showNgMsg);
};

simpleWebDevTool.util.getJsonWithNoComment = function(promiseObject, okCallBack) {
	'use strict';
	var util = simpleWebDevTool.util;
	promiseObject.onValue(okCallBack);
	promiseObject.onError(util.showNgMsg);
};

simpleWebDevTool.util.getAllJson = function(promiseObjects, okCallBack) {
	'use strict';
	var util = simpleWebDevTool.util;
	var bacon = Bacon.combineTemplate(promiseObjects);
	bacon.onValue(okCallBack);
	bacon.onError(util.showNgMsg);
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

simpleWebDevTool.util.setLogoutForm = function(res) {
	'use strict';
	var util = simpleWebDevTool.util;
	var controller = simpleWebDevTool.controller;

	$('#login_logout_form').html(_.template(util.render('logoutFormTemplate')));
	controller.logoutController(res.userName);
};

simpleWebDevTool.util.setLoginForm = function(res) {
	'use strict';
	var util = simpleWebDevTool.util;
	var controller = simpleWebDevTool.controller;

	$('#login_logout_form').html(_.template(util.render('loginFormTemplate')));
	controller.loginController();
};
