cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label,
        },
    },

    updateItem: function(info) {
        this.label.string = info.msg;
    }
});