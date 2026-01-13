"use strict";

import GridLayout from "./components/Grid_layout.js";
import U_Button from "./components/U_Button.js";
import U_Element from "./components/U_Element.js";
import U_Label from "./components/U_Label.js";

export default class Interface {

  constructor(canvas) {
    this.canvas = canvas;
    this.elements = [];
    this.layers = [];

    this.state = "game";
    this.mouse = { x: 0, y: 0, down: false };

    this.layout = new GridLayout(12, 8, 5);

    window.addEventListener("resize", () => this.reflow());

    canvas.addEventListener("mousemove", e => this.onMouseMove(e));
    canvas.addEventListener("mousedown", e => this.onMouseDown(e));
    canvas.addEventListener("mouseup", () => (this.mouse.down = false));
  }

  centerCol(span = 1) {
    return Math.floor((this.layout.cols - span) / 2);
  }

  centerRow(span = 1) {
    return Math.floor((this.layout.rows - span) / 2);
  }

  async loadInterfaceFromFile(url, actions, namings) {
    const res = await fetch(url);
    const data = await res.json();

    if(data.grid) {
      this.layout.cols = data.grid.cols;
      this.layout.rows = data.grid.rows;
    }

    for (const el of data.elements) {
      this.createElements(el, actions);
    }
    this.reflow();
  }

  createElements(def, actions) {
    let element;

    switch(def.type) {
      case "button":
        element = new U_Button(
          def.cell, def.text, actions[def.onClick]
        );
        break;
      
      case "label":
        element = new U_Label(
          def.cell, def.text, def.size
        );
        break;

      default:
        throw new Error(`Unknown UI element: ${def.type}, exiting 0;`);
    }

    this.add_U(element, def.state);
  }

  add_U(u_element, state = "game") {
    u_element.state = state;
    this.elements.push(u_element);
    this.reflow();
  }

  reflow() {
    for (const el of this.elements) {
      el.layout(this.layout, this.canvas);
    }
  }

  setState(state) {
    this.state = state;
    console.log(this.state);
  }

  onMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;

    for (const el of this.elements) {
      if (el.state === this.state && el.contains) {
        el.hover = el.contains(this.mouse.x, this.mouse.y);
      }
    }
  }

  onMouseDown() {
    this.mouse.down = true;

    for (const el of this.elements) {
      if (
        el.state === this.state &&
        el.contains &&
        el.contains(this.mouse.x, this.mouse.y)
      ) {
        el.onClick?.();
      }
    }
  }

  update(dt) {
    for (const el of this.elements) {
      if (el.state === this.state && el.update) {
        el.update(dt);
      }
    }
  }

  draw(ctx) {
    this.layout.drawDebug(ctx, this.canvas);
    for (const el of this.elements) {
      if (el.state === this.state && el.visible) {
        el.draw(ctx);
      }
    }
  }
}