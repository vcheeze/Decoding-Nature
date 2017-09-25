'use strict'

class BoxPlayer {
	constructor(x, y) {
		this.position = createVector(x, y);
		this.width = 10;
		this.osc = new p5.SinOsc(map(x, 0, width, 65.41, 1047));
		osc.amp(0);
		this.playing = false;
	}

	contains(m) {
		if (this.position.dist(m.position) < 10) { // mover is inside this box
			// play the sound
			osc.start();
			osc.amp(0.5, 0.05);
			playing = true;
			osc.stop(0.5);
		}
	}
}