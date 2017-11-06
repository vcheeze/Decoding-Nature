'use strict';

class Flock {
  constructor() {
    // An array for all the boids
    this.boids = []; // Initialize the array
  }

  run(pitch, amplitude) {
    for (var i = 0; i < this.boids.length; i++) {
      this.boids[i].run(this.boids, pitch, amplitude);  // Passing the entire list of boids to each boid individually
    }
  }

  addBoid(b) {
    this.boids.push(b);
  }
}
