
simpleWebDevTool.component.form = function(selector) {
	'use strict';
	var currentData = {};
	var $select = $(selector);

	var _attachKeyUpEvent = function(callback){
		$select.on('keyup', function (e) {
			callback(e);
		});
	};

//	form.validate();

	return {
		refresh : function(newData){
			$select.val(newData);
		},

		getValue : function(){
			return $select.val();
		},

		attachKeyUpEvent : _attachKeyUpEvent
	};
};