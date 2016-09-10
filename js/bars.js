class Bars {
    constructor({
        barWidth = 150,
        barThickness = 15,
        position = Vector.Zero,
        direction = 0,
        distance = 0,
        duration = 1000,
        color = "white",
        onComplete = () => {}
     } = {}) {
         this.barWidth = barWidth;
         this.barThickness = barThickness;
         this.position = position;
         this.direction = direction;
         this.distance = distance;
         this.duration = duration;
         this.color = color;
         this.sin = Math.sin(direction);
         this.cos = Math.cos(direction);
         this.tan = Math.tan(direction);

         this.offset = Vector.Zero;
         this.targetOffset = new Vector();
         this.targetOffset.x = this.distance * this.sin;
         this.targetOffset.y = - this.distance * this.cos;

         this.p1 = new Vector();
         this.p1.x = this.position.x - (this.barWidth / 2) * this.cos;
         this.p1.y = this.position.y - (this.barWidth / 2) * this.sin;

         this.p2 = new Vector();
         this.p2.x = this.position.x + (this.barWidth / 2) * this.cos;
         this.p2.y = this.position.y + (this.barWidth / 2) * this.sin;

         this.p3 = new Vector();
         this.p3.x = this.p2.x + (this.barThickness) * this.sin;
         this.p3.y = this.p2.y - (this.barThickness) * this.cos;

         this.p4 = new Vector();
         this.p4.x = this.p1.x + (this.barThickness) * this.sin;
         this.p4.y = this.p1.y - (this.barThickness) * this.cos;
         
        this.tween = new TWEEN.Tween(this.offset)
            .to(this.targetOffset, this.duration)
            .easing(TWEEN.Easing.Quartic.Out)
            .onComplete(onComplete)
            .start();
    }

    draw(ctx) {
        console.log(this.offset);

        ctx.fillStyle = this.color;
        ctx.beginPath();

        ctx.moveTo(this.p1.x + this.offset.x, this.p1.y + this.offset.y);
        ctx.lineTo(this.p2.x + this.offset.x, this.p2.y + this.offset.y);
        ctx.lineTo(this.p3.x + this.offset.x, this.p3.y + this.offset.y);
        ctx.lineTo(this.p4.x + this.offset.x, this.p4.y + this.offset.y);

        ctx.fill();
    }
}