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
        textSize(64);
        fill('RED');
        text("GAME OVER!", 0, 0);
        fill('#222222');
        textSize(32);
        text("SCORE: 89340700813", 0, 80);
        text("LEVEL: ENDLESS", 0, 120);
        textSize(26);
        text("PRESS ANY KEY TO PLAY AGAIN!", 0, 160);
    }
}