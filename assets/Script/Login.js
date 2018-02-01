// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

var Utils = require('Utils')

cc.Class({
    extends: cc.Component,

    properties: {
        inputIP: {
            default: null,
            type: cc.EditBox
        },
        inputPort: {
            default: null,
            type: cc.EditBox
        },
        inputName: {
            default: null,
            type: cc.EditBox
        },
        inputRoom: {
            default:null,
            type: cc.EditBox
        },
        btnEnter: {
            default: null,
            type: cc.Button,
        },
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    init () {

    },

    start () {
        
    },

    onEnterClick() {
        var ip = this.inputIP.string;
        var port = parseInt(this.inputPort.string);
        var name = this.inputName.string;
        var room = parseInt(this.inputRoom.string);
        cc.log(ip, port);
        cc.log(name, room);

        // connect
        pomelo.init({
            host: ip,
            port: port,
            log: true
        }, function() {
            cc.log("connected!!!", ip, port);
            var route = 'gate.gateHandler.queryEntry';
            cc.log("request to gateHandler");
            pomelo.request(route, {
                uid: name,
            }, function(data) {
                if (data.code === 500) {
                    cc.log("login fail : 500");
                    return;
                }
                var _ip = data.host;
                var _port = data.port;
                cc.log("get ip and port from gate : ", _ip, _port);
                pomelo.init({
                    host: _ip,
                    port: _port,
                    log: true,
                }, function() {
                    cc.log("connect to", _ip, _port);
                    var route = "connector.entryHandler.enter";
                    pomelo.request(route, {
                        username: name,
                        rid: room,
                    }, function(data) {
                        cc.log("get data");
                        Utils.printObj(data);
                    });
                })
            })
        });
    },

    // update (dt) {},
});
