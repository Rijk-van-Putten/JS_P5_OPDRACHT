var font;
var stateManager;
var music;
var jumpSound;

function preload() {
    music = createAudio('../assets/audio/music1.ogg');
    jumpSound = loadSound('../assets/audio/jump.wav');
    switchSound = loadSound('../assets/audio/switch.wav');
    font = loadFont('../assets/fonts/regular.ttf');
}

function setup() {
    music.volume(0.1);
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