'use strict';

var controller ={};
var simpleWebDevTool = {};
simpleWebDevTool.controller = {};

jQuery(function($) {
// define a new Sammy.Application bound to the #main element selector
    var app = Sammy('#SimpleWebDevTool', function() {

        // define a 'get' route that will be triggered at '#/path'
        this.get('#/path', function() {

            var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
            $("#template").html(_.template(_render('template1'), { 'people': evens}));
            controller = simpleWebDevTool.controller.pathController();
        });

        this.get('#/path2', function() {
            var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 1; });
            $("#template").html(_.template(_render('template2'), { 'people': evens}));
            controller = simpleWebDevTool.controller.path2Controller();
        });
        this.get('#/path2/:id', function() {
            // this context is a Sammy.EventContext
            console.log(this.params.id);
        });




        // this function is cache, you don't need to change
        var tmpl_cache;
        var _render = function(tmpl_name) {
            if ( !tmpl_cache ) {
                tmpl_cache = {};
            }
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

    });
    app.run();
});
