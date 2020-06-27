class GameOverState extends State {
    constructor() {
        super();
        this.cameraPos = createVector(0, 0);
    }

    onUpdate() {
        camera(this.cameraPos.x, this.cameraPos.y, (height / 2.0) / tan(PI * 30.0 / 180.0), this.cameraPos.x, this.cameraPos.y, 0, 0, 1, 0);
        if (keyIsPressed === true) {
            stateManager.switchState(GAME_STATE_ENUM.GAME);
        }
    }

    onDraw() {
        background(150, 150, 150);
        fill('#222222');
        textAlign(CENTER, CENTER);
        textSize(56);
        text("GAME OVER", 0, 0);
        textSize(28);
        text("PRESS ANY KEY TO PLAY AGAIN!", 0, 100);
    }
}