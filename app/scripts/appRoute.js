'use strict';

var controller ={};
var simpleWebDevTool = {};
simpleWebDevTool.controller = {};
simpleWebDevTool.views = {};
simpleWebDevTool.service = {};
simpleWebDevTool.dao = {};
simpleWebDevTool.util = {};

jQuery(function() {
// define a new Sammy.Application bound to the #main element selector
    var app = Sammy('#SimpleWebDevTool', function() {

        // define a 'get' route that will be triggered at '#/path'
        this.get('#/path', function() {
            controller = simpleWebDevTool.controller.pathController();
            controller.init();
        });

        this.get('#/path2', function() {
            controller = simpleWebDevTool.controller.path2Controller();
            controller.init();
        });
        this.get('#/path2/:id', function() {
            // this context is a Sammy.EventContext
            console.log(this.params.id);
        });

    });
    app.run();
});
