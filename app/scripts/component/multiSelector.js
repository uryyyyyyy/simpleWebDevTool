
simpleWebDevTool.component.multiSelector = function(selector) {
	'use strict';
	var $select = $(selector);
	var currentData = {};

	var _initialize = function(newData){
		if((!_.isEqual(currentData, newData)) && newData){
			currentData = _.cloneDeep(newData);
			$select.select2({
				data: newData,
				minimumInputLength: 1,
				multiple: true
			});
		}
	};

	//if you want selectedId -> $select.select2('val')
	var _getSelectedDataList = function(){
		return $select.select2('data');
	};

	var _setSelectedDataList = function(idList){
		$select.select2('val', idList);
	};

	return {
		initialize : _initialize,
		getSelectedDataList : _getSelectedDataList,
		setSelectedDataList : _setSelectedDataList
	};
};