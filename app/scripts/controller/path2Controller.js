/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.controller.path2Controller = function(){
    var controllerName = 'path2Controller';
    var controllerData = {};
    var service = simpleWebDevTool.service.path2Service();
    var refresh = function() {
        $('#template').html(_.template(simpleWebDevTool.views._render('template2'), { 'people': controllerData}));
    };

    return {
        func1 : function(){
            console.log('func1 ' + controllerName);
            controllerData = service.func1(controllerData);
            refresh();
        },

        func2 : function(){
            console.log('func2 '  + controllerName);
            controllerData = service.func2(controllerData);
            refresh();
        },
        init : function(){
            console.log('init '  + controllerName);
            controllerData = service.load();
            refresh();
        }
    };
};