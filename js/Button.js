const BUTTON_WIDTH = 360;
const BUTTON_HEIGHT = 70;
const BUTTON_NORMAL_COLOR = "#59a9ff";
const BUTTON_HOVER_COLOR = "#3b7bbf";
const BUTTON_PRESSED_COLOR = "#2e5987";

class Button {
    constructor(x, y, text, onPressed) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.onPressed = onPressed;
        this.color = BUTTON_NORMAL_COLOR;
        this.isPressed = false;
    }

    update() {
        if (mouseX > this.x + width / 2 - BUTTON_WIDTH / 2
            && mouseX < this.x + width / 2 + BUTTON_WIDTH / 2
            && mouseY > this.y + height / 2 - BUTTON_HEIGHT / 2
            && mouseY < this.y + height / 2 + BUTTON_HEIGHT / 2) {
            if (mouseIsPressed) {
                this.color = BUTTON_PRESSED_COLOR;
                this.isPressed = true;
            } else {
                this.color = BUTTON_HOVER_COLOR;
                this.isPressed = false;
            }
        } else {
            this.color = BUTTON_NORMAL_COLOR;
            this.isPressed = false;
        }
        if (this.isPressed) {
            this.onPressed();
        }
    }

    draw() {
        stroke("#222");
        strokeWeight(4);
        fill(this.color);
        rect(this.x, this.y, BUTTON_WIDTH, BUTTON_HEIGHT);
        fill("#222")
        textAlign(CENTER, CENTER);
        textSize(32);
        text(this.text, this.x, this.y);
    }
}