class CollidableObject {
    constructor(x, y, width, height, isObstacle) {
        this.position = createVector(x, y);
        this.size = createVector(width, height);
        this.isObstacle = isObstacle;
    }

    update() {}
    draw() {
        if (!this.isObstacle)
            fill("GREY");
        else
            fill("RED");
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}