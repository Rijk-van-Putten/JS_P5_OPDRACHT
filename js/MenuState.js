class MenuState extends State {
    constructor() {
        super();
        this.cameraPos = createVector(0, 0);
        this.playButton = new Button(0, 200, "PLAY", this.playGame);
    }

    playGame() {
        stateManager.switchState(GAME_STATE_ENUM.GAME);
    }

    onUpdate() {
        camera(this.cameraPos.x, this.cameraPos.y, (height / 2.0) / tan(PI * 30.0 / 180.0), this.cameraPos.x, this.cameraPos.y, 0, 0, 1, 0);
        this.playButton.update();
    }

    onDraw() {
        background(200, 200, 200);
        
        textAlign(CENTER, CENTER);
        
        textSize(96);
        fill("#29354a");
        text("BRUHN", 0, -240);

        textSize(28);
        fill("#562f23");
        text("2021 REMASTERED EDITION", 0, -170);
      
        fill("#222");
        textSize(32);
        text("A game by Rijk van Putten", 0, -100);
        textSize(24);
        fill("#000");
        text("How to play?\n[SPACE] Jump / Double Jump\n[Z] Switch Gravity\n[Enter] Dash", 0, 30);
        this.playButton.draw();
    }
}