var game;

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER); // IMPORTANT! All game calculations depend on this!
    game = new Game();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    // GAME LOOP IS HANDELD BY THE GAME CLASS
    game.updateFrame();
}