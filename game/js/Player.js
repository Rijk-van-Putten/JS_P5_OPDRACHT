class Player extends GameObject {
    constructor(x, y, width, height, speed) {
        super(x, y, width, height);
        this.color = 'RED';
        this.speed = speed;
    }

    update() {
        this.x += this.speed;
    }

    draw() {
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
    }
}