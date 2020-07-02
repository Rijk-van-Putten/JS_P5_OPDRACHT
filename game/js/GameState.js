const OFFSET_3D = 0.0;

const LEVEL_SIZE = 20000;
const LEVEL_HEIGHT = 800;
const PLATFORM_HEIGHT = 40;
const TOTAL_PARTS = 3;
const LEVEL_COLORS = {1: "#84FFAB", 2: "#6BA8FF", 3: "#FFE055", 4: "#FF9743", 5: "#FF343E", 6: "#C56AD7"};
class LevelPart {
    constructor(objects, width) {
        this.objects = objects;
        this.width = width;
    }
}

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
            var seed = int(random(0, TOTAL_PARTS + 1));
            var levelPart = this.generateLevelPart(seed, this.level, x);
            levelPart.objects.forEach(object => {
                objects.push(object);
            });
            x += levelPart.width;
        }
        return objects;
    }

    generateLevelPart(seed, difficulty, x) {
        var y = 350;
        switch (seed) {
            default:
            case 0:
                {
                    const WIDTH = 2000;
                    const OBSTACLE_HEIGHT = 240;
                    const OBSTACLE_WIDTH = 50;
                    return new LevelPart([
                        new CollidableObject(x + (OBSTACLE_WIDTH / 2) + (WIDTH / 2), y - (OBSTACLE_HEIGHT / 2), OBSTACLE_WIDTH, OBSTACLE_HEIGHT, true),
                        new CollidableObject(x + (OBSTACLE_WIDTH / 2) + (WIDTH / 2), y - LEVEL_HEIGHT + (OBSTACLE_HEIGHT / 2) + PLATFORM_HEIGHT, OBSTACLE_WIDTH, OBSTACLE_HEIGHT, true),
                        new CollidableObject(x + (WIDTH / 2), y + (PLATFORM_HEIGHT / 2), WIDTH, PLATFORM_HEIGHT),
                        new CollidableObject(x + (WIDTH / 2), y - LEVEL_HEIGHT + (PLATFORM_HEIGHT / 2), WIDTH, PLATFORM_HEIGHT)],
                        WIDTH);
                }
            case 1:
                {
                    const WIDTH = 2000;
                    const OBSTACLE_HEIGHT = 400;
                    const OBSTACLE_WIDTH = 50;
                    return new LevelPart([
                        new CollidableObject(x + (OBSTACLE_WIDTH / 2) + (WIDTH / 4), y - (OBSTACLE_HEIGHT / 2), OBSTACLE_WIDTH, OBSTACLE_HEIGHT, true),
                        new CollidableObject(x + (OBSTACLE_WIDTH / 2) + (WIDTH / 4 * 3), y - LEVEL_HEIGHT + (OBSTACLE_HEIGHT / 2) + PLATFORM_HEIGHT, OBSTACLE_WIDTH, OBSTACLE_HEIGHT, true),
                        new CollidableObject(x + (WIDTH / 2), y + (PLATFORM_HEIGHT / 2), WIDTH, PLATFORM_HEIGHT),
                        new CollidableObject(x + (WIDTH / 2), y - LEVEL_HEIGHT + (PLATFORM_HEIGHT / 2), WIDTH, PLATFORM_HEIGHT)],
                        WIDTH);
                }

        }
    }

    nextLevel() {
        this.player.position = createVector(0, 0);
        this.cameraPos = createVector(0,0);
        this.collidableObjects = this.createLevel();
        this.level++;
    }

    onUpdate() {
        this.player.update(this.collidableObjects);
        this.cameraPos.lerp(this.player.position.x, this.player.position.y / 2, 0, 0.1);
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
        var bgColor = color(LEVEL_COLORS[this.level]);
        bgColor.setAlpha(100);
        background(bgColor);

        camera(this.cameraPos.x, this.cameraPos.y, (height / 2.0) / tan(PI * 30.0 / 180.0), this.cameraPos.x + OFFSET_3D, this.cameraPos.y + OFFSET_3D, 0, 0, 1, 0);

        this.player.draw();
        this.collidableObjects.forEach(object => {
            object.draw();
        });

        // Draw HUD
        camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
        fill('#444');
        const SCREEN_PADDING = 50;

        textSize(24);
        textAlign(LEFT, TOP);
        text("LEVEL: " + this.level, SCREEN_PADDING, SCREEN_PADDING, width, height);


        textAlign(RIGHT, TOP);
        text("SCORE: " + this.score, -SCREEN_PADDING, SCREEN_PADDING, width, height);

        textAlign(LEFT, BOTTOM);
        text("PLAYER X: " + this.player.position.x, SCREEN_PADDING, -SCREEN_PADDING, width, height);

        // Dash bar
        var barWidth = 200;
        var barHeight = 40;
        var fillPercent = this.player.dashTimer / DASH_COOLDOWN;
        var barFill = fillPercent * barWidth;
        
        stroke('#000');
        strokeWeight(2);
        fill('#222');
        rect(0, -height / 2 + SCREEN_PADDING, barWidth, barHeight);
        fill('#4589ff');
        rect((0.5 * barFill) - barWidth / 2, -height / 2 + SCREEN_PADDING, barFill, barHeight);
    }
}