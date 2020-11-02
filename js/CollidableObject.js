class CollidableObject {
    constructor(x, y, width, height, isObstacle) {
        this.position = createVector(x, y);
        this.size = createVector(width, height);
        this.isObstacle = isObstacle;
    }

    update() {}
    draw() {
        if (!this.isObstacle)
        {
            noStroke();
            fill("#333");
        }
        else 
        {
            strokeWeight(2);
            stroke('#EF2F2F');
            fill("#871C1B");
        }
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}