
simpleWebDevTool.controller.componentSample.dialogController = function(){
	'use strict';
	console.log('initialize controller');

	//import modules
	var component = simpleWebDevTool.component;
	var service = simpleWebDevTool.service.componentSample.buttonService();

	//set components
	var modalButton = component.button('#modal_button');

	//create private method
	var _import = function(e){
		component.modalDialog('componentSample/dialog/content');
		simpleWebDevTool.controller.componentSample.sampleController();
	};

	//attach eventHandlers
	modalButton.attachClickEvent(_import);

	//initialize

};