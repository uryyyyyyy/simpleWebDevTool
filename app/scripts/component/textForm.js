
simpleWebDevTool.component.textForm = function(selector) {
	'use strict';
	var $select = $(selector);
	var id;

	var _getValue = function(){
		return $select.val();
	};

	var _isEnter = function(e){
		return e.keyCode === 13;
	};

	var _attachEnterEvent = function(callback){
		$select.on('keydown', function (e) {
			if(_isEnter){
				callback(e);
			}
		});
	};

	return {
		getValue : _getValue,
		attachEnterEvent : _attachEnterEvent
	};
};