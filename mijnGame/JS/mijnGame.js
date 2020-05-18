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

class GameObject {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update() { }
    draw() { }
}

class Player extends GameObject {
    constructor(x, y, width, height, speed) {
        super(x, y, width, height);
        this.color = 'RED';
        this.speed = speed;
    }

    update() {
        this.x += this.speed;
    }

    draw() {
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
    }
}

var game;

function setup() {
    createCanvas(windowWidth, windowHeight);

    game = new Game();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    // GAME LOOP IS HANDELD BY THE GAME CLASS
    game.updateFrame();
}