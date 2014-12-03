
simpleWebDevTool.component.ckEditor = function(selector) {

	'use strict';
	var editor;
	var html = '';
	var $select = $(selector);

	if ( editor )
		return;
	// Create a new editor inside the <div id="editor">, setting its value to html
	var config = {};
	editor = CKEDITOR.appendTo( 'editor', config, html );

};