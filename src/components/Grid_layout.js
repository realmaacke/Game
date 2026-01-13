"use strict";

export default class GridLayout {
    constructor(cols, rows, padding=0, margin=0) {
        this.cols = cols;
        this.rows = rows;
        this.padding = padding;
        this.margin = margin;
        this.debug = false;
    }

    toggleDebug() {
        this.debug = !this.debug;
    }

    drawDebug(ctx, canvas) {
        if (!this.debug) return;

        const cellW = canvas.width / this.cols;
        const cellH = canvas.height / this.rows;

        ctx.save();
        ctx.strokeStyle = "rgba(0, 255, 0, 0.35"
        ctx.lineWidth = 1;

        for (let c = 0; c <= this.cols; c++) {
            const x = c * cellW;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        // Horizontal lines
        for (let r = 0; r <= this.rows; r++) {
            const y = r * cellH;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        ctx.restore();
    }

    compute(cell, canvas) {
        const cellW = canvas.width / this.cols;
        const cellH = canvas.height / this.rows;

        const x = cell.col * cellW + this.padding;
        const y = cell.row * cellH + this.padding;

        
        const w = cell.colSpan * cellW - this.padding * 2;
        const h = cell.rowSpan * cellH - this.padding * 2;
        
        return { x, y, w, h };
    }
}