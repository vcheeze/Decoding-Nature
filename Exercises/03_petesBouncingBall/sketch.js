var ball;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	ball = new Ball();
}

function draw() {
	background(0);
	ball.move();
	ball.bounce();
	ball.display();
}


function Ball() {
	this.location = createVector(0, 0);
	this.acceleration = createVector(0.1, 0.1);
	this.velocity = createVector(0, 0);	

	this.move = function() {
		var mouse = createVector(mouseX, mouseY);
		mouse.sub(this.location);
		mouse.mult(0.05);
		this.acceleration = mouse;
		this.velocity.add(this.acceleration);
		this.velocity.limit(10);
		this.location.add(this.velocity)
	}

	this.bounce = function() {
		if (this.location.x >= width || this.location.x <= 0) {
			this.acceleration.x *= -1;
			this.velocity.x *= -1;
		}
		if (this.location.y >= height || this.location.y <= 0) {
			this.acceleration.y *= -1;
			this.velocity.y *= -1;
		}
	}

	this.display = function() {
		stroke(255);
		strokeWeight(4);
		noFill();
		ellipse(this.location.x, this.location.y, 100, 100);
	}
}