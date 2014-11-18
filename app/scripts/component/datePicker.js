
simpleWebDevTool.component.datePicker = function(selector) {
	'use strict';
	var $select = $(selector);

	$select.datepicker({
		dateFormat: 'yy/mm/dd'
//		minDate: new Date(),
//		maxDate: '+0d',
	});
	$select.datepicker('setDate', Date.now());

	var _setDate = function(date){
		$select.datepicker('setDate', date);
	};

	var _getDate = function(){
		var d = $select.datepicker('getDate');
		if(d === null){
			return null;
		}else{
			return d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate();
		}
	};

	return {
		getDate : _getDate,
		setDate : _setDate
	};
};