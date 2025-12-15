const modeStruct = {
    init: function init(id, mode) {
        this.mode = mode;
        this.id = id;
    },

    setMode: function setMode(mode) {
        this.mode = mode;
    },

    getMode: function getMode() {
        return this.mode;
    },

    getId: function getId() {
        return this.id;
    }
};

const Modes = [
    modeStruct.init(0, "MENU"),
    modeStruct.init(1, "GAME"),
    modeStruct.init(2, "PAUSE"),
    modeStruct.init(3, "EXIT"),
]

module.exports = { modeStruct, Modes };