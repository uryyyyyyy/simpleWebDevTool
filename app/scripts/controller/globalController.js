
simpleWebDevTool.controller.globalController = function(){
	'use strict';
	console.log('global');
	var masterDao = simpleWebDevTool.dao.masterDao();
	var controller = simpleWebDevTool.controller;
	var util = simpleWebDevTool.util;

	var _useForm = function(res){
		if(res.userName){
			$('#login_logout_form').html(_.template(util.render('logoutFormTemplate')));
			controller.logoutController(res.userName);
		}else{
			$('#login_logout_form').html(_.template(util.render('loginFormTemplate')));
			controller.loginController();
		}
	};

	//initial loading
	masterDao.checkLogin()
		.then(_useForm);

};