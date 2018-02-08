"use strict";
cc._RF.push(module, 'd9ee75QB0BAfrX8vkdinf5H', 'ListViewCtrl');
// Script/ui/ListViewCtrl.js

'use strict';

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
        btnRemoveItem: cc.Button
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

    addItem: function addItem(name) {
        var i = this.curCount + 1;
        var item = cc.instantiate(this.itemTemplate);
        this.content.addChild(item);
        item.setPosition(0, -item.height * (0.5 + i - 1) - this.spacing * (i + 1));
        cc.log(-item.height * (0.5 + i) - this.spacing * (i + 1));
        var comp = item.getComponentInChildren('Item');
        if (comp) {
            comp.updateItem(i, name);
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

    addOneItem: function addOneItem() {
        var len = RoomInfo.players.length;
        cc.log("addOneItem", len);
        var tmp = {};
        tmp.name = "name" + (len + 1);
        RoomInfo.players.push(tmp);
        this.refreshList();
    },

    subOneItem: function subOneItem() {
        var len = RoomInfo.players.length;
        cc.log("subOneItem", len);
        RoomInfo.players.pop();

        this.refreshList();
    },

    scrollToFixedPosition: function scrollToFixedPosition() {
        this.scrollView.scrollToOffset(cc.p(0, 500), 2);
    },

    refreshList: function refreshList() {
        cc.log('refreshList', RoomInfo.players.length, this.items.length);
        for (i = 0; i < this.items.length; i++) {
            // this.items[i].visivle = false;
            // this.content.removeChild(this.items[i]);
            var item = this.items[i];
            item.active = false;
        }
        this.items = [];
        this.curCount = 0;
        this.totalCount = 0;
        var self = this;
        var cb = function cb(sender) {
            cc.log(sender.getID(), sender.getName(), sender.interactable);
            if (self.lastItem) {
                self.lastItem.setEnabled(true);
            }
            sender.setEnabled(false);
            self.lastItem = sender;

            RoomInfo.targetName = sender.getName();
            self.chatRoot.getComponent("Chat").setTargetName(sender.getName());
        };
        for (i = 0; i < RoomInfo.players.length; i++) {
            var name = RoomInfo.players[i].name;
            cc.log(name, this.items[i]);
            if (!this.items[i]) {
                this.addItem(name);
                var comp = this.items[i].getComponentInChildren('Item');
                if (comp) {
                    comp.setClickCallback(cb);
                }
            } else {
                var comp = this.items[i].getComponentInChildren('Item');
                if (comp) {
                    comp.updateItem(i + 1, name);
                }
                this.items[i].active = true;
            }
        }
    }
});

cc._RF.pop();