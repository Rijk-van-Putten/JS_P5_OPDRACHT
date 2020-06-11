const GRAVITY = 1;

class Player extends GameObject {
    constructor(x, y, width, height, speed) {
        super(x, y, width, height, true);
        this.color = 'RED';
        this.speed = speed;
        this.canJump = true;
        this.verticalVelocity = 0;
    }

    update() {
        if (keyIsDown(32) && this.canJump) {
            this.verticalVelocity = -40;
            this.canJump = false;
        }
        this.verticalVelocity += GRAVITY;
        this.y += this.verticalVelocity;
        this.x += this.speed;
    }

    draw() {
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
    }
}