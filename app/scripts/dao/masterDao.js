/**
 * Created by shiba on 14/07/13.
 */

(function() {
	'use strict';
	simpleWebDevTool.dao.masterDao = function(){
		var util = simpleWebDevTool.util;
		return{

			getAllUsers : function () {
				console.log('dao.getUsers');
				var promise = util.getAjaxAsync('jsonApi/user/all');
				promise.fail(util.showNgMsg);
				return promise.then(util.showOkMsg);
			},

			getAllProgress : function () {
				console.log('dao.getUsers');
				var promise = util.getAjaxAsync('jsonApi/progress/all');
				promise.fail(util.showNgMsg);
				return promise.then(util.showOkMsg);
			},

			getAllSubsystems : function () {
				console.log('dao.getSubsystems');
				var promise = util.getAjaxAsync('jsonApi/subsystem/all');
				promise.fail(util.showNgMsg);
				return promise.then(util.showOkMsg);
			},

			login : function (formValue) {
				console.log('dao.login');
				var promise = util.postAjaxAsync('jsonApi/auth/login', formValue);
				promise.fail(util.showNgMsg);
				return promise.then(util.showOkMsg);
			},

			logout : function () {
				console.log('dao.logout');
				var promise = util.getAjaxAsync('jsonApi/auth/logout');
				promise.fail(util.showNgMsg);
				return promise.then(util.showOkMsg);
			},

			checkLogin : function () {
				console.log('dao.checkLogin');
				var promise = util.getAjaxAsync('jsonApi/auth/checkLogin');
				promise.fail(util.showNgMsg);
				return promise.then(util.showOkMsg);
			}

		};
	};
})(jQuery);