/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.service.pathService = function(){
    var serviceName = 'pathService';
    var dao = simpleWebDevTool.dao.pathDao();
    var serviceData = {};

    return {
        func1 : function(){
            console.log('func1 ' + serviceName);
            serviceData.load =  _.map(serviceData.load, function(num) { return num - 1; });
            controller.refresh();
        },

        func2 : function(){
            console.log('func2 '  + serviceName);
            serviceData.load = _.filter(serviceData.load, function(num) { return num % 2 === 1; });
            controller.refresh();
        },

        load : function(){
            console.log('load '  + serviceName);
            serviceData = dao.load();
            console.log(serviceData);
        },

        refresh : function(){
            console.log('refresh '  + serviceName);
            return serviceData.load;
        }
    };
};