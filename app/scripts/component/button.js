
simpleWebDevTool.component.button = function(selector) {
	'use strict';
	var $select = $(selector);

	var _attachClickEvent = function(callback){
		$select.on('click', function (e) {
			callback(e);
		});
	};

	return {
		attachClickEvent : _attachClickEvent
	};
};