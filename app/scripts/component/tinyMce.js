/**
 * Created by shiba on 14/07/15.
 */

simpleWebDevTool.component.tinyMce = function(selector) {

	'use strict';
	var currentData;
	var $select = $(selector);

	tinymce.init({
		selector: selector,
		plugins: [
			'advlist autolink lists link image charmap print preview anchor',
			'searchreplace visualblocks code fullscreen',
			'insertdatetime media table contextmenu paste'
		],
		toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
	});

	return{
		getHtml : function() {
			return $select.html();
		},

		refresh : function(data) {
			//tinyMCE.activeEditor.selection.setContent('add');
		},

		attachEOnKeyUp : function(func){
			$select.keyup(func);
		}
	};
};

simpleWebDevTool.component.tinyMceTitle = function(selector) {
	'use strict';
	var currentData;
	var $select = $(selector);
	return{
		getValue : function() {
			return $select.val();
		},

		refresh : function(data) {
			if ((!_.isEqual(currentData, data)) && data) {
				tinymce.init({
					selector: selector,
					inline: true,
					toolbar: 'undo redo',
					menubar: false
				});
				$select.val(data.mainText);
			}
		}
	};
};