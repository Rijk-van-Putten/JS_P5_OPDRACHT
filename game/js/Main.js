var font;
var stateManager;

function preload() {
    font = loadFont('../assets/fonts/regular.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    rectMode(CENTER); // IMPORTANT! All game calculations depend on this!
    textFont(font, 36);
    stateManager = new StateManager();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    stateManager.updateFrame();
}

// Some clamp util
Math.clamp = function (value, min, max) {
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    } else {
        return value;
    }
}