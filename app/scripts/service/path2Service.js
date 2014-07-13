/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.service.path2Service = function(){
    var serviceName = 'path2Service';

    return {
        func1 : function(data){
            console.log('func1 ' + serviceName);
            return  _.map(data, function(num) { return num + 1; });
        },

        func2 : function(data){
            console.log('func2 '  + serviceName);
            return  _.map(data, function(num) { return num + 2; });
        },

        load : function(){
            console.log('load '  + serviceName);
            return  _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 === 1; });
        }
    };
};