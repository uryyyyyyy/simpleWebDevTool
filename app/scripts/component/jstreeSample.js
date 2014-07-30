/**
 * Created by shiba on 14/07/14.
 */

simpleWebDevTool.component.jstree = function(selector) {
    'use strict';
    var currentData = {};
    var $select = $(selector);

    return {
        search : function(str){
            $select.jstree(true).search(str);
        },

        getSelectNode : function () {
            return $select.jstree(true).get_selected();
        },

        demoCreate : function () {
            var ref = $select.jstree(true),
                sel = ref.get_selected();
            if (!sel.length) {
                return false;
            }
            sel = sel[0];
            sel = ref.create_node(sel, {"type": "file"});
            if (sel) {
                ref.edit(sel);
            }
        },

        demoRename : function () {
            var ref = $select.jstree(true),
                sel = ref.get_selected();
            if (!sel.length) {
                return false;
            }
            sel = sel[0];
            ref.edit(sel);
        },

        demoDelete : function () {
            var ref = $select.jstree(true),
                sel = ref.get_selected();
            if (!sel.length) {
                return false;
            }
            ref.delete_node(sel);
        },

        refresh : function (newData) {
            if((!_.isEqual(newData, currentData) && newData)){
                console.log('jstree refresh');
                currentData = _.cloneDeep(newData);
                $select.jstree({
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
        },

        clickEStream : $select.asEventStream("click")
    }
};