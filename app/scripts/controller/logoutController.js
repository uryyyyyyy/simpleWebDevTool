
simpleWebDevTool.controller.logoutController = function(userName){
	'use strict';
	console.log('global');
	var component = simpleWebDevTool.component;
	var util = simpleWebDevTool.util;
	var masterDao = simpleWebDevTool.dao.masterDao();
	var logoutBtn = component.button('#logout_btn');

	var setLoginForm_ = function(res) {
		$('#login_logout_form').html(_.template(util.render('loginFormTemplate')));
		simpleWebDevTool.controller.loginController();
	};

	var logout = function(){
		masterDao.logout()
			.then(setLoginForm_);
	};

	//event handlers
	logoutBtn.attachClickEvent(logout);

	//initial loading
	$('#login_user').html('Login as ' + userName);

};