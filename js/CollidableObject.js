class CollidableObject {
    constructor(x, y, width, height, isObstacle, isEmpty) {
        this.position = createVector(x, y);
        this.size = createVector(width, height);
        this.isObstacle = isObstacle;
        this.isEmpty = isEmpty;
    }

    update() {}
    draw() {
        if (!this.isObstacle)
        {
            noStroke();
            if (this.isEmpty) {
                fill("#555");
            } else {
                fill("#333");
            }
            
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