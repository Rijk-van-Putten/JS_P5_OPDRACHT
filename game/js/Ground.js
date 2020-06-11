class Ground extends GameObject {
    constructor() {
        super(windowWidth / 2, windowHeight - 50 - PADDING, windowWidth, 50, true);
        this.color = 'GREY';
    }

    draw() {
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
    }
}