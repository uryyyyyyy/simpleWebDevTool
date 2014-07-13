/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.controller.path2Controller = function(){
    var hoge = 'path2Controller';
    return {
        func1 : function(){
            console.log('func1 ' + hoge);
        },

        func2 : function(){
            console.log('func2 '  + hoge);
        }
    };
};