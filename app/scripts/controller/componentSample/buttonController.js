
simpleWebDevTool.controller.componentSample.buttonController = function(){
	'use strict';
	console.log('initialize controller');

	//import modules
	var component = simpleWebDevTool.component;
	var service = simpleWebDevTool.service.componentSample.buttonService();

	//set components
	var sampleButton = component.button('#sample_button');
	var sampleFileForm = component.FileForm('#sample_file');

	//create private method
	var _import = function(e){
		service.import();
	};

	//attach eventHandlers
	sampleButton.attachClickEvent(_import);

	//initialize

};