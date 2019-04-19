class Car {
    constructor(pos, dir, brain) {
        this.dir = dir;
        this.pos = pos;
        this.vel = 0;
        this.acc = 0;
        this.brain = new Brain(brain);
    }

    drive(obstacles) {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.dir);
        let lineNeg60 = createVector(1, 0).setMag(50).rotate(PI / 3);
        let lineNeg30 = createVector(1, 0).setMag(50).rotate(PI / 6);
        let line0 = createVector(1, 0).setMag(50);
        let linePos30 = createVector(1, 0).setMag(50).rotate(-PI / 6);
        let linePos60 = createVector(1, 0).setMag(50).rotate(-PI / 3);
        stroke(255, 0, 0);
        line(0, 0, lineNeg60.x, lineNeg60.y);
        line(0, 0, lineNeg30.x, lineNeg30.y);
        line(0, 0, line0.x, line0.y);
        line(0, 0, linePos30.x, linePos30.y);
        line(0, 0, linePos60.x, linePos60.y);
        pop();
        for (let i = 0; i < obstacles[0].length - 1; i++) {
            let CurrentObstacle = {
                x: obstacles[0][i].x,
                y: obstacles[0][i].y
            }, NextObstacle = {
                x: obstacles[0][i + 1].x,
                y: obstacles[0][i + 1].y
            };

            push();
            translate(this.pos.x, this.pos.y);
            pop();
            if (collideLineLine(
                0, 0, lineNeg60.x, lineNeg60.y,
                CurrentObstacle.x, CurrentObstacle.y, NextObstacle.x, NextObstacle.y
                )) console.log("line -60 collision");
            if (collideLineLine(
                0, 0, lineNeg30.x, lineNeg30.y, 
                CurrentObstacle.x, CurrentObstacle.y, NextObstacle.x, NextObstacle.y
                )) console.log("line -30 collision");
            if (collideLineLine(
                0, 0, line0.x, line0.y, 
                CurrentObstacle.x, CurrentObstacle.y, NextObstacle.x, NextObstacle.y
                )) console.log("line 0 collision");
            if (collideLineLine(
                0, 0, linePos30.x, linePos30.y, 
                CurrentObstacle.x, CurrentObstacle.y, NextObstacle.x, NextObstacle.y
                )) console.log("line 30 collision");
            if (collideLineLine(
                0, 0, linePos60.x, linePos60.y, 
                CurrentObstacle.x, CurrentObstacle.y, NextObstacle.x, NextObstacle.y
                )) console.log("line 60 collision");
                stroke(0);
                line(0, 0, linePos60.x, linePos60.y);
            }
        
        stroke(0, 255, 0);
        stroke(0);
        let inputs = [
            [lineNeg60.x, lineNeg60.y],
            [lineNeg30.x, lineNeg30.y],
            [line0.x, line0.y],
            [linePos30.x, linePos30.y],
            [linePos60.x, linePos60.y]
        ];
        //return this.brain.predict(inputs);
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
        return [{
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