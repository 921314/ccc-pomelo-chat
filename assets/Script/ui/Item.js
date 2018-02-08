cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        button: {
            default: null,
            type: cc.Button,
        },
        itemID: 0,
        itemName: "",
        callback: null,
    },

    setEnabled: function(bl) {
        cc.log("setEnabled", bl);
        this.button.interactable = bl;
    },

    onItemClicked() {
        if (this.callback) {
            this.callback(this);
        }
    },
    
    onLoad: function () {
        // this.node.enableAutoGrayEffect = false;
        // this.node.on('touchend', function () {
        //     if (this.callback) {
        //         this.callback(this);
        //     }
        //     // console.log("Item " + this.itemID + ' clicked');
        // }, this);
    },

    updateItem: function(idx, name) {
        this.itemID = idx;
        this.itemName = name;
        this.label.string = name + '(' + idx + ')';
    },

    setClickCallback: function(cb) {
        this.callback = cb;
    },

    getName: function() {
        return this.itemName;
    },

    getID: function() {
        return this.itemID;
    }
});
