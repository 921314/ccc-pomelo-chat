"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'HelloWorld');
// Script/HelloWorld.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.label.string = this.text;
        cc.log("pomelo.init");
        pomelo.init({
            host: "127.0.0.1",
            port: 3014,
            log: true
        }, function () {
            cc.log("?!!!");
            var route = 'gate.gateHandler.queryEntry';
            pomelo.request(route, {
                uid: "kell"
            }, function (data) {
                if (data.code === 500) {
                    cc.log("login fail : 500");
                    return;
                }
                // callback(data.host, data.port);
                cc.log("to server");
                pomelo.init({
                    host: data.host,
                    port: data.port,
                    log: true
                }, function () {
                    var route = "connector.entryHandler.enter";
                    pomelo.request(route, {
                        username: "kell",
                        rid: 1
                    }, function (data) {
                        cc.log('data');
                        cc.log(data);
                        console.log(data);
                    });
                });
            });
        });
    },

    // called every frame
    update: function update(dt) {}
});

cc._RF.pop();