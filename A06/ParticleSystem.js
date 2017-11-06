'use strict';

class ParticleSystem {
  constructor() {
  	this.origin = createVector(random(-width/4, width/4), random(-height/4, height/4), random(-50, 50));
    // this.origin = createVector(0, 0, 10);
  	this.particles = [];
    this.addParticles();
  }

  addParticles() {
    for (let i = 0; i < 75; i++) {
  	   this.particles.push(new Particle(this.origin));
    }
  }

  run() {
  	for (var i = this.particles.length-1; i >= 0; i--) {
      var p = this.particles[i];
      p.run();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
};
