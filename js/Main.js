// import RegularFont from '../assets/fonts/regular.ttf'

var stateManager;

// All Assets
var font;
var music;
var jumpSound;
var switchSound;
var dashSound;
var gameOverSound;
var playerSprite;
var playerSpriteDashing;

// Load all assets
function preload() {
    music = createAudio('../assets/audio/music1.ogg');
    jumpSound = createAudio('../assets/audio/jump.wav');
    dashSound = createAudio('../assets/audio/dash.wav');
    switchSound = createAudio('../assets/audio/switch.wav');
    gameOverSound = createAudio('../assets/audio/gameover.wav');
    // font = loadFont('../assets/fonts/regular.ttf');
    font = loadFont('../assets/fonts/regular.otf');
    // font = loadFont(RegularFont);
    playerSprite = loadImage('../assets/sprites/player.png');
    playerSpriteDashing = loadImage('../assets/sprites/player_dash.png');
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

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }