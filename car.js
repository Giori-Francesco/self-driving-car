class Car {
    constructor(pos, dir, brain) {
        this.dir = dir;
        this.pos = pos;
        this.vel = 0;
        this.acc = 0;
        this.brain = brain || new Brain();
    }

    steer(steeringForce) {
        this.dir += steeringForce;
    }

    accelerate(acc) {
        this.acc += acc;
    }

    update() {
        push();
        rotate(this.dir);
        this.vel += this.acc;
        this.pos.add(createVector(this.vel, 0).rotate(this.dir));
        this.acc *= 0.1;
        this.vel *= 0.99;
        pop();
        this.checkCollision();
    }

    calcBoundary() {
        return [
            {
                x: 0,
                y: -5
            },
            {
                x: -5,
                y: 5
            },
            {
                x: 5,
                y: 5
            }
        ];
    }

    checkLap(lapRow) {
        let boundary = [];
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.dir + HALF_PI);
        this.calcBoundary().forEach(v => {
            let vec = createVector(v.x + this.pos.x, v.y + this.pos.y);
            boundary.push(vec);
        });
        pop();
        if (collideLinePoly(lapRow[0], lapRow[1], lapRow[2], lapRow[3], boundary)) {
            console.log("LAP");
        }
    }

    checkCollision(obstacles) {
        let boundary = [];
        fill(51, 0, 0);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.dir + HALF_PI);
        this.calcBoundary().forEach(v => {
            let vec = createVector(v.x + this.pos.x, v.y + this.pos.y);
            boundary.push(vec);
        });
        pop();
        if (collidePolyPoly(
                boundary,
                [createVector(0, 0), createVector(0, height), createVector(width, height), createVector(width, 0)],
                false,
                false
            )) {
                noLoop();
                background(255, 0, 0, 50);
            }
        if (obstacles && (collidePolyPoly(boundary, obstacles[0], false, false) || collidePolyPoly(boundary, obstacles[1], false, false))) {
            noLoop();
            background(255, 0, 0, 50);
        }
    }

    show() {
        push();
        rectMode(CENTER);
        translate(this.pos.x, this.pos.y);
        rotate(this.dir + HALF_PI);

        strokeWeight(1);
        stroke(255);
        fill(0);
        
        beginShape();
        this.calcBoundary().forEach(v => {
            vertex(v.x, v.y);
        });
        endShape(CLOSE);

        strokeWeight(4);
        stroke(255, 0, 0);
        point(0, 0);
        pop();
    }
}