'use strict';

class Planet {
	constructor(m, d, name) {
		this.position = createVector(width/2, height/2);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);

    this.name = name; // name of the planet
		this.mass = m;
		this.diameter = d;
	}


	display() {
		ellipseMode(CENTER);
		noStroke();
		fill(color('#FFE066')); // FDE74C
		ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
	}
}
