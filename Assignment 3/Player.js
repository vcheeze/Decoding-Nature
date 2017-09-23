'use strict';

class Player {
	constructor(x, y) {
		this.position = createVector(x, y);
		this.velocity = createVector(0, -1);
		this.r = 1;
	}

	update(x, y) {
		let prev_x = this.position.x;
		let prev_y = this.position.y;

		this.position.x = x;
		this.position.y = y;

		this.velocity.x = x - prev_x;
		this.velocity.y = y - prev_y;
		print(this.velocity.x, this.velocity.y);
	}

	display() {
		let theta = this.velocity.heading() + radians(90);
        fill(255);
        stroke(200);
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.r*2);
        vertex(-this.r, this.r*2);
        vertex(this.r, this.r*2);
        endShape(CLOSE);
        pop();
	}
}