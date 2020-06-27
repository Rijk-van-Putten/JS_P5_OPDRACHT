// Some constant properties
const GRAVITY_SCALE = 1;
const PLAYER_SIZE = 50;
const JUMP_VELOCITY = 16;

class Player {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.size = createVector(PLAYER_SIZE, PLAYER_SIZE);

        this.canJump = true;
        this.isColliding = false;
        this.velocity = createVector(0, 0);
        this.gravityMultiplier = 1;
        this.switchKeyDown = false;
        this.isDead = false;
    }

    update(collidables) {
        var currentGravity = GRAVITY_SCALE * this.gravityMultiplier;

        if (keyIsDown(32) && this.canJump) {
            this.velocity.y = -this.gravityMultiplier * JUMP_VELOCITY;
            this.canJump = false;
        }
        if (keyIsDown(90)) {
            if (!this.switchKeyDown) {
                // Small jump
                this.velocity.y = -this.gravityMultiplier * 2;
                this.canJump = false;

                this.gravityMultiplier *= -1;
                this.switchKeyDown = true;
            }
        } else {
            this.switchKeyDown = false;
        }


        // Horizontal collision & velocity
        this.velocity.x = 10;
        var newHorizontalPos = createVector(this.position.x + this.velocity.x, this.position.y + 2 * -this.gravityMultiplier);
        var collideHorizontal = PhysicsManager.checkCollision(newHorizontalPos, this.size, collidables, this);

        // Vertical collision & velocity
        var newVerticalPos = createVector(this.position.x, this.position.y + this.velocity.y);
        var collideVertical = PhysicsManager.checkCollision(newVerticalPos, this.size, collidables, this);

        // TODO: Gravity slower when jumping multiply with 0.5 
        this.velocity.y += currentGravity;

        if (collideVertical) {
            this.canJump = true;
            this.velocity.y = 0;
        }
        if (collideHorizontal) {
            this.velocity.x = 0;
        }
        this.position.add(this.velocity);
    }

    draw() {
        fill('BLUE');
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}