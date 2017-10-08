'use strict';

class Sun {
	constructor() {
		this.position = createVector(width/2, height/2);
		this.mass = 50;
		this.diameter = 50;
		this.G = 1;
	}

	calculateAttraction(p) { // takes a planet as the parameter
		let force = p5.Vector.sub(this.position, p.position);
		let distance = force.mag();
		distance = constrain(5, 25); //********* change this value later *********//
		force.normalize();
		let strength = (this.G * this.mass * p.mass) / (distance * distance);
		force.mult(strength);

		return force;
	}

	display() {
		ellipseMode(CENTER);
		noStroke();
		fill(color('#FFE066')); // FDE74C
		ellipse(width/2, height/2, this.diameter, this.diameter);
	}
}
