/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.service.pathService = function(){
    var serviceName = 'pathService';
    var dao = simpleWebDevTool.dao.pathDao();
    var serviceData = {};

    return {
        add : function(addStr){
            console.log('func1 ' + serviceName);
            serviceData.data =  _.map(serviceData.data, function(num) { return num + Number(addStr); });
        },
        search : function(searchStr){
            console.log('func2 '  + serviceName);
            serviceData.str = searchStr;
            serviceData.data = _.filter(serviceData.data, function(num) { return num === Number(searchStr); });
        },

        load : function(){
            console.log('load '  + serviceName);
            dao.load(serviceData);
            console.log(serviceData);
        },

        refer : function(str){
            serviceData.refHtml = str + ' refer';
        },

        getData : function(){
            console.log('refresh '  + serviceName);
            return serviceData;
        }
    };
};