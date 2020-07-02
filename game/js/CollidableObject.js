class CollidableObject {
    constructor(x, y, width, height, isObstacle) {
        this.position = createVector(x, y);
        this.size = createVector(width, height);
        this.isObstacle = isObstacle;
    }

    update() {}
    draw() {
        if (!this.isObstacle)
            fill("#333");
        else
            fill("RED");
        noStroke();
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}