/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.controller.vueController = function(){
    var controllerName = 'vueController';
    var service = simpleWebDevTool.service.mainService;
    var vue = new Vue({
        el: '#template',
        data: {
            texts: ['# hello'],
            list: [],
            form_:''
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
        var list = service.add(vue.list, addStr);
        controller.refresh({listData : list});
        console.log('func1 done');
    };

    returnObj.search = function(){
        console.log('search '  + controllerName);
        var searchStr = $('#sampleForm').val();
        var list = service.search(vue.list, searchStr);
        controller.refresh({listData:list});
        console.log('search done');
    };

    returnObj.addElem = function(){
        console.log('search '  + controllerName);
        var searchStr = $('#sampleForm').val();
        var list = service.addElem(vue.list, searchStr);
        controller.refresh({listData:list});
        console.log('search done');
    };

    returnObj.init = function() {
        var tmp = _.cloneDeep(service.getData());
        controller.refresh(tmp);
    };

    returnObj.load = function(){
        //simpleWebDevTool.util.countStart();
        console.logBlack('init '  + controllerName);
        service.load();
        controller.init();
        //simpleWebDevTool.util.timeShow();
    };

    returnObj.refer = function(){
        var str = $('div.editable').html();
        service.refer(str);
        controller.refresh();
    };

    returnObj.refresh = function(refreshData) {
        console.logBlack('refresh');
        var tmp = _.cloneDeep(refreshData);

        vue.list = tmp.listData;
        vue.texts = tmp.textData;
    };

    return returnObj;
};