'use strict';

var controller ={};
var simpleWebDevTool = {};
simpleWebDevTool.controller = {};
simpleWebDevTool.views = {};
simpleWebDevTool.service = {};
simpleWebDevTool.dao = {};
simpleWebDevTool.util = {};
simpleWebDevTool.cache = {};
simpleWebDevTool.component = {};


console.logBlack = function(msg){
    console.log('%c' + msg, 'color:#fff;background:#000;');
};

jQuery(function() {
// define a new Sammy.Application bound to the #main element selector
    var app = Sammy('#SimpleWebDevTool', function(app) {

        // define a 'get' route that will be triggered at '#/path'
        app.get('#/path', function() {
            $('#template').html(_.template(simpleWebDevTool.util.render('template1')));
            controller = simpleWebDevTool.controller.pathController();
            controller.init();
        });

        app.get('#/path2', function() {
            $('#template').html(_.template(simpleWebDevTool.util.render('template2')));
            controller = simpleWebDevTool.controller.path2Controller();
            controller.init();
        });
        app.get('#/vue', function() {
            console.log('access to #/vue');
            $('#template').html(_.template(simpleWebDevTool.util.render('vueTemplate')));
            controller = simpleWebDevTool.controller.vueController();
            controller.load();
        });
        app.get('#/jquery', function() {
            console.log('access to #/jquery');
            $('#template').html(_.template(simpleWebDevTool.util.render('jqueryTemplate')));
            controller = simpleWebDevTool.controller.jqueryController();
            controller.load();
        });
        app.get('#/path2/:id', function(context) {
            // this context is a Sammy.EventContext
            console.log(context.params.id);
        });

    });
    app.run();
});
