/**
 * Created by shiba on 14/07/13.
 */

'use strict';

// this function is cache, you don't need to change
simpleWebDevTool.util.getAjaxSyncWithCache = function(keyUrl) {
    var cache = [];
    if ( !cache[keyUrl] ) {
        $.ajax({
            type: 'GET',
            url: keyUrl,
            async: false
        }).done(function(data) {
            console.log('success');
            console.log(data);
            //simpleWebDevTool.util.dummyWait(1000);
            cache[keyUrl] = data;
        }).fail(function() {
            console.error('error');
        });
    }
    return cache[keyUrl];
};
//postAjaxSyncWithCache is no-meaning
