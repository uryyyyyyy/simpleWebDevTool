
simpleWebDevTool.component.FileForm = function(selector) {
	'use strict';
	var $select = $(selector);

	var _getFile = function() {
		var file = $select[0].files[0];
		if(file) {
			var fd = new FormData();
			fd.append( 'file', file );
			return fd;
		}
	};

	return {
		getFile: _getFile
	};
};