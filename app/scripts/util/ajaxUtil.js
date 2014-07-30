/**
 * Created by shiba on 14/07/13.
 */

simpleWebDevTool.util.getAjaxAsync = function(url) {
    'use strict';
    console.log('getAjaxAsync url:' + url);
    return $.ajax({
        type: 'GET',
        url: url,
        async: true
    });
};

simpleWebDevTool.util.postAjaxAsync = function(url, reqData) {
    'use strict';
    console.log('putAjaxAsync url:' + url);
    return $.ajax({
        type: 'POST',
        url: url,
        async: true,
        data: reqData
    });
};