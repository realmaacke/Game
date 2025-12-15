"use strict";
import "./manager";

const modeStruct = {
    init: function init(id, mode) {
        this.mode = mode;
        this.id = id;
        return this;
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
const currentMode = null;
const Modes = [
    Object.create(modeStruct).init(0, "MENU"),
    Object.create(modeStruct).init(1, "GAME"),
    Object.create(modeStruct).init(2, "PAUSE"),
    Object.create(modeStruct).init(3, "EXIT"),
];


class renderManager extends Manager {


    init() {
        if (!currentMode) {
            currentMode = Modes.find(mode => mode.getId() === 0);
        }
        super.init();
    }

    end() {
        super.end();
    }

    draw() {
        super.draw();
    }

    update() {
        super.update();
    }

}