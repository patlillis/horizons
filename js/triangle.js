class Triangle {
    constructor(canvasWidth, canvasHeight, x = 0, y = 0, originX = 0, originY = 0) {
        this.offCanvas = document.createElement('canvas');
        this.offCtx = this.offCanvas.getContext('2d');
        this.resize(canvasWidth, canvasHeight);
        this.move(x, y);
        this.recenter(originX, originY);
        this.drawOffscreen();
    }

    resize(canvasWidth, canvasHeight) {
        this.offCanvas.width = 300;
        this.offCanvas.height = 100;
        this.drawOffscreen();
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    recenter(originX, originY) {
        this.originX = originX;
        this.originY = originY;
    }

    get adjustedX() { return this.x - this.originX };
    get adjustedY() { return this.y - this.originY };

    drawOffscreen() {
        this.offCtx.beginPath();
        this.offCtx.moveTo(0, 0);
        this.offCtx.lineTo(150, 100);
        this.offCtx.lineTo(300, 0);
        this.offCtx.fill();
    }

    drawOnscreen(ctx) {
        ctx.drawImage(this.offCanvas, this.adjustedX, this.adjustedY);
    }

    hitTest(pageX, pageY) {
        var thisX = pageX - this.adjustedX;
        var thisY = pageY - this.adjustedY;
        var imgData = this.offCtx.getImageData(thisX, thisY, 1, 1);
        return imgData.data[3] > 0;
    }
}