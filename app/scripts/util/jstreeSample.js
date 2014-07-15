/**
 * Created by shiba on 14/07/14.
 */

'use strict';

simpleWebDevTool.util.jstree = function(selector) {

    var returnObj = {};

    returnObj.demo_create= function () {
        var ref = $(selector).jstree(true),
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
        var ref = $(selector).jstree(true),
            sel = ref.get_selected();
        if (!sel.length) {
            return false;
        }
        sel = sel[0];
        ref.edit(sel);
    };

    returnObj.demo_delete= function () {
        var ref = $(selector).jstree(true),
            sel = ref.get_selected();
        if (!sel.length) {
            return false;
        }
        ref.delete_node(sel);
    };

    returnObj.refresh= function (jsData) {
        $(selector)
            .jstree({
                "core": {
                    "animation": 0,
                    "check_callback": true,
                    "themes": { "stripes": true },
                    'data': jsData
                },
                "types": {
                    "#": { "max_children": 1, "max_depth": 4, "valid_children": ["root"] },
                    "root": { "icon": "/static/3.0.2/assets/images/tree_icon.png", "valid_children": ["default"] },
                    "default": { "valid_children": ["default", "file"] },
                    "file": { "icon": "glyphicon glyphicon-file", "valid_children": true }
                },
                "plugins": [ "contextmenu", "dnd", "search", "state", "types", "wholerow" ]
            });
    };

    return returnObj;
};