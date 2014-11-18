
simpleWebDevTool.controller.logoutController = function(userName){
	'use strict';
	console.log('global');
	var component = simpleWebDevTool.component;
	var util = simpleWebDevTool.util;
	var masterDao = simpleWebDevTool.dao.masterDao();
	var logoutBtn = component.button('#logout_btn');

	var logout = function(){
		masterDao.logout()
			.then(util.setLoginForm);
	};

	//event handlers
	logoutBtn.attachClickEvent(logout);

	//initial loading
	$('#login_user').html('Login as ' + userName);

};