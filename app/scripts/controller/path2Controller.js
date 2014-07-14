/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.controller.path2Controller = function(){
    var controllerName = 'path2Controller';
    var service = simpleWebDevTool.service.path2Service();

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
        func3 : function(){
            var uiData = [1, 3];
            console.log('func3 '  + controllerName);
            service.save(uiData);
            console.log('func3 done');
        },
        init : function(){
            console.log('init '  + controllerName);
            service.load();
            console.log('init done');
        },
        refresh : function() {
            console.log('refresh '  + controllerName);
            var data = service.getData();
            $('#list').empty();
            _.forEach(data.data, function(elem){
                $('#list').append('<li>'+ elem + '</li>');
            });
            $('#text').text(data.refHtml);
        }
    };
};