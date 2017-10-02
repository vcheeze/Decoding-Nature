'use strict';

class pixelRect {
	constructor() {
		this.x = map(random(), 0, 1, 20, width);
		this.y = map(random(), 0, 1, 20, height);
		// this.x = 20;
		// this.y = height/2;
		this.w = random(50, 200);
		this.h = random(50, 200);
		this.x = constrain(this.x, this.w, width-this.w-45);
		this.y = constrain(this.y, this.h, height-this.h);

		this.visibility = 25;
		this.maxDistance = dist(0, 0, this.visibility, this.visibility);

		this.shrink = random();
	}

	modifyMaxDistance() {
		this.maxDistance = dist(0, 0, this.visibility, this.visibility);
	}

	collide(A) {
		for (let x = this.x; x <= this.x+this.w; x+=2) {
			for (let y = this.y; y <= this.y+this.h; y+=2) {
				let position = createVector(x, y);
				let distance = Math.abs(p5.Vector.dist(A.position, position));
				if (distance < 10 && this.shrink >= 0.2) {
					return true;
				}
			}
		}
		return false;
	}


	display(A) { // pass in a mover object
		for (let x = this.x; x <= this.x+this.w; x+=2) {
			for (let y = this.y; y <= this.y+this.h; y+=2) {
				let position = createVector(x, y);
				let distance = Math.abs(p5.Vector.dist(A.position, position));
				if (this.shrink < 0.2) {
					if (distance < this.maxDistance && distance > 15) {
						distance = map(distance, 0, this.maxDistance, 255, 0);				
						fill(distance);
						point(x, y);
					}
				}
				else {
					if (distance < this.maxDistance) {
						distance = map(distance, 0, this.maxDistance, 255, 0);				
						fill(distance);
						point(x, y);
					}
				}
			}
		}
	}

	displayAll() {
		for (let x = this.x; x <= this.x+this.w; x+=2) {
			for (let y = this.y; y <= this.y+this.h; y+=2) {
				fill(255);
				point(x, y);
			}
		}
	}
}