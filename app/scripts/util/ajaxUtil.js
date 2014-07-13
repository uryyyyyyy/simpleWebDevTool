/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.util.getAjaxAsync = function(url, callback) {
    console.log('getAjaxAsync url:' + url);
    var resData = {};
    $.ajax({
        type: 'GET',
        url: url,
        async: true
    }).done(function(data) {
        console.log('success');
        console.log(data);
        simpleWebDevTool.util.dummyWait(1000);
        resData.data = data;
        callback();
    }).fail(function() {
        console.error('error');
    });
    return resData;
};

simpleWebDevTool.util.putAjaxAsync = function(url, reqData, callback) {
    console.log('putAjaxAsync url:' + url);
    var resData = {};
    $.ajax({
        type: 'POST',
        url: url,
        async: true,
        data: reqData
    }).done(function(data) {
        console.log('success');
        console.log(data);
        simpleWebDevTool.util.dummyWait(1000);
        resData.data = data;
        callback();
    }).fail(function() {
        console.error(reqData);
    });
    return resData;
};

simpleWebDevTool.util.dummyWait = function(time) {
    var d1 = new Date().getTime();
    var d2 = new Date().getTime();
    while (d2 < d1 + time) {
        d2 = new Date().getTime();
    }
    return;
};