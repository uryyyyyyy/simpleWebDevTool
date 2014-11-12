
simpleWebDevTool.controller.jqueryController = function(optionId){
	'use strict';
	var id = Number(optionId);
	var component = simpleWebDevTool.component;
	var service = simpleWebDevTool.service.mainService();
	var jsTree = component.jstree('#jstree_demo');
	var slickGrid = component.slickGrid('#myGrid');
	var tinyMce = component.tinyMce('#editable');
	var tinyMceTitle = component.tinyMceTitle('#editable_title');
	var simpleForm = component.sampleForm('#sampleForm');
	var jsTreeSearchFrom = component.sampleForm('#jstree_text');
	var textArea = $('#text');
	var sampleList = component.sampleList('#list');
	var sampleList2 = component.sampleList('#list2');
	var select2 = component.basicSelector('#basicSelect');
	var select2Multi = component.multiSelector('#multiSelect');
	var sampleBox = component.sampleBox('#box');
	var floating = component.sampleFloat('#float_');
	var mergely = component.mergely('#compare');
	var addButton = component.sampleButton('#addButton');
	var searchButton = component.sampleButton('#searchButton');
	var addElemButton = component.sampleButton('#addElemButton');
	var demoCreateButton = component.sampleButton('#demoCreateButton');
	var demoRenameButton = component.sampleButton('#demoRenameButton');
	var demoDeleteButton = component.sampleButton('#demoDeleteButton');

	sampleList.clickEStream.assign(function(val) {
		console.log('sampleList.clickEStream');
		simpleForm.refresh('click the 1st list ' + val + 'th');
	});

	sampleList2.clickEStream.assign(function(val) {
		console.log('sampleList2.clickEStream');
		simpleForm.refresh('click the 2nd list ' + val + 'th');
	});

	jsTree.clickEStream.assign(function() {
		var node = jsTree.getSelectNode();
		jsTreeSearchFrom.refresh(node);
	});

	select2.clickEStream.assign(function() {
		var data = select2.getSelectedData();
		_refresh({textData:JSON.stringify(data)});
	});

	select2Multi.clickEStream.assign(function() {
		var data = select2Multi.getSelectedData();
		_refresh({textData:JSON.stringify(data)});
	});

	addButton.clickEStream.assign(function() {
		console.log('addButton');
		var addStr = simpleForm.getValue();
		var listElems = sampleList.getList();
		listElems = service.add(listElems, addStr);
		_refresh({ listData: listElems});
	});

	searchButton.clickEStream.assign(function() {
		console.log('searchButton');
		var listElems = service.search(sampleList.getList(), simpleForm.getValue());
		_refresh({ listData: listElems});
		slickGrid.filterAndUpdate(Number(simpleForm.getValue()));
	});

	addElemButton.clickEStream.assign(function() {
		console.log('addElemButton');
		var listElems = service.addElem(sampleList.getList(), simpleForm.getValue());
		_refresh({ listData: listElems});
	});

	demoCreateButton.clickEStream.assign(function() {
		jsTree.demoCreate();
	});

	demoRenameButton.clickEStream.assign(function() {
		jsTree.demoRename();
	});

	demoDeleteButton.clickEStream.assign(function() {
		jsTree.demoDelete();
	});

	jsTreeSearchFrom.keyUpEStream.assign(function() {
		jsTree.search(jsTreeSearchFrom.getValue());
	});

	var _refresh = function(){
		var refreshData = arguments;
		console.log('refresh');
		var tmp = _.cloneDeep(refreshData);

		sampleList.refresh(arguments[0]);
		sampleList2.refresh(arguments[0]);
		jsTree.refresh(arguments[1]);
		slickGrid.refresh(arguments[2]);
		select2.refresh(arguments[3]);
		select2Multi.refresh(arguments[3]);
		sampleBox.refresh(arguments[0]);
		tinyMce.refresh(arguments[4]);
		tinyMceTitle.refresh(arguments[4]);
		mergely.refresh(arguments[4]);
	};

	console.log('load');
	service.load(id).then(_refresh);
};