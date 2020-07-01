var font;
var stateManager;
var music;

function preload() {
    music = loadSound('../assets/audio/music2.ogg');
    font = loadFont('../assets/fonts/regular.ttf');
}

function setup() {
    music.loop();
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(60);
    rectMode(CENTER); // IMPORTANT! All game calculations depend on this!
    noStroke();
    textFont(font, 36);
    stateManager = new StateManager();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    stateManager.updateFrame();
}