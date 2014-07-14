/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.controller.jqueryController = function(){
    var controllerName = 'jqueryController';
    var service = simpleWebDevTool.service.mainService();

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
        bindData.sampleForm = $('#sampleForm').val();
    });

    var bindData = {};



    watch(bindData, "sampleForm", function (id,oldval,newval) {
        console.info(
                "bindData." + id + " は " +
                oldval + " から " +
                newval + " に変更されました"
        );
    });


    return {
        jstree : simpleWebDevTool.util.jstree('#jstree_demo'),

        add : function(){
            console.log('func1 ' + controllerName);
            var addStr = $('#sampleForm').val();
            service.add(addStr);
            controller.refresh();
            console.log('func1 done');
        },
        search : function(){
            console.log('search '  + controllerName);
            var searchStr = $('#sampleForm').val();
            service.search(searchStr);
            controller.refresh();
            console.log('search done');
        },

        addElem : function(){
            console.log('search '  + controllerName);
            var searchStr = $('#sampleForm').val();
            service.addElem(searchStr);
            controller.refresh();
            console.log('search done');
        },




        init : function(){
            //simpleWebDevTool.util.countStart();
            console.log('init '  + controllerName);
            service.load();
            //simpleWebDevTool.util.timeShow();
        },
        refer : function(){
            var str = $('div.editable').html();
            service.refer(str);
            controller.refresh();
        },
        refresh : function() {
            var data = service.getData();
            $('#list').empty();
            _.forEach(data.data, function(elem){
                $('#list').append('<li>'+ elem + '</li>');
            });
            $('#text').text(data.refHtml);
        }
    };
};