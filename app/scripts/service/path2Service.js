/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.service.path2Service = function(){
    var serviceName = 'path2Service';
    var dao2 = simpleWebDevTool.dao.path2Dao();
    var serviceData = {};

    return {
        func1 : function(){
            console.log('func1 ' + serviceName);
            serviceData.data = _.map(serviceData.data, function(num) { return num + 1; });
            controller.refresh();
        },

        func2 : function(){
            console.log('func2 '  + serviceName);
            serviceData.data = _.filter(serviceData.data, function(num) { return num % 2 === 0; });
            controller.refresh();
        },
        save : function(data){
            console.log('save '  + serviceName);
            dao2.save(serviceData, data);
        },

        load : function(){
            console.log('load '  + serviceName);
            dao2.load(serviceData);
        },

        refresh : function(){
            console.log('refresh '  + serviceName);
            return serviceData.data;
        }
    };
};