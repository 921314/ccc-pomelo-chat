(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/RoomInfo.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3f1c7nGaFdH5brmBq1mpJ4/', 'RoomInfo', __filename);
// Script/RoomInfo.js

"use strict";

var players = [];
var chatLogs = [];
var roomId = 0;
var myName = "myname";
var targetName = '*';

module.exports = {
    players: players,
    roomId: roomId,
    myName: myName,
    targetName: targetName,
    chatLogs: chatLogs
};

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
        //# sourceMappingURL=RoomInfo.js.map
        