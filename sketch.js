let car;

function setup() {
    createCanvas(windowWidth * 0.9, windowHeight * 0.9);
    car = new Car(createVector(100, 100), createVector());
    collideDebug(true);
}

function draw() {
    background(51);

    if (keyIsPressed) {
        if (keyIsDown(87)) car.accelerate();
        if (keyIsDown(83)) car.decelerate();
        if (keyIsDown(65)) car.steer(0.01);
        if (keyIsDown(68)) car.steer(-0.01);
    }
    car.update();
    car.show()
}