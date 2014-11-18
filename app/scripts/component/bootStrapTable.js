
simpleWebDevTool.component.bootStrapTable = function(selector) {
	'use strict';
	var util = simpleWebDevTool.util;

	var $select = $(selector).bootstrapTable({
		data: []
	});

	var _refresh = function(data){
		$select.bootstrapTable('load', data);
	};

	var _attachClickRowEvent = function(callback){
		$select.on('click-row.bs.table', function (e, row, $element) {
			callback(e, row, $element);
		});
	};

	var _add = function(row){
		var currentData = _getData();
		var newData = _.union(currentData, [row]);
		$select.bootstrapTable('load', newData);
	};

	var _getData = function(){
		return $select.bootstrapTable('getData');
	};

	return {
		attachClickRowEvent : _attachClickRowEvent,
		refresh: _refresh,
		add: _add,
		getData: _getData
	};
};