"use strict";

export default class U_Element {
  constructor(cell) {
    this.cell = {
      col: cell.col,
      row: cell.row,
      colSpan: cell.colSpan ?? 1,
      rowSpan: cell.rowSpan ?? 1
    };
    
    this.visible = true;
  }

  layout(layout, canvas) {
    const { x, y, w, h } = layout.compute(this.cell, canvas);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(px, py) {
    return (
      px >= this.x &&
      py >= this.y &&
      px <= this.x + this.w &&
      py <= this.y + this.h
    );
  }

  update(dt) {}
  draw(ctx) {}
  onClick() {}
}
