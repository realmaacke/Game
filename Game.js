"use strict";

import Interface from "./src/InterfaceManager.js";
import U_Button from "./src/components/U_Button.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Main {
    lastTime = 0;
    accumulator = 0;
    FIXED_DT = 1 / 60; // 60 updates per second

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx

        
        if (!this.canvas|| !this.ctx) {
            throw new Error("Canvas or ctx is missing, exit 0;");
        }
        
        this.resize();
        window.addEventListener("resize", () => this.resize);

        this.constructInterface();
        requestAnimationFrame(this.loop);
    }
    
    constructInterface() {
        this.interface = new Interface(this.canvas);

        const UI_ACTIONS = {
            startGame: () => console.log("Start game"),
            endGame: () => console.log("End Game"),
        };

        const fetchUI = async () => {
            await this.interface.loadInterfaceFromFile("./layout.json", UI_ACTIONS);
        }

        fetchUI();

        this.input();
    }
 
    resize = () => {
        const dpr = window.devicePixelRatio || 1;

        const rect = this.canvas.getBoundingClientRect();

        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;

        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        this.interface?.reflow();
    }

    loop = (time) => {
        if (!this.lastTime) {
            this.lastTime = time;
        }

        const delta = (time - this.lastTime) / 1000;
        this.lastTime = time;
        this.accumulator += delta;

        while (this.accumulator >= this.FIXED_DT) {
            this.update(this.FIXED_DT);
            this.accumulator -= this.FIXED_DT;
        }

        this.draw();
        requestAnimationFrame(this.loop);
    }

    update(dt) {
        if (this.interface.state === "game") {

        }

        this.interface.update(dt);

    }

    draw() {
        const ctx = this.ctx;

        ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

        ctx.setTransform(1, 0, 0, 1, 0, 0);

        this.interface.draw(ctx);
    }

    input() {
        window.addEventListener("keydown", e => {
            if (e.key === "o") {
                this.interface.layout.toggleDebug();
            }
        })
    }
}

new Main(canvas, ctx);