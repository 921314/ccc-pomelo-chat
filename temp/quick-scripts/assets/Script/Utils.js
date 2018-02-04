(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Utils.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd49f42z8oZMwK9iOdzPPd3p', 'Utils', __filename);
// Script/Utils.js

"use strict";

function printObj(obj) {
    var description = "";
    cc.log('obj : {');
    for (var i in obj) {
        description += i + " = " + obj[i] + "\n";
    }
    cc.log(description);
    cc.log('}');
}

module.exports = {
    printObj: printObj
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
        //# sourceMappingURL=Utils.js.map
        