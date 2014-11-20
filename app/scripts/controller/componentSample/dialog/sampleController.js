
simpleWebDevTool.controller.componentSample.sampleController = function(){
	'use strict';
	console.log('initialize controller');

	//import modules
	var component = simpleWebDevTool.component;
	var service = simpleWebDevTool.service.componentSample.buttonService();

	//set components
	var sampleButton = component.button('#sample_button');

	//create private method
	var _import = function(e){
		console.log('done!');
	};

	//attach eventHandlers
	sampleButton.attachClickEvent(_import);

	//initialize

};