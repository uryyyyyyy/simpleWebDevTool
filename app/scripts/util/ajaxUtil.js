/**
 * Created by shiba on 14/07/13.
 */

'use strict';
simpleWebDevTool.cache.ajaxCache = {};

simpleWebDevTool.util.getAjaxAsync = function(url) {
    console.log('getAjaxAsync url:' + url);
    var ajaxCache = simpleWebDevTool.cache.ajaxCache;
    if (!ajaxCache[url]) {
        $.ajax({
            type: 'GET',
            url: url,
            async: true
        }).done(function (data) {
            console.log('success');
            console.log(data);
            //simpleWebDevTool.util.dummyWait(1000);
            ajaxCache[url] = data;
        }).fail(function () {
            console.error('error');
        });
    }
    return ajaxCache[url];
};

simpleWebDevTool.util.putAjaxAsync = function(url, reqData, callback) {
    console.log('putAjaxAsync url:' + url);
    var returnObj = {};
    $.ajax({
        type: 'POST',
        url: url,
        async: true,
        data: reqData
    }).done(function(data) {
        console.log('success');
        console.log(data);
        //simpleWebDevTool.util.dummyWait(1000);
        returnObj = data;
        callback();
    }).fail(function() {
        console.error(reqData);
    });
    return returnObj;
};