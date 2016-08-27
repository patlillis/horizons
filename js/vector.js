class Vector {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    static get Zero() { return new Vector(0, 0); }
}