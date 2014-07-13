/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.util.getAjaxAsync = function(url, serviceData, callback) {
    console.log('getAjaxAsync url:' + url);
    $.ajax({
        type: 'GET',
        url: url,
        async: true
    }).done(function(data) {
        console.log('success');
        console.log(data);
        //simpleWebDevTool.util.dummyWait(1000);
        serviceData.data = data;
        callback();
    }).fail(function() {
        console.error('error');
    });
};

simpleWebDevTool.util.putAjaxAsync = function(url, serviceData, reqData, callback) {
    console.log('putAjaxAsync url:' + url);
    $.ajax({
        type: 'POST',
        url: url,
        async: true,
        data: reqData
    }).done(function(data) {
        console.log('success');
        console.log(data);
        //simpleWebDevTool.util.dummyWait(1000);
        serviceData.data = data;
        callback();
    }).fail(function() {
        console.error(reqData);
    });
};