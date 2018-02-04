(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/ui/ChatListViewCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e86edJuNVxOUpdCS9g8BrTv', 'ChatListViewCtrl', __filename);
// Script/ui/ChatListViewCtrl.js

'use strict';

var Utils = require('Utils');
var RoomInfo = require('RoomInfo');
cc.Class({
    extends: cc.Component,

    properties: {
        itemTemplate: { // item template to instantiate other items
            default: null,
            type: cc.Node
        },
        scrollView: {
            default: null,
            type: cc.ScrollView
        },
        chatRoot: {
            default: null,
            type: cc.Node
        },
        totalCount: 0,
        spacing: 0,
        lastItem: null,
        btnAddItem: cc.Button,
        btnRemoveItem: cc.Button,
        itemScript: "ChatItem"
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.content = this.scrollView.content;
        this.items = []; // array to store spawned items
        this.initialize();
        this.updateTimer = 0;
        this.updateInterval = 0.2;
        this.lastContentPosY = 0; // use this variable to detect if we are scrolling up or down
        this.curCount = 0;
    },

    initialize: function initialize() {
        this.content.height = this.totalCount * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
    },

    getPositionInView: function getPositionInView(item) {
        // get item position in scrollview's node space
        var worldPos = item.parent.convertToWorldSpaceAR(item.position);
        var viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },

    addItem: function addItem(info) {
        var i = this.curCount + 1;
        var item = cc.instantiate(this.itemTemplate);
        this.content.addChild(item);
        item.setPosition(0, -item.height * (0.5 + i - 1) - this.spacing * (i + 1));
        cc.log(-item.height * (0.5 + i) - this.spacing * (i + 1));
        var comp = item.getComponentInChildren(this.itemScript);
        if (comp) {
            comp.updateItem(info);
        }
        this.items.push(item);

        this.curCount = this.curCount + 1;
        this.content.height = this.curCount * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
        this.totalCount = this.curCount;
    },

    removeItem: function removeItem() {
        if (this.curCount <= 0) {
            return;
        }
        var i = this.curCount;
        var item = this.items.pop();
        this.content.removeChild(item);

        this.curCount = this.curCount - 1;
        this.content.height = this.curCount * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
        this.totalCount = this.curCount;
    },

    addOneItem: function addOneItem(sender, msg) {
        cc.log("addOneItem", sender, msg);
        var tmp = {};
        if (msg) {
            tmp.msg = msg;
        } else {
            tmp.msg = "?>!!?!?!?!?!??!";
        }
        RoomInfo.chatLogs.push(tmp);
        this.refreshList();
    },

    subOneItem: function subOneItem() {
        var len = RoomInfo.chatLogs.length;
        RoomInfo.chatLogs.pop();

        this.refreshList();
    },

    scrollToFixedPosition: function scrollToFixedPosition() {
        this.scrollView.scrollToOffset(cc.p(0, 500), 2);
    },

    refreshList: function refreshList() {
        var logList = RoomInfo.chatLogs;
        for (i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            item.active = false;
        }
        this.items = [];
        this.curCount = 0;
        this.totalCount = 0;
        var self = this;

        for (i = 0; i < logList.length; i++) {
            var info = logList[i];
            if (!this.items[i]) {
                this.addItem(info);
            } else {
                var comp = this.items[i].getComponentInChildren(self.itemScript);
                if (comp) {
                    comp.updateItem(info);
                }
                this.items[i].active = true;
            }
        }
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
        //# sourceMappingURL=ChatListViewCtrl.js.map
        