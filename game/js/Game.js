class Game {
    constructor() {
        this.gameObjects = this.createObjects();
    }

    createObjects() {
        var objects = [];
        for (var i = 0; i < 100; i++) {
            const PADDING = 100;
            objects.push(new Player(random(PADDING, windowWidth - PADDING), random(PADDING, windowHeight - PADDING), random(10, 100), random(10, 100), random(1, 5)));
        }
        return objects;
    }

    updateFrame() {
        this.update();
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