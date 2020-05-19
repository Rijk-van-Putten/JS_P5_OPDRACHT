class AABB {
    constructor(x1, x2, y1, y2) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }
}

class PhysicsManager {
    static updatePhysics(gameObjcets) {
        colliders = [];
        gameObjcets.forEach(gameObject => {
            colliders.push(new AABB(gameObject.x - gameObject.width/2, gameObject.y - gameObject.height/2, gameObject.x + gameObject.width/2, gameObject.y + gameObject.height/2));
        });
    }
}