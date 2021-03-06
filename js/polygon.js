// Shape made up of N points (N should be >= 3)
class Polygon extends Shape {
    constructor(points = [], { position, origin, color } = {}) {
        super({ position, origin, color });

        this.points = points;
        if (this.points.length < 3) {
            console.error("Can't construct a Polygon with " + this.points.length + " points.");
        }

        var max = new Vector(-Infinity, -Infinity);
        var min = new Vector(Infinity, Infinity);

        for (var i = 0; i < this.points.length; i++) {
            max.x = Math.max(max.x, this.points[i].x);
            max.y = Math.max(max.y, this.points[i].y);

            min.x = Math.min(min.x, this.points[i].x);
            min.y = Math.min(min.y, this.points[i].y);
        }

        this.offCanvas.width = max.x - min.x;
        this.offCanvas.height =  max.y - min.y;
    }

    drawOffscreen() {
        // Draw shapw
        this.offCtx.fillStyle = this.color.toString();
        this.offCtx.beginPath();
        this.offCtx.moveTo(this.points[0].x, this.points[0].y);

        for (var i = 1; i < this.points.length; i++) {
            var p = this.points[i];
            this.offCtx.lineTo(p.x, p.y);
        }

        this.offCtx.fill();
    }
}