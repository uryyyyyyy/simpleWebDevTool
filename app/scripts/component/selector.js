
simpleWebDevTool.component.selector = function(selector) {
	'use strict';
	var $select = $(selector);
	var currentData = {};

	var _initialize = function(newData){
		if((!_.isEqual(currentData, newData)) && newData){
			currentData = _.cloneDeep(newData);
			$select.select2({
				data: newData,
				minimumInputLength: 1
			});
		}
	};

	//if you want selectedId -> $select.select2('val')
	var _getSelectedData = function(){
		return $select.select2('data');
	};

	var _setSelectedData = function(id){
		$select.select2('val', id);
	};

	return {
		initialize : _initialize,
		getSelectedData : _getSelectedData,
		setSelectedData : _setSelectedData
	};
};