class Triangle {
    // TODO: Only make this canvas as big as the element
    constructor(width, height) {
        this.offCanvas = document.createElement('canvas');
        this.offCtx = this.offCanvas.getContext('2d');
        this.resize(width, height);
        this.drawOffscreen();
    }

    resize(width, height) {
        this.offCanvas.height = height;
        this.offCanvas.width = width;
        this.drawOffscreen();
    }

    drawOffscreen() {
        this.offCtx.beginPath();
        this.offCtx.moveTo((width/2) - 150, 0);
        this.offCtx.lineTo(width/2, 100);
        this.offCtx.lineTo((width/2) + 150, 0);
        this.offCtx.fill();
    }

    drawOnscreen(ctx) {
        ctx.drawImage(this.offCanvas, 0, 0);
    }

    hitTest(x, y) {
        var imgData = this.offCtx.getImageData(x, y, 1, 1);
        return imgData.data[3] > 0;
    }
}