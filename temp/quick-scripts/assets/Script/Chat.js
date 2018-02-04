(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Chat.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2e71e14q8FK8p4cjXbaJRSI', 'Chat', __filename);
// Script/Chat.js

'use strict';

// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

var Utils = require('Utils');
var RoomInfo = require('RoomInfo');

cc.Class({
    extends: cc.Component,

    properties: {
        listRoot: {
            default: null,
            type: cc.Node
        },
        chatListRoot: {
            default: null,
            type: cc.Node
        },
        tipRoot: {
            default: null,
            type: cc.Node
        },
        tipLabel: {
            default: null,
            type: cc.Label
        },
        toUserLabel: {
            default: null,
            type: cc.Label
        },
        curUserLabel: {
            default: null,
            type: cc.Label
        },
        curInput: {
            default: null,
            type: cc.EditBox
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        //wait message from the server.
        var self = this;
        pomelo.on('onChat', function (data) {
            cc.log("onChat", data.from, data.target, data.msg);
            self.addMessage(data.from, data.target, data.msg);
            // if(data.from !== RoomInfo.myName)
            self.tip(data.from);
        });

        //update user list
        pomelo.on('onAdd', function (data) {
            var user = data.user;
            cc.log('online', user);
            var list = RoomInfo.players;
            var info = {};
            info.name = user;
            list.push(info);
            self.listRoot.getComponent("ListViewCtrl").refreshList();
        });

        //update user list
        pomelo.on('onLeave', function (data) {
            var user = data.user;
            cc.log('offline', user);
            var list = RoomInfo.players;
            var index;
            for (i = 0; i < list.length; i++) {
                var info = list[i];
                if (info.name == user) {
                    index = i;
                    break;
                }
            }
            if (index) {
                cc.log("onLeave", user, index);
                list.splice(index, 1);
            }
            self.listRoot.getComponent("ListViewCtrl").refreshList();
            if (user == RoomInfo.targetName) {
                self.tip("你的私聊对象下线了");
            }
        });

        //handle disconect message, occours when the client is disconnect with servers
        pomelo.on('disconnect', function (reason) {
            cc.log("on disconnect", reason);
        });

        this.tipRoot.active = false;

        this.curUserLabel.string = RoomInfo.myName;
        this.toUserLabel.string = "";
        cc.log("RoomInfo.targetName", RoomInfo.targetName, RoomInfo.targetName == "*");
        if (RoomInfo.targetName == "*") {
            cc.log("!!!!!");
        }
        this.setTargetName("所有人");
        //init list
        this.listRoot.getComponent("ListViewCtrl").refreshList();

        this.tip();
    },
    update: function update(dt) {},


    onBtnSendClick: function onBtnSendClick() {
        var route = "chat.chatHandler.send";
        var msg = this.curInput.string;

        var list = RoomInfo.players;
        var index;
        for (i = 0; i < list.length; i++) {
            var info = list[i];
            if (info.name == RoomInfo.targetName) {
                index = i;
                break;
            }
        }
        cc.log("RoomInfo.targetName", RoomInfo.targetName);
        cc.log(RoomInfo.targetName === '*');
        cc.log("???!@#!@#?!@#?!@?#?");
        cc.log(RoomInfo.targetName === "*");
        if (RoomInfo.targetName != "*" && !index) {
            this.tip(RoomInfo.targetName + "不在线!");
            return;
        }

        var self = this;
        var target = RoomInfo.targetName;
        var from = RoomInfo.myName;
        cc.log(RoomInfo.roomId, from, target, msg);
        if (msg !== "") {
            var reqData = {
                rid: RoomInfo.roomId,
                content: msg,
                from: from,
                target: target
            };
            Utils.printObj(reqData);
            pomelo.request(route, reqData, function (data) {
                // cc.log(data);
                Utils.printObj(data);
                self.curInput.string = "";
                if (target != '*' && target != RoomInfo.myName) {
                    self.addMessage(from, target, msg);
                }
            });
        }
    },

    addMessage: function addMessage(from, target, content) {
        var info = {};
        info.msg = from + " 对 " + target + " 说 : " + content;
        RoomInfo.chatLogs.push(info);
        this.chatListRoot.getComponent("ChatListViewCtrl").refreshList();
    },

    setTargetName: function setTargetName(toName) {
        this.toUserLabel.string = toName;
    },

    tip: function tip(msg) {
        this.tipRoot.active = true;
        if (msg) {
            this.tipLabel.string = msg;
        } else {
            this.tipLabel.string = "您有新的消息！";
        }
        var act1 = cc.fadeIn(1.0);
        var act2 = cc.fadeOut(1.0);
        var seq = cc.sequence(act1, act2);
        this.tipRoot.runAction(seq);
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
        //# sourceMappingURL=Chat.js.map
        