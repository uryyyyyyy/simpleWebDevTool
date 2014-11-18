
simpleWebDevTool.util.convertPlainTextToHtml = function(text) {
	'use strict';
	return text.replace(/\r?\n/g, '<br />');
};