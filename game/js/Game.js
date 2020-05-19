class Game {
    constructor() {
        this.gameObjects = this.createObjects();
    }

    createObjects() {
        const PADDING = 40;
        return [ new Player(PADDING, windowHeight - 50, 50, 50, 5)];
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