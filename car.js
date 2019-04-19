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
            rotate(this.dir);
            if (collideLineLine(
                0, 0, lineNeg60.x, lineNeg60.y,
                obstacles[0][i].x, obstacles[0][i].y, obstacles[0][i + 1].x, obstacles[0][i + 1].y
                )) console.log("line -60 collision");
            if (collideLineLine(
                0, 0, lineNeg30.x, lineNeg30.y, 
                obstacles[0][i].x, obstacles[0][i].y, obstacles[0][i + 1].x, obstacles[0][i + 1].y
                )) console.log("line -30 collision");
            if (collideLineLine(
                0, 0, line0.x, line0.y, 
                obstacles[0][i].x, obstacles[0][i].y, obstacles[0][i + 1].x, obstacles[0][i + 1].y
                )) console.log("line 0 collision");
            if (collideLineLine(
                0, 0, linePos30.x, linePos30.y, 
                obstacles[0][i].x, obstacles[0][i].y, obstacles[0][i + 1].x, obstacles[0][i + 1].y
                )) console.log("line 30 collision");
            if (collideLineLine(
                0, 0, linePos60.x, linePos60.y, 
                obstacles[0][i].x, obstacles[0][i].y, obstacles[0][i + 1].x, obstacles[0][i + 1].y
                )) console.log("line 60 collision");
            line(0, 0, linePos60.x, linePos60.y);
            pop();
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

/*
line(82, 54, 118, 57);
line(118, 57, 151, 55);
line(151, 55, 185, 55);
line(185, 55, 232, 63);
line(232, 63, 274, 67);
line(274, 67, 364, 60);
line(364, 60, 468, 72);
line(468, 72, 568, 73);
line(568, 73, 640, 70);
line(640, 70, 685, 78);
line(685, 78, 719, 105);
line(719, 105, 736, 144);
line(736, 144, 744, 208);
line(744, 208, 749, 269);
line(749, 269, 750, 324);
line(750, 324, 754, 360);
line(754, 360, 755, 412);
line(755, 412, 732, 468);
line(732, 468, 710, 487);
line(710, 487, 647, 506);
line(647, 506, 604, 511);
line(604, 511, 526, 532);
line(526, 532, 463, 526);
line(463, 526, 409, 520);
line(409, 520, 364, 525);
line(364, 525, 312, 519);
line(312, 519, 271, 516);
line(271, 516, 217, 505);
line(217, 505, 176, 498);
line(176, 498, 118, 458);
line(118, 458, 89, 411);
line(89, 411, 73, 349);
line(73, 349, 64, 294);
line(64, 294, 55, 249);
line(55, 249, 53, 204);
line(53, 204, 54, 164);
line(54, 164, 51, 138);
line(51, 138, 53, 97);
line(53, 97, 60, 65);
line(60, 65, 83, 54);
*/