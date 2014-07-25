/**
 * Created by shiba on 14/07/15.
 */

'use strict';

simpleWebDevTool.component.tinyMce = function(selector) {

    var currentData;
    var $select = $(selector);

    return{
        getHtml : function() {
            return $select.html();
        },

        refresh : function(data) {
            if((data && !_.isEqual(currentData, data))) {

                tinymce.init({
                    selector: selector,
                    inline: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table contextmenu paste'
                    ],
                    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                    image_list: data.image_list
                });
                $select.html(data.main_text);
                currentData = data;
            }
        },

        keyUpEStream : $select.asEventStream("keyup")
    };
};

simpleWebDevTool.component.tinyMceTitle = function(selector) {

    var currentData;
    return{
        getValue : function() {
            return $(selector).val();
        },

        refresh : function(data) {
            if ((!_.isEqual(currentData, data)) && data) {
                tinymce.init({
                    selector: selector,
                    inline: true,
                    toolbar: 'undo redo',
                    menubar: false
                });
                $(selector).val(data.main_text);
            }
        }
    };
};