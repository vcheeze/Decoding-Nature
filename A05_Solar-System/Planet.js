'use strict';

class Planet {
	constructor(name, m, s, v, d, e, c, angleY, angleX) {
		this.position = createVector(0, 0, 0);

		this.name = name;      // name of the planet
		this.mass = map(m, 0.33, 1900, 1, 100);         // mass of the planet
		this.size = s * 0.375; // diameter of the planet
		this.angle = 0;        // orbital angle
		this.velocity = map(v, 5.4, 47.9, 0.001, 0.01); // orbital speed
		this.distance = d;     // distance to the Sun in Astronomical Units
		this.e = e;            // eccentricity of the orbit
		this.color = c;        // color of the planet on the canvas
		this.angleY = angleY;  // inclination to Sun's equator
		this.angleX = angleX;  // inclination to invariable plane

		this.G = 1;
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
		ambientMaterial(this.color);
		push();
		rotateY(this.angleY);
		rotateX(this.angleX);
		translate(this.position.x, this.position.y, this.position.z);
		sphere(this.size);
		pop();
	}
}
