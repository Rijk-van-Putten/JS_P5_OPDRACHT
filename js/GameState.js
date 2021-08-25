const LEVEL_SIZE = 20000;
const EMPTY_PART_WIDTH = 1000;
const LEVEL_HEIGHT = 800;
const PLATFORM_HEIGHT = 40;
const TOTAL_PARTS = 4;
const LEVEL_COLORS = { 1: "#6E9E7D", 2: "#647C9E", 3: "#9E925B", 4: "#9E7554", 5: "#A35357", 6: "#8C6893" };
class LevelPart {
    constructor(objects, width) {
        this.objects = objects;
        this.width = width;
    }
}

var gameOverInfo;

class GameState extends State {
    constructor() {
        super();
        this.level = 1;
        this.player = new Player(0, 0);
        this.collidableObjects = this.createLevel();
        this.cameraPos = createVector(0, 0);
        this.score = 0;
    }

    createLevel() {
        var objects = [];
        var x = 0;
        var levelPart = this.createEmptyLevelPart(x, EMPTY_PART_WIDTH);
        levelPart.objects.forEach(object => {
            objects.push(object);
        });
        x += levelPart.width;
        while (x < LEVEL_SIZE) {
            var levelPart = this.generateLevelPart(this.level, x);
            levelPart.objects.forEach(object => {
                console.log(object);
                objects.push(object);
            });
            x += levelPart.width;

            var emptyPart = this.createEmptyLevelPart(x, 600);
            emptyPart.objects.forEach(object => {
                objects.push(object);
            });
            x += 600;
        }
        var levelPart = this.createEmptyLevelPart(x, EMPTY_PART_WIDTH);
        levelPart.objects.forEach(object => {
            objects.push(object);
        });
        return objects;
    }

    createEmptyLevelPart(x, width) {
        var y = 350;
        return new LevelPart([
            new CollidableObject(x + (width / 2), y + (PLATFORM_HEIGHT / 2), width, PLATFORM_HEIGHT, false, true),
            new CollidableObject(x + (width / 2), y - LEVEL_HEIGHT + (PLATFORM_HEIGHT / 2), width, PLATFORM_HEIGHT, false, true)],
            width);
    }

    generateLevelPart(difficulty, x) {
        var y = 350;
        difficulty = constrain(difficulty, 0, 6);


        var avg_width = int(random(14, 22)) * 100; // 1400 - 2200
        var xOffset = 0;
        var maxCons = 2;
        var objects = Array();
        var bottom = random() >= 0.5;
        var consecutiveCounter = 0;
        var wasCenter = false;

        var alternation = random() >= 0.7;
        if (alternation) {
            maxCons = 1;
        }
        while (xOffset < avg_width) {
            var before = int(random(4, 7 - difficulty)) * 50;
            xOffset += before;

            var obstacleWidth = 30 + int(random(0 + difficulty/2, 3)) * 10;

            // Top / bottom 
            if (random() > 0.35 || wasCenter) {
                var obstacleHeight = 50 + int(random(4, 13)) * 10 + 5 * difficulty;

                var placeBottom = false;
                var placeTop = false;


                if (random() >= 0.8) {
                    placeBottom = true;
                    placeTop = true;
                } else {
                    if (bottom) {
                        placeBottom = true;
                    } else {
                        placeTop = true;
                    }
                }
                if (placeBottom) {
                    objects.push(new CollidableObject(x + xOffset, y - (obstacleHeight / 2), obstacleWidth, obstacleHeight, true));
                }
                if (placeTop) {
                    objects.push(new CollidableObject(x + xOffset, y - LEVEL_HEIGHT + (obstacleHeight / 2) + PLATFORM_HEIGHT, obstacleWidth, obstacleHeight, true));
                }

                consecutiveCounter++;
                if (consecutiveCounter >= maxCons || random() >= 0.6) {
                    bottom = !bottom;
                }
            }
            // Center
            else if (!alternation) {
                var obstacleHeight = 100 + int(random(4, 13)) * 10 + 5 * difficulty;
                objects.push(new CollidableObject(x + xOffset, y - LEVEL_HEIGHT / 2 + PLATFORM_HEIGHT, obstacleWidth, obstacleHeight, true));
                wasCenter = true;
            } else {
                var obstacleHeight = 30 + int(random(4, 6)) * 10 + 5 * difficulty;
                if (random() >= 0.5) {
                    objects.push(new CollidableObject(x + xOffset, -(obstacleHeight / 2) - (PLATFORM_HEIGHT / 2), obstacleWidth, obstacleHeight, true));
                } else {
                    objects.push(new CollidableObject(x + xOffset, (obstacleHeight / 2) + (PLATFORM_HEIGHT / 2), obstacleWidth, obstacleHeight, true));

                }
            }

            var after = int(random(4, 7 - difficulty)) * 50;
            xOffset += after;
        }
        var width = xOffset;
        // Level borders
        if (alternation) {
            objects.push(new CollidableObject(x + (width / 2), 0, width - 200, PLATFORM_HEIGHT, false));
        }
        objects.push(new CollidableObject(x + (width / 2), y + (PLATFORM_HEIGHT / 2), width, PLATFORM_HEIGHT, false));
        objects.push(new CollidableObject(x + (width / 2), y - LEVEL_HEIGHT + (PLATFORM_HEIGHT / 2), width, PLATFORM_HEIGHT, false));
        
        return new LevelPart(objects, width);
    }

    nextLevel() {
        this.player.position.x = 0;
        this.cameraPos = createVector(0, 0);
        this.collidableObjects = this.createLevel();
        this.level++;
    }

    onUpdate() {
        this.player.update(this.collidableObjects, this.level);
        this.cameraPos.lerp(this.player.position.x + 200, this.player.position.y / 2, 0, 0.1);
        if (this.player.position.x >= LEVEL_SIZE + EMPTY_PART_WIDTH) {
            this.nextLevel();
        }
        if (this.player.isDead) {
            gameOverSound.play();
            gameOverInfo = {
                score: this.score,
                level: this.level
            }
            stateManager.switchState(GAME_STATE_ENUM.GAME_OVER);
        }
        this.score += this.level;
    }

    onDraw() {
        if (this.level <= 5)
            var bgColor = color(LEVEL_COLORS[this.level]);
        else
            var bgColor = color(LEVEL_COLORS[6]);
        background(bgColor);

        camera(this.cameraPos.x - 100, this.cameraPos.y, (height / 2.0) / tan(PI * 30.0 / 180.0), this.cameraPos.x + 100, this.cameraPos.y, 0, 0, 1, 0);

        this.player.draw();
        this.collidableObjects.forEach(object => {
            object.draw();
        });

        // Draw HUD
        camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);

        fill('#fff');
        const SCREEN_PADDING = 50;

        textSize(24);
        textAlign(RIGHT, TOP);
        var levelText;
        if (this.level <= 5)
            levelText = this.level;
        else
            levelText = "ENDLESS";
        text("LEVEL: " + levelText, -SCREEN_PADDING, SCREEN_PADDING + 50, width, height);


        textAlign(RIGHT, TOP);
        text("SCORE: " + this.score, -SCREEN_PADDING, SCREEN_PADDING, width, height);

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