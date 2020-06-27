const PADDING = 40;
const OFFSET_3D = 100.0;

class GameState extends State {
    constructor() {
        super();
        this.player = new Player(0, 0);
        this.collidableObjects = this.createLevel();
        this.cameraPos = createVector(0, 0);
    }

    createLevel() {
        const LEVEL_SIZE = 20000;
        const MIN_PLATFORM_SIZE = 500;
        const MAX_PLATFORM_SIZE = 1200;
        const MIN_PLATFORM_HEIGHT = 30;
        const MAX_PLATFORM_HEIGHT = 50;
        var objects = [];
        var x = 0;
        var y = 350;
        while(x < LEVEL_SIZE) {
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

    onUpdate() {
        this.player.update(this.collidableObjects);
        this.cameraPos.lerp(this.player.position, 0.1);

        camera(this.cameraPos.x, this.cameraPos.y, (height / 2.0) / tan(PI * 30.0 / 180.0), this.cameraPos.x + OFFSET_3D, this.cameraPos.y + OFFSET_3D, 0, 0, 1, 0);
        if (this.player.isDead)
        {
            stateManager.switchState(GAME_STATE_ENUM.GAME_OVER);
        }
    }

    onDraw() {
        background(150, 150, 150);
        this.player.draw();
        this.collidableObjects.forEach(object => {
            object.draw();
        });

        // Draw debug info
        camera()
        fill('#222222');
        textAlign(CENTER, CENTER);
        textSize(22);
        text("PLAYER X: " + this.player.position.x, this.player.position.x, this.player.position.y - 50);
    }
}