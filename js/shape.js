// Base class for a shape to be drawn on a canvas.
//
// Handles things like positioning and hit-detection.
class Shape {
    constructor({ position = Vector.Zero, origin = Vector.Zero, color = "white" } = {}) {
        this.offCanvas = document.createElement('canvas');
        this.offCtx = this.offCanvas.getContext('2d');

        this.move(position);
        this.recenter(origin);
        this.color = color;
    }

    // Move this shape to a different position on the page.
    move(position = Vector.Zero) {
        this.x = position.x;
        this.y = position.y;
    }

    // Re-set the origin of this shape.
    recenter(origin = Vector.Zero) {
        this.originX = origin.x;
        this.originY = origin.y;
    }

    // Actual X coordinate of this shape on the page.
    get adjustedX() { return this.x - this.originX };
    // Actual Y coordinate of this shape on the page.
    get adjustedY() { return this.y - this.originY };

    // Do the actual drawing of the shape.
    // This should be implemented by child classes.
    drawOffscreen() { }

    // Draw this shape on the specified Canvas context.
    drawOnscreen(ctx) {
        this.drawOffscreen();
        ctx.drawImage(this.offCanvas, this.adjustedX, this.adjustedY);
    }

    // Returns true if the pagePosition Vector is within this shape.
    hitTest(pagePosition) {
        var thisX = pagePosition.x - this.adjustedX;
        var thisY = pagePosition.y - this.adjustedY;
        var imgData = this.offCtx.getImageData(thisX, thisY, 1, 1);
        return imgData.data[3] > 0;
    }
}