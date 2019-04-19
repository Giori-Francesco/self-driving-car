const obs = [
    [
        {
            x: 82,
            y: 54
        },
        {
            x: 118,
            y: 57
        }, {
            x: 151,
            y: 55
        }, {
            x: 185,
            y: 55
        }, {
            x: 232,
            y: 63
        }, {
            x: 274,
            y: 67
        }, {
            x: 364,
            y: 60
        }, {
            x: 468,
            y: 72
        }, {
            x: 568,
            y: 73
        }, {
            x: 640,
            y: 70
        }, {
            x: 685,
            y: 78
        }, {
            x: 719,
            y: 105
        }, {
            x: 736,
            y: 144
        }, {
            x: 744,
            y: 208
        }, {
            x: 749,
            y: 269
        }, {
            x: 750,
            y: 324
        }, {
            x: 754,
            y: 360
        }, {
            x: 755,
            y: 412
        }, {
            x: 732,
            y: 468
        }, {
            x: 710,
            y: 487
        }, {
            x: 647,
            y: 506
        }, {
            x: 604,
            y: 511
        }, {
            x: 526,
            y: 532
        }, {
            x: 463,
            y: 526
        }, {
            x: 409,
            y: 520
        }, {
            x: 364,
            y: 525
        }, {
            x: 312,
            y: 519
        }, {
            x: 271,
            y: 516
        }, {
            x: 217,
            y: 505
        }, {
            x: 176,
            y: 498
        }, {
            x: 118,
            y: 458
        }, {
            x: 89,
            y: 411
        }, {
            x: 73,
            y: 349
        }, {
            x: 64,
            y: 294
        }, {
            x: 55,
            y: 249
        }, {
            x: 53,
            y: 204
        }, {
            x: 54,
            y: 164
        }, {
            x: 51,
            y: 138
        }, {
            x: 53,
            y: 97
        }, {
            x: 60,
            y: 65
        }, {
            x: 83,
            y: 54
        }
    ],
    [
        {
        x: 113,
        y: 115
    }, {
        x: 180,
        y: 117
    }, {
        x: 214,
        y: 115
    }, {
        x: 258,
        y: 117
    }, {
        x: 307,
        y: 116
    }, {
        x: 381,
        y: 126
    }, {
        x: 446,
        y: 124
    }, {
        x: 523,
        y: 125
    }, {
        x: 590,
        y: 123
    }, {
        x: 647,
        y: 127
    }, {
        x: 677,
        y: 147
    }, {
        x: 689,
        y: 175
    }, {
        x: 691,
        y: 216
    }, {
        x: 697,
        y: 300
    }, {
        x: 702,
        y: 400
    }, {
        x: 694,
        y: 427
    }, {
        x: 674,
        y: 444
    }, {
        x: 631,
        y: 460
    }, {
        x: 519,
        y: 476
    }, {
        x: 294,
        y: 469
    }, {
        x: 195,
        y: 445
    }, {
        x: 155,
        y: 416
    }, {
        x: 130,
        y: 381
    }, {
        x: 99,
        y: 230
    }, {
        x: 93,
        y: 155
    }, {
        x: 113,
        y: 118
    }]
];
const lap = [50, 150, 90, 160]
let car;

function setup() {
    createCanvas(windowWidth * 0.9, windowHeight * 0.9);
    car = new Car(createVector(100, 100), 0, [5, 7, 7, 4]);
    collideDebug(true);
}

function draw() {
    background(51);

    obs.forEach(coll => {
        beginShape();
        noFill();
        coll.forEach(v => {
            vertex(v.x, v.y);
        });
        endShape(CLOSE);
    });

    push();
    strokeWeight(8);
    stroke(255);
    line(50, 150, 90, 160);
    pop();

    if (keyIsPressed) {
        if (keyIsDown(87)) car.accelerate(0.1);
        if (keyIsDown(83)) car.accelerate(-0.1);
        if (keyIsDown(65)) car.steer(-0.1);
        if (keyIsDown(68)) car.steer(0.1);
    }
    car.checkCollision(obs);
    car.update();
    car.show()
    car.checkLap(lap);
    car.drive(obs);
}

function mousePressed() {
    console.log("createVector(" + mouseX + ", " + mouseY + ")");    
}