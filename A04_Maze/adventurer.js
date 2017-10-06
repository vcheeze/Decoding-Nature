'use strict';

class Adventurer {
	constructor(rightMode) {
		if (rightMode) {
			this.position = createVector(15, height/2);
		}
		else {
			this.position = createVector(width-15, height/2);
		}
		this.velocity = createVector(0, 0);
		this.acceleration = createVector(0, 0);
		this.r = 5;
	}

	calculateAttraction() {
		let mouse = createVector(mouseX, mouseY);
		let G = 1;
		let mass = 50;

		let force = p5.Vector.sub(mouse, this.position);
		force.normalize();
		let distance = p5.Vector.dist(mouse, this.position);
		distance *= 0.5;
		let strength = (distance * distance) / (G * mass * this.r);
		force.mult(strength);

		return force;
	}

	applyForce(force) {
		let f = p5.Vector.div(force, this.r);
		this.acceleration.add(f);
	}

	update() {
		this.velocity.add(this.acceleration);
		this.velocity.mult(0.75);
		this.velocity.limit(5);
		this.position.add(this.velocity);
		this.acceleration.mult(0);
	}

	display() {
		let theta = this.velocity.heading() + radians(90);
        fill(100);
        stroke(200);
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.r*2);
        vertex(-this.r, this.r*2);
        vertex(this.r, this.r*2);
        endShape(CLOSE);
        pop();
	}
}