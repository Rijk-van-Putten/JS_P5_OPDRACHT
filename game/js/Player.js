// Some constant properties
const GRAVITY_SCALE = 1;
const PLAYER_SIZE = 50;
const JUMP_VELOCITY = 16;
const DOUBLE_JUMP_VELOCITY = 14;
const DASH_VERLOCITY = 50;
const DASH_COOLDOWN = 3.0;
const VERTICAL_DRAG = 2;
const START_MOVE_SPEED = 10;

class Player {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.size = createVector(PLAYER_SIZE, PLAYER_SIZE);

        this.grounded = false;
        this.canJump = true;
        this.canDoubleJump = true;
        this.canSwitch = true;
        this.canDash = true;
        this.isColliding = false;
        this.velocity = createVector(0, 0);
        this.gravityMultiplier = 1;
        this.switchKeyDown = false;
        this.jumpKeyDown = false;
        this.dashKeyDown = false;
        this.dashTimer = 0.0;
        this.isDead = false;
        this.isDashing = false;
    }

    update(collidables, level) {
        this.moveSpeed = START_MOVE_SPEED + (level * 0.6); 

        var currentGravity = GRAVITY_SCALE * this.gravityMultiplier;
        // Jumping
        if (keyIsDown(32)) { // Space Key
            if (!this.jumpKeyDown) {
                if (this.canJump) {
                    this.jumpKeyDown = true;
                    this.velocity.y = -this.gravityMultiplier * JUMP_VELOCITY;
                    this.canJump = false;
                } else if (this.canDoubleJump) {
                    this.jumpKeyDown = true;
                    this.velocity.y = -this.gravityMultiplier * DOUBLE_JUMP_VELOCITY;
                    this.canDoubleJump = false;
                }
            }
        }
        else {
            this.jumpKeyDown = false;
        }
        // Switch gravity
        if (keyIsDown(90)) { // Z KEY
            if (!this.switchKeyDown && this.canSwitch) {
                this.velocity.y = -this.gravityMultiplier * 2;
                this.canSwitch = false;
                this.gravityMultiplier *= -1;
                this.switchKeyDown = true;
            }
        } else {
            this.switchKeyDown = false;
        }
        // Dash
        if (keyIsDown(13) && this.dashTimer >= DASH_COOLDOWN) { // ENTER KEY
            if (!this.dashKeyDown && this.canDash && !this.grounded) {
                this.dashKeyDown = true;
                this.canDash = false;
                this.isDashing = true;
                this.velocity.x += DASH_VERLOCITY;
                this.dashTimer = 0;
            }
        } else {
            this.dashKeyDown = false;
        }
        if (this.dashTimer < DASH_COOLDOWN)
        {
            this.dashTimer += (deltaTime / 1000);
        }


        // Horizontal collision & velocity
        if (this.velocity.x > this.moveSpeed)
            this.velocity.x -= VERTICAL_DRAG;
        else
            this.velocity.x = this.moveSpeed;

        var newHorizontalPos = createVector(this.position.x + this.velocity.x, this.position.y + 2 * -this.gravityMultiplier);
        var collideHorizontal = PhysicsManager.checkCollision(newHorizontalPos, this.size, collidables, this);

        // Vertical collision & velocity
        var newVerticalPos = createVector(this.position.x, this.position.y + this.velocity.y);
        var collideVertical = PhysicsManager.checkCollision(newVerticalPos, this.size, collidables, this);

        // Apply gravity
        // Gravity is a bit lower when jumping (nice feeling)
        if (this.velocity.y * this.gravityMultiplier < 0) {
            this.velocity.y += currentGravity * 0.8;
        } else {
            this.velocity.y += currentGravity;
        }

        if (collideVertical) {
            this.canJump = true;
            this.canDoubleJump = true;
            this.canSwitch = true;
            this.isDashing = false;
            this.canDash = true;
            this.velocity.y = 0;
            this.grounded = true;
        } else {
            this.grounded = false;
        }
        if (collideHorizontal) {
            this.velocity.x = 0;
        }
        this.position.add(this.velocity);
    }

    draw() {
        if (!this.isDashing)
        {
            fill('#34842D');
            stroke('#67FF59');
        } else {
            fill('#267CFF');
            stroke('#66A3FF');
        }
        strokeWeight(2);
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}