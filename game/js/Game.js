const PADDING = 40;
const GAME_STATE_ENUM = { "MENU": 0, "GAME": 1, "GAME_OVER": 2 }
const OFFSET_3D = 200.0;

Object.freeze(GAME_STATE_ENUM);

class Game {
    constructor() {
        this.player = new Player(0, 0);
        this.gameState = GAME_STATE_ENUM.MENU;
        this.collidableObjects = this.createLevel();
        this.cameraPos = createVector(0, 0);
    }

    createLevel() {
        return [new CollidableObject(width / 2, height - 50, width, 50)];
    }

    updateFrame() {
        this.update();
        this.draw();
    }

    update() {
        this.player.update(this.collidableObjects);
        this.cameraPos.lerp(this.player.position, 0.1);

        camera(this.cameraPos.x, this.cameraPos.y, (height / 2.0) / tan(PI * 30.0 / 180.0), this.cameraPos.x + OFFSET_3D, this.cameraPos.y + OFFSET_3D, 0, 0, 1, 0);
    }

    draw() {
        background(150, 150, 150);
        this.player.draw();
        switch (this.gameState) {
            case GAME_STATE_ENUM.MENU:
                textSize(32);
                fill('BLACK');
                text('MENU', 10, 38);
                break;
            case GAME_STATE_ENUM.GAME:
                break;
            case GAME_STATE_ENUM.GAME_OVER:
                break;
        }
        this.collidableObjects.forEach(object => {
            object.draw();
        });
    }
}