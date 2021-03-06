
var simpleWebDevTool = {};
simpleWebDevTool.controller = {};
simpleWebDevTool.controller.componentSample = {};
simpleWebDevTool.views = {};
simpleWebDevTool.service = {};
simpleWebDevTool.service.componentSample = {};
simpleWebDevTool.dao = {};
simpleWebDevTool.util = {};
simpleWebDevTool.cache = {};
simpleWebDevTool.component = {};

jQuery(function() {
	'use strict';
	var app = Sammy('#SimpleWebDevTool', function(app) {
		// define a 'get' route that will be triggered at '#/path'
		app.get('#/jquery/:id', function(context) {
			console.log('access to #/jquery');
			$('#template').html(_.template(simpleWebDevTool.util.render('jqueryTemplate')));
			simpleWebDevTool.controller.jqueryController(context.params.id);
		});
		app.get('#/editor', function(context) {
			console.log('access to #/editor');
			$('#template').html(_.template(simpleWebDevTool.util.render('editorTemplate')));
			simpleWebDevTool.controller.editorController();
		});

		app.get('#/component/button', function(context) {
			console.log('#/component/button');
			$('#template').html(_.template(simpleWebDevTool.util.render('componentSample/buttonTemplate')));
			simpleWebDevTool.controller.componentSample.buttonController();
		});
		app.get('#/component/jsTree', function(context) {
			console.log('#/component/jsTree');
			$('#template').html(_.template(simpleWebDevTool.util.render('componentSample/jsTreeTemplate')));
			simpleWebDevTool.controller.componentSample.jsTreeController();
		});
		app.get('#/component/dialog', function(context) {
			console.log('#/component/dialog');
			$('#template').html(_.template(simpleWebDevTool.util.render('componentSample/dialogTemplate')));
			simpleWebDevTool.controller.componentSample.dialogController();
		});
		app.get('#/component/ckEditor', function() {
			console.log('#/component/ckEditor');
			$('#template').html(_.template(simpleWebDevTool.util.render('componentSample/ckEditorTemplate')));
			simpleWebDevTool.controller.componentSample.ckEditorController();
		});

		app.notFound = function(context) {
			console.log('access to #');
			$('#template').html(_.template(simpleWebDevTool.util.render('homeTemplate')));
		}
	});
	app.run();
	simpleWebDevTool.controller.globalController();
});
