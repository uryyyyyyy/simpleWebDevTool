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
        search : function(){
            console.log('search '  + controllerName);
            var searchStr = $('#searchForm').val();
            service.search(searchStr);
            console.log('search done');
        },

        init : function(){
            simpleWebDevTool.util.countStart();
            console.log('init '  + controllerName);
            service.load();
            simpleWebDevTool.util.timeShow();
        },
        refresh : function() {
            var data = service.getData();
            $('#template').html(_.template(simpleWebDevTool.util.render('template1'), { 'people': data.data}));
            $('#searchPanel').text(data.str);
        }
    };
};