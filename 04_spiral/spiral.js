var angle = 0;
var angularAcceleration = 0;
var angularVelocity = 0.05;
var radius = 0;
var shrink = false;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	// background(0); // uncomment when drawing spiral
	rectMode(CENTER);
}

function draw() {
	/*======== Oscillating on x axis ========*/
	// background(0);
	// angle += angularVelocity;

	// var amplitude = 100;
	// var frequency = 0.5;
	// var period = TWO_PI * frameCount/120;

	// var x = sin(period) * amplitude;
	// var y = 0;
	/*=======================================*/
	
	/*========== Drawing a spiral ==========*/
	var x = cos(angle) * radius;
	var y = sin(angle) * radius;

	if (shrink === false) {
		radius += 1;
	}
	else {
		radius -= 1;
	}

	radius = constrain(radius, 0, 500);
	if (radius === 500) {
		shrink = true;
	}
	else if (radius === 0) {
		shrink = false;
	}
	/*======================================*/

	push();
	translate(width/2, height/2);
	noFill();
	stroke(255);
	rect(x, y, 25, 25);
	pop();
}