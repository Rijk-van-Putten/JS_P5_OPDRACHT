const GAME_STATE_ENUM = { "MENU": 0, "GAME": 1, "GAME_OVER": 2 }
const DEFAULT_STATE = GAME_STATE_ENUM.MENU;

Object.freeze(GAME_STATE_ENUM);

class StateManager {
    constructor() {
        this.gameState = DEFAULT_STATE;
        this.currentState = this.buildState(this.gameState);
        this.currentState.onStart();
    }

    buildState(state) {
        switch(state)
        {
            case GAME_STATE_ENUM.MENU:
                return new MenuState();
                break;
            case GAME_STATE_ENUM.GAME:
                return new GameState();
                break;
            case GAME_STATE_ENUM.GAME_OVER:
                return new GameOverState();
                break;
        }
    }

    switchState(state) {
        this.currentState.onStop();
        this.currentState = this.buildState(state);
        this.currentState.onStart();
    }

    updateFrame() {
        this.update();
        this.draw();
    }

    update() {
       // Update current state
       this.currentState.onUpdate();
    }

    draw() {
        // Draw current state
        this.currentState.onDraw();
    }
}