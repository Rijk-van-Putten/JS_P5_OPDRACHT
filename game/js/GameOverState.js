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

    onStart() {
        var highScore = getCookie("highScore");
        this.newHighScore = false;
        if (highScore != "") {
            if (gameOverInfo.score > highScore) {
                this.newHighScore = true;
                this.highScore = gameOverInfo.score;
                document.cookie = "highScore=" + this.highScore + ";";
            } else {
                this.highScore = highScore;
            }
        } else {
            this.newHighScore = true;
            this.highScore = gameOverInfo.score;
            document.cookie = "highScore=" + this.highScore + ";";
        }
    }

    onUpdate() {
        camera(this.cameraPos.x, this.cameraPos.y, (height / 2.0) / tan(PI * 30.0 / 180.0), this.cameraPos.x, this.cameraPos.y, 0, 0, 1, 0);
        this.playAgainButton.update();
        this.menyButton.update();
    }

    onDraw() {
        background(200);
        textAlign(CENTER, CENTER);
        if (this.newHighScore) {
            textSize(50);
            fill('#1ca814');
            text("NEW HIGHSCORE!", 0, -220);
        }
        textSize(76);
        fill('#a82f2f');
        text("GAME OVER!", 0, -100);
        fill('#222');
        textSize(32);
        text("SCORE: " + gameOverInfo.score, 0, 20);
        text("HIGHSCORE: " + this.highScore, 0, 60);
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