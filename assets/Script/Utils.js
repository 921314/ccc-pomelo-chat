
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
    printObj: printObj,
};
