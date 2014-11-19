
simpleWebDevTool.controller.componentSample.jsTreeController = function(){
	'use strict';
	console.log('initialize controller');

	//import modules
	var component = simpleWebDevTool.component;
	var service = simpleWebDevTool.service.componentSample.jsTreeService();

	//set components
	var jsTree = component.jsTree('#jstree');
	var jsTreeFrom = component.form('#jstree_form');
	var searchFrom = component.form('#search_form');
	var createButton = component.button('#create_button');
	var renameButton = component.button('#rename_button');
	var deleteButton = component.button('#delete_button');

	//create private method

	var _refresh = function(arg){
		console.log('refresh');
		jsTree.refresh(arg);
	};

	//attach eventHandlers
	createButton.attachClickEvent(jsTree.demoCreate);
	renameButton.attachClickEvent(jsTree.demoRename);
	deleteButton.attachClickEvent(jsTree.demoDelete);

	jsTree.attachClickEvent(function() {
		var node = jsTree.getSelectNode();
		jsTreeFrom.refresh(node);
	});

	searchFrom.attachKeyUpEvent(function(e) {
		jsTree.search(searchFrom.getValue());
	});

	//initialize
	service.load().then(_refresh);


};