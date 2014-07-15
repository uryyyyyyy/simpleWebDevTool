/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.controller.vueController = function(){
    var controllerName = 'vueController';
    var service = simpleWebDevTool.service.mainService();
    var vue = new Vue({
        el: '#template',
        data: {
            texts: ['# hello'],
            list: []
        }
    });

    tinymce.init({
        selector: 'h1.editable',
        inline: true,
        toolbar: 'undo redo',
        menubar: false
    });

    tinymce.init({
        selector: 'div.editable',
        inline: true,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste'
        ],
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
    });

    $('div.editable').keyup(function () {
        controller.refer();
    });

    var returnObj = {};

    returnObj.add = function(){
        console.log('func1 ' + controllerName);
        var addStr = $('#sampleForm').val();
        service.add(addStr);
        controller.refresh();
        console.log('func1 done');
    };

    returnObj.search = function(){
        console.log('search '  + controllerName);
        var searchStr = $('#sampleForm').val();
        service.search(searchStr);
        controller.refresh();
        console.log('search done');
    };

    returnObj.addElem = function(){
        console.log('search '  + controllerName);
        var searchStr = $('#sampleForm').val();
        service.addElem(searchStr);
        controller.refresh();
        console.log('search done');
    };

    returnObj.init = function(){
        //simpleWebDevTool.util.countStart();
        console.log('init '  + controllerName);
        service.load();
        //simpleWebDevTool.util.timeShow();
    };

    returnObj.refer = function(){
        var str = $('div.editable').html();
        service.refer(str);
        controller.refresh();
    };

    returnObj.refresh = function() {
        var data = service.getData();
        vue.list = data.data;
        vue.texts = [data.refHtml];
    };
    return returnObj;
};