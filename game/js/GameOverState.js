class GameOverState extends State {
    constructor() {
        super();
        this.cameraPos = createVector(0, 0);
        this.playAgainButton = new Button(0, 200, "PLAY AGAIN", this.playAgain);
        this.menyButton = new Button(0, 300, "MENU", this.switchMenu);
    }

    playAgain() {
        stateManager.switchState(GAME_STATE_ENUM.GAME);
    }

    switchMenu() {
        stateManager.switchState(GAME_STATE_ENUM.MENU);
    }

    onUpdate() {
        camera(this.cameraPos.x, this.cameraPos.y, (height / 2.0) / tan(PI * 30.0 / 180.0), this.cameraPos.x, this.cameraPos.y, 0, 0, 1, 0);
        this.playAgainButton.update();
        this.menyButton.update();
    }

    onDraw() {
        background(200);
        textAlign(CENTER, CENTER);
        textSize(76);
        fill('#a82f2f');
        text("GIMMA OVER!", 0, -100);
        fill('#222');
        textSize(32);
        text("SCORE: " + gameOverInfo.score, 0, 20);
        var levelText;
        if (gameOverInfo.level <= 5)
            levelText = gameOverInfo.level;
        else 
            levelText = "ENDLESS";
        text("LEVEL: " + levelText, 0, 100);
        this.playAgainButton.draw();
        this.menyButton.draw();
    }
}