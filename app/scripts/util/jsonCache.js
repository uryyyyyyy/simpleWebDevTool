/**
 * Created by shiba on 14/07/13.
 */

'use strict';

// this function is cache, you don't need to change
simpleWebDevTool.util.jsonCache = function(key) {
    var cache = [];
    if ( !cache[key] ) {
//        var tmplUrl = 'views/' + tmplName + '.html';
//        var tmplString;
//        $.ajax({
//            url: tmplUrl,
//            method: 'GET',
//            async: false,
//            dataType: 'html',
//            success: function(data) {
//                tmplString = data;
//            }
//        });
//        cache[key] = tmplString;
    }
    return cache[key];
};