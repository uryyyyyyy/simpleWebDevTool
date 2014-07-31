
var simpleWebDevTool = {};
simpleWebDevTool.controller = {};
simpleWebDevTool.views = {};
simpleWebDevTool.service = {};
simpleWebDevTool.dao = {};
simpleWebDevTool.util = {};
simpleWebDevTool.cache = {};
simpleWebDevTool.component = {};

jQuery(function() {
    'use strict';
    var app = Sammy('#SimpleWebDevTool', function(app) {
        // define a 'get' route that will be triggered at '#/path'
        app.get('#/path', function() {
            $('#template').html(_.template(simpleWebDevTool.util.render('template1')));
            simpleWebDevTool.controller.pathController().init();
        });

        app.get('#/path2', function() {
            $('#template').html(_.template(simpleWebDevTool.util.render('template2')));
            simpleWebDevTool.controller.path2Controller().init();
        });
        app.get('#/vue/:id', function(context) {
            console.log('access to #/vue');
            $('#template').html(_.template(simpleWebDevTool.util.render('vueTemplate')));
            simpleWebDevTool.controller.vueController(context.params.id).load();
        });
        app.get('#/jquery/:id', function(context) {
            console.log('access to #/jquery');
            $('#template').html(_.template(simpleWebDevTool.util.render('jqueryTemplate')));
            simpleWebDevTool.controller.jqueryController(context.params.id).load();
        });
        app.get('#/path2/:id', function(context) {
            // this context is a Sammy.EventContext
            console.log(context.params.id);
        });

    });
    app.run();
});
