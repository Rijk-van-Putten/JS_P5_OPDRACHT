class AABB {
    constructor(x1, x2, y1, y2, ref) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.ref = ref;
    }

    getPoints() {
        var points = [];
        points.push([this.x1, this.y1]);
        points.push([this.x1, this.y2]);
        points.push([this.x2, this.y1]);
        points.push([this.x2, this.y2]);
        return points;
    }
}

class PhysicsManager {
    static updatePhysics(gameObjcets) {
        var colliders = [];
        gameObjcets.forEach(gameObject => {
            if (gameObject.hasPhysics)
            {
                colliders.push(new AABB(gameObject.x - gameObject.width/2, gameObject.y - gameObject.height/2, gameObject.x + gameObject.width/2, gameObject.y + gameObject.height/2, gameObject));
            }
        });
        colliders.forEach(collider1 => {
            colliders.forEach(collider2 => {
                if (collider1 != collider2)
                {
                    collider2.getPoints().forEach(point => {
                    if (point[0]>= collider1.x1
                        && point[0] <= collider1.x2
                        && point[1] >= collider1.y1
                        && point[1] <= collider1.y2)
                    {
                        console.log(typeof collider1);
                            collider1.verticalVelocity = 0;
                        // if (typeof collider1 === 'Player') {
                        // }
                        // console.log("COLLIDE! " + collider1.ref.width + " & " + collider2.ref.width);   
                    }
                    });
                }
            });
        });
    }
}