class PhysicsBodyObject {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update() {}
    draw() {
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
    }
}