const OFFSET_3D = 0.0;

const LEVEL_SIZE = 20000;
const MIN_PLATFORM_SIZE = 500;
const MAX_PLATFORM_SIZE = 1200;
const MIN_PLATFORM_HEIGHT = 30;
const MAX_PLATFORM_HEIGHT = 50;

class GameState extends State {
    constructor() {
        super();
        this.player = new Player(0, 0);
        this.collidableObjects = this.createLevel();
        this.cameraPos = createVector(0, 0);
        this.score = 0;
        this.level = 1;
    }

    createLevel() {
        var objects = [];
        var x = 0;
        var y = 350;
        while (x < LEVEL_SIZE) {
            var platformWidth = random(MIN_PLATFORM_SIZE, MAX_PLATFORM_SIZE);
            var platformHeight = random(MIN_PLATFORM_HEIGHT, MAX_PLATFORM_HEIGHT)
            objects.push(new CollidableObject(x + (platformWidth / 2), y + (platformHeight / 2), platformWidth, platformHeight));
            objects.push(new CollidableObject(x - platformWidth / 2, 300, 50, 50, true));
            objects.push(new CollidableObject(x + (platformWidth / 2), y - 600 - (platformHeight / 2), platformWidth, platformHeight));
            x += platformWidth;
            y += random(-platformHeight, platformHeight);
        }
        return objects;
    }
    
    nextLevel() {
        this.player.position = createVector(0,0);
        this.collidableObjects = this.createLevel();
        this.level++;
    }

    onUpdate() {
        this.player.update(this.collidableObjects);
        this.cameraPos.lerp(this.player.position, 0.1);
        if (this.player.position.x >= LEVEL_SIZE) {
            this.nextLevel();
        }
        if (this.player.isDead) {
            stateManager.switchState(GAME_STATE_ENUM.GAME_OVER);
        }
        this.score += this.level;
    }


    onDraw() {
        background(150, 150, 150);

        camera(this.cameraPos.x, this.cameraPos.y, (height / 2.0) / tan(PI * 30.0 / 180.0), this.cameraPos.x + OFFSET_3D, this.cameraPos.y + OFFSET_3D, 0, 0, 1, 0);

        this.player.draw();
        this.collidableObjects.forEach(object => {
            object.draw();
        });

        // Draw HUD
        camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
        fill('#fff');
        const SCREEN_PADDING = 50;

        textSize(24);
        textAlign(LEFT, TOP);
        text("LEVEL: " + this.level, SCREEN_PADDING, SCREEN_PADDING, width, height);

        // Dash bar
        var barWidth = 200;
        var fillPercent = this.player.dashTimer / DASH_COOLDOWN;
        var barFill = fillPercent * barWidth;

        fill('#222');
        rect(0, -height/2 + SCREEN_PADDING, barWidth, 50);

        fill('#59c95b');
        rect((0.5 * barFill) - barWidth/2, -height/2 + SCREEN_PADDING, barFill, 50);

        fill('#fff');
        
        textAlign(RIGHT, TOP);
        text("SCORE: " + this.score, -SCREEN_PADDING, SCREEN_PADDING, width, height);


        textAlign(LEFT, BOTTOM);
        text("PLAYER X: " + this.player.position.x, SCREEN_PADDING, -SCREEN_PADDING, width, height);
    }
}