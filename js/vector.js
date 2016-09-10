class Vector {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    static get zero() { return new Vector(0, 0); }

    static average(v1, v2) {
        return new Vector((v1.x + v2.x) / 2, (v1.y + v2.y) / 2);
    }

    static normalize(v) {
        var len = Math.sqrt(v.x * v.x + v.y * v.y);
        if (len == 0)
            return Vector.zero;

        return new Vector(v.x / len, v.y / len);
    }
}