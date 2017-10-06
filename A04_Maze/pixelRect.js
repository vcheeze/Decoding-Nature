'use strict';

class pixelRect {
	constructor(rightMode, winZoneWidth, color) {
		this.w = random(50, 200);
		this.h = random(50, 200);

		if (rightMode) {
			this.x = map(random(), 0, 1, winZoneWidth, width-this.w-winZoneWidth);
			this.y = map(random(), 0, 1, 0, height-this.h);
		}
		else {
			this.x = map(random(), 0, 1, winZoneWidth, width-this.w-winZoneWidth);
			this.y = map(random(), 0, 1, 0, height-this.h);
		}

		this.visibility = 25;
		this.maxDistance = dist(0, 0, this.visibility, this.visibility);

		this.shrink = random();

		if (color % 2 === 0) {
			this.c = 255;
		}
		else {
			this.c = 0;
		}
	}

	modifyMaxDistance() {
		this.maxDistance = dist(0, 0, this.visibility, this.visibility);
	}

	collide(A) {
		for (let x = this.x; x <= this.x+this.w; x+=2) {
			for (let y = this.y; y <= this.y+this.h; y+=2) {
				let position = createVector(x, y);
				let distance = Math.abs(p5.Vector.dist(A.position, position));
				if (distance < 10 && this.shrink >= 0.15) {
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
				if (this.shrink < 0.15) {
					if (distance < this.maxDistance && distance > 15) {
						stroke(this.c);
						point(x, y);
					}
				}
				else {
					if (distance < this.maxDistance) {
						stroke(this.c);
						point(x, y);
					}
				}
			}
		}
	}

	displayAll() {
		for (let x = this.x; x <= this.x+this.w; x+=2) {
			for (let y = this.y; y <= this.y+this.h; y+=2) {
				stroke(this.c);
				point(x, y);
			}
		}
	}
}