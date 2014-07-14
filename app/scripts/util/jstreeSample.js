/**
 * Created by shiba on 14/07/14.
 */

simpleWebDevTool.util.jstree = function(selector) {

    $(function () {
        var to = false;
        $('#demo_q').keyup(function () {
            if (to) {
                clearTimeout(to);
            }
            to = setTimeout(function () {
                var v = $('#demo_q').val();
                $(selector).jstree(true).search(v);
            }, 250);
        });

        $(selector)
            .jstree({
                "core": {
                    "animation": 0,
                    "check_callback": true,
                    "themes": { "stripes": true },
                    'data': {}//ajax
                },
                "types": {
                    "#": { "max_children": 1, "max_depth": 4, "valid_children": ["root"] },
                    "root": { "icon": "/static/3.0.2/assets/images/tree_icon.png", "valid_children": ["default"] },
                    "default": { "valid_children": ["default", "file"] },
                    "file": { "icon": "glyphicon glyphicon-file", "valid_children": true }
                },
                "plugins": [ "contextmenu", "dnd", "search", "state", "types", "wholerow" ]
            });
    });

    return {
        demo_create: function () {
            var ref = $('#jstree_demo').jstree(true),
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
        demo_rename: function () {
            var ref = $(selector).jstree(true),
                sel = ref.get_selected();
            if (!sel.length) {
                return false;
            }
            sel = sel[0];
            ref.edit(sel);
        },
        demo_delete: function () {
            var ref = $(selector).jstree(true),
                sel = ref.get_selected();
            if (!sel.length) {
                return false;
            }
            ref.delete_node(sel);
        }
    };
};