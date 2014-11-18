
simpleWebDevTool.controller.loginController = function(){
	'use strict';
	console.log('global');
	var component = simpleWebDevTool.component;
	var util = simpleWebDevTool.util;
	var masterDao = simpleWebDevTool.dao.masterDao();
	var loginBtn = component.button('#login_btn');
	var userIdForm = component.textForm('#user_id_form');
	var passwordForm = component.textForm('#password_form');

	var login = function(){
		var loginData = {
			userId: userIdForm.getValue(),
			pass: passwordForm.getValue()
		};
		masterDao.login(loginData)
			.then(util.setLogoutForm);
	};

	//event handlers
	loginBtn.attachClickEvent(login);
	userIdForm.attachEnterEvent(login);
	passwordForm.attachEnterEvent(login);

	//initial loading

};