// Some constant properties
const GRAVITY_SCALE = 1;
const PLAYER_SIZE = 50;
const JUMP_VELOCITY = 16;

class Player {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.size = createVector(PLAYER_SIZE, PLAYER_SIZE);

        this.canJump = true;
        this.canDoubleJump = true;
        this.canSwitch = true;
        this.isColliding = false;
        this.velocity = createVector(0, 0);
        this.gravityMultiplier = 1;
        this.switchKeyDown = false;
        this.jumpKeyDown = false;
        this.isDead = false;
    }

    update(collidables) {
        var currentGravity = GRAVITY_SCALE * this.gravityMultiplier;

        if (keyIsDown(32)) {
            if (!this.jumpKeyDown) {
                if (this.canJump) {
                    this.jumpKeyDown = true;
                    this.velocity.y = -this.gravityMultiplier * JUMP_VELOCITY;
                    this.canJump = false;
                } else if (this.canDoubleJump) {
                    this.jumpKeyDown = true;
                    this.velocity.y = -this.gravityMultiplier * JUMP_VELOCITY;
                    this.canDoubleJump = false;
                }
            }
        }
        else {
            this.jumpKeyDown = false;
        }
        if (keyIsDown(90)) {
            if (!this.switchKeyDown && this.canSwitch) {
                this.velocity.y = -this.gravityMultiplier * 2;
                this.canSwitch = false;
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

        // Apply gravity
        // 
        if (this.velocity.y * this.gravityMultiplier < 0) {
            console.log("TEST!");
            this.velocity.y += currentGravity * 0.8;
        } else {
            this.velocity.y += currentGravity;
        }

        if (collideVertical) {
            this.canJump = true;
            this.canDoubleJump = true;
            this.canSwitch = true;
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