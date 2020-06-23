// Axis Aligned Bounding Box
class AABB {
    constructor(position, size, obstacle) {
        this.x1 = position.x - size.x / 2;
        this.x2 = position.x + size.x / 2;
        this.y1 = position.y - size.y / 2;
        this.y2 = position.y + size.y / 2;
        this.obstacle = obstacle;
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
    // AABB Collision detection algorithm
    static checkCollision(position, size, collidableObjects, player) {
        var playerCollider = new AABB(position, size);
        var playerPoints = playerCollider.getPoints();
        var colliders = [];
        collidableObjects.forEach(collidable => {
            colliders.push(new AABB(collidable.position, collidable.size, collidable.isObstacle));
        });
        var collision = false;
        var obstacleCollision = false;
        colliders.forEach(collider => {
            playerPoints.forEach(point => {
                if (point[0] >= collider.x1 &&
                    point[0] <= collider.x2 &&
                    point[1] >= collider.y1 &&
                    point[1] <= collider.y2) {
                    collision = true;
                    if (collider.obstacle) {
                        obstacleCollision = true;
                        player.isDead = true;
                    }
                }
            });
        });
        return collision;
    }
}