/**
 * Created by shiba on 14/07/13.
 */

simpleWebDevTool.cache.ajaxCache = {};

simpleWebDevTool.util.getAjaxAsync = function(url) {
    console.log('getAjaxAsync url:' + url);
    var ajaxCache = simpleWebDevTool.cache.ajaxCache; //TODO use localStorage
    if (!ajaxCache[url]) {
        var res = $.ajax({
            type: 'GET',
            url: url,
            async: true
        });
    }
    return res;
};

simpleWebDevTool.util.getAjaxIfExist = function(url) {
    console.log('getAjaxIfExist url:' + url);
    return simpleWebDevTool.cache.ajaxCache[url];
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