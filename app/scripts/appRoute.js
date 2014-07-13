'use strict';

var controller ={};
var simpleWebDevTool = {};
simpleWebDevTool.controller = {};
simpleWebDevTool.views = {};
simpleWebDevTool.service = {};

// this function is cache, you don't need to change
simpleWebDevTool.views._render = function(tmpl_name) {
    var tmpl_cache = [];
    if ( ! tmpl_cache[tmpl_name] ) {
        var tmpl_url = 'views/' + tmpl_name + '.html';
        var tmpl_string;
        $.ajax({
            url: tmpl_url,
            method: 'GET',
            async: false,
            dataType: "html",
            success: function(data) {
                tmpl_string = data;
            }
        });
        tmpl_cache[tmpl_name] = tmpl_string;
    }
    return tmpl_cache[tmpl_name];
}

jQuery(function($) {
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
