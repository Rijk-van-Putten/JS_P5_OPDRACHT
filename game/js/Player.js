// Some constant properties
const GRAVITY = 1;
const PLAYER_SIZE = 50;
const JUMP_VELOCITY = 20;

class Player {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.size = createVector(PLAYER_SIZE, PLAYER_SIZE);

        this.canJump = true;
        this.isColliding = false;
        this.velocity = createVector(0, 0);
    }

    update(collidables) {
        if (keyIsDown(32) && this.canJump) {
            this.velocity.y = -JUMP_VELOCITY;
            this.canJump = false;
        }

        this.velocity.x = 3;
        var newHorizontalPos = createVector(this.position.x + this.velocity.x, this.position.y);
        var collideHorizontal = PhysicsManager.checkCollision(newHorizontalPos, this.size, collidables);
        var newVerticalPos = createVector(this.position.x, this.position.y + this.velocity.y);
        var collideVertical = PhysicsManager.checkCollision(newVerticalPos, this.size, collidables);
        if (!collideVertical) {
            if (this.velocity.y > 0)
                this.velocity.y += GRAVITY * 0.5;
            else if (this.velocity.y <= 0)
                this.velocity.y += GRAVITY;
        } else {
            this.canJump = true;
            this.velocity.y = 0;
        }
        if (collideHorizontal) {
            this.velocity.x = 0;
        }
        this.position.add(this.velocity);
    }

    draw() {
        fill('RED');
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}