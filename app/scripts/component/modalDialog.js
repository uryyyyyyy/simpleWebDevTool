
simpleWebDevTool.component.modalDialog = function(htmlPath) {
	'use strict';
	var $select = $('#myModal');

	var options = {
		keyboard : true,
		show:true
	};

	$('#myModal').modal(options);
	$('#myModal').html(_.template(simpleWebDevTool.util.render(htmlPath)));
	$('#myModal').draggable({handle: '.modal-header'});

};