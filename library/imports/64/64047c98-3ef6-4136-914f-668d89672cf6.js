"use strict";
cc._RF.push(module, '64047yYPvZBNpFPZo2JZyz2', 'ChatItem');
// Script/ui/ChatItem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        }
    },

    updateItem: function updateItem(info) {
        this.label.string = info.msg;
    }
});

cc._RF.pop();