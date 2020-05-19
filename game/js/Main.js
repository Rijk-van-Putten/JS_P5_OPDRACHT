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