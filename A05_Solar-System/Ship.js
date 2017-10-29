'use strict';

class Ship {
  constructor() {
    this.position = createVector(random(width/10), random(height/10), 100);
    this.velocity = createVector(0, 0, 0);
    this.acceleration = createVector(0, 0, 0);
    this.mass = 0.001;

    this.color = 255;
    this.lifespan = 255.0;
  }

  applyForce(force) {
  	var f = p5.Vector.div(force, this.mass);
  	this.acceleration.add(f);
  }

  update() {
  	this.velocity.add(this.acceleration);
  	this.position.add(this.velocity);
  	this.acceleration.mult(0);
    this.lifespan -= 0.2;
  }

  display() {
    ambientMaterial(255, this.lifespan);
		push();
		translate(this.position.x, this.position.y, this.position.z);
		// torus(2.5, 1);
    sphere(2.5);
		pop();
  }

  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    }
    else {
      return false;
    }
  }
}
