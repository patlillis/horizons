class Bars {
    constructor({
        barWidth = 150,
        barThickness = 15,
        position = Vector.zero,
        direction = Vector.zero,
        distance = 0,
        duration = 1000,
        startColor = Color.white,
        endColor = startColor,
        onComplete = () => { }
    } = {}) {
        this.barWidth = barWidth;
        this.barThickness = barThickness;
        this.position = position;
        this.distance = distance;
        this.duration = duration;

        this.color = startColor;
        this.targetColor = endColor;

        this.onComplete = onComplete;

        this.direction = Vector.normalize(direction);
        this.directionRad = Math.atan2(this.direction.y, this.direction.x);

        if (this.direction.x > 0 && this.direction.y < 0) {
            // Upper right
            this.directionRad = (Math.PI) - this.directionRad;
        }
        else if (this.direction.x <= 0 && this.direction.y < 0) {
            //Upper left
            this.directionRad = (Math.PI) - this.directionRad;
        }
        else if (this.direction.x < 0 && this.direction.y > 0) {
            //Lower left
            this.directionRad = (2 * Math.PI) - this.directionRad;
        }
        else if (this.direction.x > 0 && this.direction.y > 0) {
            //Lower right
            this.directionRad = (2 * Math.PI) - this.directionRad;
        }
        // else if (this.direction.x == 0) {
        //     this.directionRad = (2 * Math.PI) - this.directionRad;
        // }

        this.directionRad = mod(this.directionRad, 2 * Math.PI);

        this.sin = Math.sin(this.directionRad);
        this.cos = Math.cos(this.directionRad);
        this.tan = Math.tan(this.directionRad);

        this.offset = Vector.zero;
        this.targetOffset = new Vector();
        this.targetOffset.x = this.distance * this.cos;
        this.targetOffset.y = - this.distance * this.sin;

        this.p1 = new Vector();
        this.p1.x = this.position.x - (this.barWidth / 2) * this.sin;
        this.p1.y = this.position.y - (this.barWidth / 2) * this.cos;

        this.p2 = new Vector();
        this.p2.x = this.position.x + (this.barWidth / 2) * this.sin;
        this.p2.y = this.position.y + (this.barWidth / 2) * this.cos;

        this.p3 = new Vector();
        this.p3.x = this.p2.x + (this.barThickness) * this.cos;
        this.p3.y = this.p2.y - (this.barThickness) * this.sin;

        this.p4 = new Vector();
        this.p4.x = this.p1.x + (this.barThickness) * this.cos;
        this.p4.y = this.p1.y - (this.barThickness) * this.sin;

        this.enabled = false;
    }

    start() {
        this.enabled = true;

        this.positionTween = new TWEEN.Tween(this.offset)
            .to(this.targetOffset, this.duration)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onComplete(this.onComplete)
            .start();

        this.colorTween = new TWEEN.Tween(this.color)
            .to(this.targetColor, this.duration)
            .easing(TWEEN.Easing.Exponential.Out)
            .start();
    }

    draw(ctx) {
        if (this.enabled) {
            ctx.fillStyle = this.color.toString();
            ctx.beginPath();

            ctx.moveTo(this.p1.x + this.offset.x, this.p1.y + this.offset.y);
            ctx.lineTo(this.p2.x + this.offset.x, this.p2.y + this.offset.y);
            ctx.lineTo(this.p3.x + this.offset.x, this.p3.y + this.offset.y);
            ctx.lineTo(this.p4.x + this.offset.x, this.p4.y + this.offset.y);

            ctx.fill();
        }
    }
}