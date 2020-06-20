class CollidableObject {
    constructor(x, y, width, height) {
        this.position = createVector(x, y);
        this.size = createVector(width, height);
    }

    update() {}
    draw() {
        fill("GREEN");
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}