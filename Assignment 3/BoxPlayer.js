'use strict'

class BoxPlayer {
	constructor(x, y) {
		this.position = createVector(x, y);
		this.width = 400/15;

		this.env = new p5.Env();
		this.env.setADSR(0.001, 0.2, 0.2, 0.5);
		this.env.setRange(1.0, 0);
		
		// map the frequency to the y coordinate
		if (y > 0 && y <= 200) {
			this.osc = new p5.SinOsc(map(y, 200, 0, 130.8, 261.6));
		}
		else if (y > -200 && y <= 0) {
			this.osc = new p5.SinOsc(map(y, 0, -200, 261.6, 523.3));
		}
		else {
			this.osc = new p5.SinOsc(440); // default set to middle A
		}
		this.osc.amp(0);
		this.playing = false;
	}

	contains(m) {
		if (this.position.dist(m.position) < 5) { // mover is inside this box
			// play the sound
			this.osc.start();
			this.osc.amp(this.env);
			this.env.play();
			this.playing = true;
			this.osc.stop(0.2);
		}
	}

	display() {
		push();
		rectMode(CENTER);
		stroke(255, 100);
		strokeWeight(2);
		noFill();
		// fill(255, 100);
		rect(this.position.x, this.position.y, this.width, this.width);
		pop();
	}
}