'use strict'

class BoxPlayer {
	constructor(x, y) {
		this.colors = [];
		this.addColors();

		this.drawRect = true;

		this.position = createVector(x, y);
		this.width = 400/15;

		this.env = new p5.Env();
		this.env.setADSR(0.001, 0.2, 0.2, 0.5);
		this.env.setRange(1.0, 0);

		// map the frequency to the y coordinate
		if (y > 0 && y <= 200) {
			this.osc = new p5.SawOsc(map(y, 200, 0, 130.8, 261.6));
		}
		else if (y > -200 && y <= 0) {
			this.osc = new p5.SawOsc(map(y, 0, -200, 261.6, 523.3));
		}
		else {
			this.osc = new p5.SawOsc(440); // default set to middle A
		}
		this.osc.amp(0);
		this.playing = false;
	}

	update() {
		push();
		rectMode(CENTER);
		stroke(255, 100);
		strokeWeight(2);
		fill(this.colors[Math.floor(random() * this.colors.length)]);
		rect(this.position.x, this.position.y, this.width, this.width);
		pop();
	}

	contains(m) {
		if (this.position.dist(m.position) < 5) { // mover is inside this box
			// play the sound
			this.osc.start();
			this.osc.amp(this.env);
			this.env.play();
			this.playing = true;
			this.osc.stop(0.2);

			if (this.drawRect) {
				this.update();
			}
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

	addColors() {
		var c;
		c = color('#E53D00');
		this.colors[0] = c;
		c = color('#FFE900');
		this.colors[1] = c;
		c = color('#2274A5');
		this.colors[2] = c;
		c = color('#21A0A0');
		this.colors[3] = c;
		c = color('#046865');
		this.colors[4] = c;
		c = color('#DBBBF5');
		this.colors[5] = c;
		c = color('#DDF0FF');
		this.colors[6] = c;
		c = color('#632B30');
		this.colors[7] = c;
		c = color('#F9A03F');
		this.colors[8] = c;
	}
}