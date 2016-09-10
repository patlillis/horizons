class Color {
    constructor(r = 0, g = 0, b = 0, a = 1.0) {
        this.r = Color.sanitizeComponent(r);
        this.g = Color.sanitizeComponent(g);
        this.b = Color.sanitizeComponent(b);
        this.a = Color.sanitizeAlpha(a);
    }

    static get White() { return new Color(255, 255, 255); }
    static get Black() { return new Color(0, 0, 0); }

    static fromHex(hex, alpha = 1.0) {
        hex = hex.replace(/[^0-9A-F]/gi, '');
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;

        return new Color(r, g, b, alpha);
    }

    static componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    static sanitizeComponent(c) {
        c = clamp(c, 0, 255);
        c = Math.round(c);
        return c;
    }

    static sanitizeAlpha(a) {
        return clamp(a, 0.0, 1.0);
    }

    toString() {
        if (this.a == 1.0) {
            return "#" +
                Color.componentToHex(Color.sanitizeComponent(this.r)) +
                Color.componentToHex(Color.sanitizeComponent(this.g)) +
                Color.componentToHex(Color.sanitizeComponent(this.b));
        }
        else {
            return 'rgba(' + 
            Color.sanitizeComponent(this.r) + ', ' +
            Color.sanitizeComponent(this.g) + ', ' +
            Color.sanitizeComponent(this.b) + ', ' + 
            Color.sanitizeAlpha(this.a) + ')';
        }
    }
}