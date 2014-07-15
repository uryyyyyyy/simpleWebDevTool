/**
 * Created by shiba on 14/07/15.
 */

'use strict';

simpleWebDevTool.util.tinyMce = function(selector) {

    tinymce.init({
        selector: selector,
        inline: true,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste'
        ],
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
    });
    return{
        getHtml : function() {
            return $(selector).html();
        }
    };
};

simpleWebDevTool.util.tinyMceTitle = function(selector) {

    tinymce.init({
        selector: selector,
        inline: true,
        toolbar: 'undo redo',
        menubar: false
    });

    return{
        value : $(selector).val()
    };
};