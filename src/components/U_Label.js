"use strict";
import U_Element from "./U_Element.js";

export default class U_Label extends U_Element {
  constructor(cell, text, fontSize) {
    super(cell);
    this.text = text;
    this.fontSize = fontSize;
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.font = `${this.fontSize} monospace`;
    ctx.textAlign = "center";
    ctx.textBaseLine = "middle";

    ctx.fillText(this.text, this.x, this.y);
  }
}
