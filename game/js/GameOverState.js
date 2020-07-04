class GameOverState extends State {
    constructor() {
        super();
        this.cameraPos = createVector(0, 0);
    }

    onUpdate() {
        camera(this.cameraPos.x, this.cameraPos.y, (height / 2.0) / tan(PI * 30.0 / 180.0), this.cameraPos.x, this.cameraPos.y, 0, 0, 1, 0);
        if (keyIsPressed == true && focused) {
            stateManager.switchState(GAME_STATE_ENUM.GAME);
        }
    }

    onDraw() {
        background(150, 150, 150);
        textAlign(CENTER, CENTER);
        textSize(76);
        fill('#000');
        text("GAME OVER!", 0, 0);
        fill('#fff');
        textSize(32);
        text("SCORE: " + gameOverInfo.score, 0, 90);
        text("LEVEL: " + gameOverInfo.level, 0, 140);
        textSize(26);
        text("PRESS ANY KEY TO PLAY AGAIN!", 0, 220);
    }
}