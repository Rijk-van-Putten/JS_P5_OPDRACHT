
const PADDING = 40;

class Game {
    constructor() {
        this.gameObjects = this.createObjects();
    }

    createObjects() {
        return [ new Player(PADDING, windowHeight - 300, 50, 50, 5), new Ground()];
    }

    updateFrame() {
        this.update();
        PhysicsManager.updatePhysics(this.gameObjects);
        this.draw();
    }

    update() {
        this.gameObjects.forEach(gameObject => {
            gameObject.update();
        });
    }

    draw() {
        background(100, 100, 100);
        this.gameObjects.forEach(gameObject => {
            gameObject.draw();
        });
    }
}