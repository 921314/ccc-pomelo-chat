"use strict";
cc._RF.push(module, 'd49f42z8oZMwK9iOdzPPd3p', 'Utils');
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