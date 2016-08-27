class Shape {
    constructor(position = Vector.Zero, origin = Vector.Zero) {
        this.offCanvas = document.createElement('canvas');
        this.offCtx = this.offCanvas.getContext('2d');
        // this.resize(canvasWidth, canvasHeight);
        this.move(position);
        this.recenter(origin);
        this.drawOffscreen();
    }

    // resize() {

    // }

    move(position = Vector.Zero) {
        this.x = position.x;
        this.y = position.y;
    }

    recenter(origin = Vector.Zero) {
        this.originX = origin.x;
        this.originY = origin.y;
    }

    get adjustedX() { return this.x - this.originX };
    get adjustedY() { return this.y - this.originY };

    drawOffscreen() {
        // To be implemented by child classes
    }

    drawOnscreen(ctx) {
        this.drawOffscreen();
        ctx.drawImage(this.offCanvas, this.adjustedX, this.adjustedY);
    }

    hitTest(pagePosition) {
        var thisX = pagePosition.x - this.adjustedX;
        var thisY = pagePosition.y - this.adjustedY;
        var imgData = this.offCtx.getImageData(thisX, thisY, 1, 1);
        return imgData.data[3] > 0;
    }
}