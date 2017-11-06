'use strict';

class Particle {
  constructor(position) {
    this.acceleration = createVector(random(-0.05, 0.05), random(-0.05, 0.05), random(-0.05, 0.05));
    this.velocity = createVector(random(-1, 1), random(-1, 1), random(-1, 1));
    this.position = position.copy();
    this.lifespan = 255.0;
  }

  run() {
    this.update();
    this.display();
  }

  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
  }

  // Method to display
  display() {
    ambientMaterial(255, this.lifespan);
    push();
    translate(this.position.x, this.position.y, this.position.z);
    sphere(1);
    pop();
  }

  // Is the particle still useful?
  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
