const PADDING = 40;
const OFFSET_3D = 200.0;

class GameState extends State {
    constructor() {
        super();
        this.player = new Player(0, 0);
        this.collidableObjects = this.createLevel();
        this.cameraPos = createVector(0, 0);
    }

    createLevel() {
        var objects = [];
        for (var x = 0; x < 10000; x += 1000) {
            objects.push(new CollidableObject(x - width / 2, 500, 1000, 50));
            objects.push(new CollidableObject(x - width / 2, -500, 1000, 50));
            objects.push(new CollidableObject(x - width / 2, 450, 50, 50, true));
            objects.push(new CollidableObject(x - width / 2, -450, 50, 50, true));
        }
        return objects;
    }

    onUpdate() {
        this.cameraPos.lerp(this.player.position, 0.1);
        this.player.update(this.collidableObjects);

        camera(this.cameraPos.x, this.cameraPos.y, (height / 2.0) / tan(PI * 30.0 / 180.0), this.cameraPos.x + OFFSET_3D, this.cameraPos.y + OFFSET_3D, 0, 0, 1, 0);
        if (this.player.isDead)
        {
            stateManager.switchState(GAME_STATE_ENUM.GAME_OVER);
        }
    }

    onDraw() {
        background(150, 150, 150);
        this.player.draw();
        this.collidableObjects.forEach(object => {
            object.draw();
        });
    }
}