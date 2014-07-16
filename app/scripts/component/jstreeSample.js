/**
 * Created by shiba on 14/07/14.
 */

'use strict';

simpleWebDevTool.component.jstree = function(selector) {

    var returnObj = {};
    var currentData = {};
    var treeDom = $(selector);

    returnObj.search = function(str){
        treeDom.jstree(true).search(str);
    };

    returnObj.getSelectNode= function () {
        return treeDom.jstree(true).get_selected();
    };

    returnObj.demo_create= function () {
        var ref = treeDom.jstree(true),
            sel = ref.get_selected();
        if (!sel.length) {
            return false;
        }
        sel = sel[0];
        sel = ref.create_node(sel, {"type": "file"});
        if (sel) {
            ref.edit(sel);
        }
    };

    returnObj.demo_rename= function () {
        var ref = treeDom.jstree(true),
            sel = ref.get_selected();
        if (!sel.length) {
            return false;
        }
        sel = sel[0];
        ref.edit(sel);
    };

    returnObj.demo_delete= function () {
        var ref = treeDom.jstree(true),
            sel = ref.get_selected();
        if (!sel.length) {
            return false;
        }
        ref.delete_node(sel);
    };

    returnObj.refresh= function (newData) {
        if(!_.isEqual(newData, currentData)){
            console.log('jstree refresh');
            currentData = _.cloneDeep(newData);
            treeDom.jstree({
                    "core": {
                        "animation": 0,
                        "check_callback": true,
                        "themes": { "stripes": true },
                        'data': [
                            { "id": "node_1", "text": "Root node",
                                "children" : [
                                    { "id": "node_1_1", "text" : "Child 1" },
                                    { "id": "node_1_2", "text" : "Child 2"}
                                ]
                            },
                            { "id": "node_2", "text": "Root node with options",
                                "state": { "opened": true, "selected": true },
                                "children": [
                                    { "id": "node_2_1", "text": "Child A" },
                                    { "id": "node_2_2", "text": "Child B"}
                                ]
                            }
                        ]
                    },
                    "types": {
                        "#": { "max_children": 1, "max_depth": 4, "valid_children": ["root"] },
                        "root": { "icon": "/static/3.0.2/assets/images/tree_icon.png", "valid_children": ["default"] },
                        "default": { "valid_children": ["default", "file"] },
                        "file": { "icon": "glyphicon glyphicon-file", "valid_children": true }
                    },
                    "plugins": [ "contextmenu", "dnd", "search", "state", "types", "wholerow" ]
                });
        }
    };

    return returnObj;
};