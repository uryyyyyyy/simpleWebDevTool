
simpleWebDevTool.util.convertToSelect2 = function(rowData, convertName) {
	'use strict';
	var util = simpleWebDevTool.util;
	var renameRecursively = function(rowObject){
		_.forEach(rowObject, function(obj){
			if(_.isEmpty(obj.children)){
				rename(obj, convertName);
			}else{
				renameRecursively(obj.children);
				rename(obj, convertName);
			}
		});
	};

	var rename = function(obj, fromName){
		obj.text = obj[fromName];
		delete obj[fromName];
	};

	var createHierarchyRecursively = function(rowObject){
		_.forEach(rowObject, function(obj){
			if(obj.children){
				createHierarchyRecursively(obj.children);
				obj.children.unshift({id:obj.id, text:obj.text});
				delete obj.id;
			}
		});
	};

	var resultData = _.cloneDeep(rowData);
	renameRecursively(resultData);
	createHierarchyRecursively(resultData);
	return resultData;
};