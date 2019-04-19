let car;

function setup() {
    createCanvas(windowWidth * 0.9, windowHeight * 0.9);
    car = new Car(createVector(100, 100), 0);
    collideDebug(true);
}

function draw() {
    background(51);

    if (keyIsPressed) {
        if (keyIsDown(87)) car.accelerate(0.1);
        if (keyIsDown(83)) car.accelerate(-0.1);
        if (keyIsDown(65)) car.steer(-0.1);
        if (keyIsDown(68)) car.steer(0.1);
    }
    car.update();
    car.show()
}