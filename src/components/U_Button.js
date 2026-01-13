import U_Element from "./U_Element.js";

export default class U_Button extends U_Element {
    constructor(cell, text, onClick) {
        super(cell);
        
        this.text = text;
        this.onClick = onClick;
        this.hover = false;
    }

  draw(ctx) {
    ctx.fillStyle = this.hover ? "#444" : "#222";
    ctx.fillRect(this.x, this.y, this.w, this.h);

    ctx.strokeStyle = "white";
    ctx.strokeRect(this.x, this.y, this.w, this.h);

    ctx.fillStyle = "white";
    ctx.font = "16px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      this.text,
      this.x + this.w / 2,
      this.y + this.h / 2
    );
  }
}