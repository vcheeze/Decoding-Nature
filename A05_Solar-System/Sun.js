'use strict';

class Sun {
	constructor() {
		this.position = createVector(0, 0, 0);
		this.mass = 1990000;
		this.diameter = 1390;
		this.G = 1; // gravitational constant: 0.00000006674
	}

	calculateAttraction(p) { // takes a planet as the parameter
		let force = p5.Vector.sub(this.position, p.position);
		let distance = force.mag();
		distance = constrain(distance, 5, 25); //********* change this value later *********//
		force.normalize();
		let strength = (this.G * this.mass * p.mass) / (distance * distance);
		force.mult(strength);

		return force;
	}

	display() {
		// fill(color('#FFE066'));
		ambientMaterial(color('#FFE066'));
		translate(this.position.x, this.position.y, this.position.z);
		sphere(10);
	}
}
