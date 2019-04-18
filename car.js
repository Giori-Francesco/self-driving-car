class Car {
    constructor(pos, dir) {
        this.dir = dir;
        this.pos = pos;
        this.vel = createVector();
        this.acc = createVector(0.1, 0.1);
    }

    steer(steeringForce) {
        this.dir.rotate(steeringForce);
    }

    accelerate() {
        let acc = createVector(0.1, 0);
        acc.rotate(this.vel.heading());
        this.acc.add(acc);
    }

    decelerate() {
        let dec = createVector(0.1, 0);
        dec.rotate(this.vel.heading() - TWO_PI);
        this.acc.sub(dec);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.vel.mult(0.99);
        this.checkCollision();
    }

    checkCollision() {
        if (collideRectPoly(this.pos.x,
                this.pos.y,
                10,
                10,
                [createVector(0, 0), createVector(0, height), createVector(width, height), createVector(width, 0)],
                false
            )) print("collision");
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.dir.heading());

        strokeWeight(1);
        stroke(255);
        fill(0);
        rect(0, 0, 10, 10);

        strokeWeight(4);
        stroke(255, 0, 0);
        point(0, 0);
        pop();
    }
}