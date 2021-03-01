class Slingshot {

    constructor(body, length, strength, bodyOffset, point) {
        var conOpt =
        {
            bodyA: body,
            length: length,
            stiffness: strength,
            pointA: bodyOffset,
            pointB: point
        }

        this.point = point;
        this.constraint = Constraint.create(conOpt);
        World.add(world, this.constraint);
    }

    drawLine(color, width)
    {
        if (!this.constraint.bodyA) { return; }
        push();
        stroke(color);
        strokeWeight(width);
        
        var body1ConPos = {x:this.constraint.bodyA.position.x + this.constraint.pointA.x, y:this.constraint.bodyA.position.y + this.constraint.pointA.y};
        
        line(body1ConPos.x, body1ConPos.y, this.point.x, this.point.y);
        pop();
    }
    
    drawPoints(size, point1color, point2color)
    {
        if (this.constraint.bodyA) { return; }
        var body1ConPos = {x:this.constraint.bodyA.position.x + this.constraint.pointA.x, y:this.constraint.bodyA.position.y + this.constraint.pointA.y};

        push();
        strokeWeight(size);
        stroke(point1color);
        point(body1ConPos.x, body1ConPos.y);
        stroke(point2color)
        point(this.point.x, this.point.y);
        pop();
    }

    shootBody()
    {
        this.bodyReleased = true;
        this.constraint.bodyA = null;
    }

    resetBody(body)
    {
        this.bodyReleased = false;
        this.constraint.bodyA = body;
        Matter.Body.setAngularVelocity(body, 0);
        Matter.Body.setAngle(body, 0);
        Matter.Body.setPosition(body, {x:this.point.x, y:this.point.y-10});
        Matter.Body.setVelocity(body, {x:0, y:0});
    }
}