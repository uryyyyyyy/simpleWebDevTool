
simpleWebDevTool.component.FilesForm = function(selector) {
	'use strict';
	var $select = $(selector);

	var _getFiles = function() {
		var files = $select[0].files;
		if(files[0]) {
			var fd = new FormData();
			_.forEach(files, function(file){
				fd.append(file.id, file );
			});
			return fd;
		}
	};

	return {
		clickEStream : $select.asEventStream('click'),
		changeEStream : $select.asEventStream('change'),
		getFiles: _getFiles
	};
};