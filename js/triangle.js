class Triangle extends Shape {
    drawOffscreen() {
        this.offCtx.beginPath();
        this.offCtx.moveTo(0, 0);
        this.offCtx.lineTo(150, 100);
        this.offCtx.lineTo(300, 0);
        this.offCtx.fill();
    }
}