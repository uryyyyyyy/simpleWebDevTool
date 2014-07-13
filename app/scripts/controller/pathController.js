/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.controller.pathController = function(){
    var controllerName = 'pathController';
    var service = simpleWebDevTool.service.pathService();

    return {
        func1 : function(){
            console.log('func1 ' + controllerName);
            service.func1();
            console.log('func1 done');
        },

        func2 : function(){
            console.log('func2 '  + controllerName);
            service.func2();
            console.log('func2 done');
        },
        init : function(){
            console.log('init '  + controllerName);
            service.load();
        },
        refresh : function() {
            $('#template').html(_.template(simpleWebDevTool.util.render('template1'), { 'people': service.refresh()}));
        }
    };
};