
simpleWebDevTool.controller.editorController = function(){
	'use strict';
	var id = 1;
	var component = simpleWebDevTool.component;
	var service = simpleWebDevTool.service.editorService();
	var tinyMce = component.tinyMce('#editable');
	var tinyMceTitle = component.tinyMceTitle('#editable_title');

	tinyMce.attachEOnKeyUp(function() {
		console.log('tinyMce.keyUpEStream');
		var txt = service.refer(tinyMce.getHtml());
		_refresh({ textData: txt});
	});

	var _refresh = function(refreshData){
		console.log('refresh');
		var tmp = _.cloneDeep(refreshData);
		tinyMce.refresh('add  ');
		tinyMceTitle.refresh(tmp.tinyMceData);
	};

	//initialize
	console.log('load');
	service.load().then(_refresh);
};