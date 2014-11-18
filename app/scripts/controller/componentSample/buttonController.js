
simpleWebDevTool.controller.componentSample.buttonController = function(){
	'use strict';
	console.log('componentSample.buttonController');

	//import modules
	var component = simpleWebDevTool.component;
	var service = simpleWebDevTool.service.componentSample.buttonService();

	//set components
	var sample_button = component.button('#sample_button');
	var sampleFileForm = component.FileForm('#sample_file');

	//create private method
	var _import = function(e){
		service.import();
	};

	//attach eventHandlers
	sample_button.attachClickEvent(_import);

	//initialize

};