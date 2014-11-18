
simpleWebDevTool.controller.loginController = function(){
	'use strict';
	console.log('global');
	var component = simpleWebDevTool.component;
	var util = simpleWebDevTool.util;
	var masterDao = simpleWebDevTool.dao.masterDao();
	var loginBtn = component.button('#login_btn');
	var userIdForm = component.textForm('#user_id_form');
	var passwordForm = component.textForm('#password_form');

	var setLogoutForm_ = function(res) {
		$('#login_logout_form').html(_.template(util.render('logoutFormTemplate')));
		simpleWebDevTool.controller.logoutController(res.userName);
	};

	var login = function(){
		var loginData = {
			userId: userIdForm.getValue(),
			pass: passwordForm.getValue()
		};
		masterDao.login(loginData)
			.then(setLogoutForm_);
	};

	//event handlers
	loginBtn.attachClickEvent(login);
	userIdForm.attachEnterEvent(login);
	passwordForm.attachEnterEvent(login);

	//initial loading

};