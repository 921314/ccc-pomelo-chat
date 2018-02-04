(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/ui/Item.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2d8a6XkeMNJeJShiVCTao7q', 'Item', __filename);
// Script/ui/Item.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        button: {
            default: null,
            type: cc.Button
        },
        itemID: 0,
        itemName: "",
        callback: null
    },

    setEnabled: function setEnabled(bl) {
        cc.log("setEnabled", bl);
        this.button.interactable = bl;
    },

    onItemClicked: function onItemClicked() {
        if (this.callback) {
            this.callback(this);
        }
    },


    onLoad: function onLoad() {
        // this.node.enableAutoGrayEffect = false;
        // this.node.on('touchend', function () {
        //     if (this.callback) {
        //         this.callback(this);
        //     }
        //     // console.log("Item " + this.itemID + ' clicked');
        // }, this);
    },

    updateItem: function updateItem(idx, name) {
        this.itemID = idx;
        this.itemName = name;
        this.label.string = name + '(' + idx + ')';
    },

    setClickCallback: function setClickCallback(cb) {
        this.callback = cb;
    },

    getName: function getName() {
        return this.itemName;
    },

    getID: function getID() {
        return this.itemID;
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Item.js.map
        