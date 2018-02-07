
function printObj(obj) {
    var description = "";
    cc.log('{');
    for (var i in obj) {
        description += i + " = " + obj[i] + "\n";
    }
    cc.log(description);
    cc.log('}');
}

module.exports = {
    printObj: printObj,
};
