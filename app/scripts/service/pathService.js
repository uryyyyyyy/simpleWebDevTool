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
            serviceData.data =  _.map(serviceData.data, function(num) { return num + 3; });
            controller.refresh();
        },

        func2 : function(){
            console.log('func2 '  + serviceName);
            serviceData.data = _.filter(serviceData.data, function(num) { return num % 2 === 1; });
            controller.refresh();
        },

        search : function(searchStr){
            console.log('func2 '  + serviceName);
            serviceData.str = searchStr;
            serviceData.data = _.filter(serviceData.data, function(num) { return num == searchStr; });
            controller.refresh();
        },

        load : function(){
            console.log('load '  + serviceName);
            dao.load(serviceData);
            console.log(serviceData);
        },

        getData : function(){
            console.log('refresh '  + serviceName);
            return serviceData;
        }
    };
};