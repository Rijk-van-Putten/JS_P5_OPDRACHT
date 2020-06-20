const PADDING = 40;
const GAME_STATE_ENUM = { "MENU": 0, "GAME": 1, "GAME_OVER": 2 }
Object.freeze(GAME_STATE_ENUM);

class Game {
    constructor() {
        this.player = new Player(300, 100);
        this.gameState = GAME_STATE_ENUM.MENU;
        this.collidableObjects = this.createLevel();
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