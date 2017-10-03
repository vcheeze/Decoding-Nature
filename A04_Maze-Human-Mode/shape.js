'use strict';

class Shape { // draws a random shape
	constructor() {
		this.x = width/2;
		this.y = height/2;
		this.i = Math.floor(random(4));

		this.Ex = map(random(), 0, 1, 0, width);
		this.Ey = map(random(), 0, 1, 0, height);
		this.Ew = random(50, 200);
		this.Eh = random(50, 200);
		this.Ex = constrain(this.Ex, this.Ew, width-this.Ew);
		this.Ey = constrain(this.Ey, this.Eh, height-this.Eh);

		this.Tx1 = map(random(), 0, 1, 0, width);
		this.Ty1 = map(random(), 0, 1, 0, height);
		this.Tx2 = this.Tx1 + map(random(), 0, 1, -250, 250);
		this.Ty2 = this.Ty1 + map(random(), 0, 1, -250, 250);
		this.Tx3 = this.Tx1 + map(random(), 0, 1, -250, 250);
		this.Ty3 = this.Ty1 + map(random(), 0, 1, -250, 250);
		this.Tx1 = constrain(this.Tx1, 0, width);
		this.Ty1 = constrain(this.Ty1, 0, height);
		this.Tx2 = constrain(this.Tx2, 0, width);
		this.Ty2 = constrain(this.Ty2, 0, height);
		this.Tx3 = constrain(this.Tx3, 0, width);
		this.Ty3 = constrain(this.Ty3, 0, height);

		this.Rx = map(random(), 0, 1, 0, width);
		this.Ry = map(random(), 0, 1, 0, height);
		this.Rw = random(50, 200);
		this.Rh = random(50, 200);
		this.Rtl = random(0, 75);
		this.Rtr = random(0, 75);
		this.Rbr = random(0, 75);
		this.Rbl = random(0, 75);
		this.Rx = constrain(this.Rx, 0, width-this.Rw);
		this.Ry = constrain(this.Ry, 0, height-this.Rh);

		this.Qx1 = map(random(), 0, 1, 0, width);
		this.Qy1 = map(random(), 0, 1, 0, height);
		this.Qx2 = this.Qx1 + map(random(), 0, 1, -250, 250);
		this.Qy2 = this.Qy1 + map(random(), 0, 1, -250, 250);
		this.Qx3 = this.Qx1 + map(random(), 0, 1, -250, 250);
		this.Qy3 = this.Qy1 + map(random(), 0, 1, -250, 250);
		this.Qx4 = this.Qx1 + map(random(), 0, 1, -250, 250);
		this.Qy4 = this.Qy1 + map(random(), 0, 1, -250, 250);
		this.Qx1 = constrain(this.Qx1, 0, width);
		this.Qy1 = constrain(this.Qy1, 0, height);
		this.Qx2 = constrain(this.Qx2, 0, width);
		this.Qy2 = constrain(this.Qy2, 0, height);
		this.Qx3 = constrain(this.Qx3, 0, width);
		this.Qy3 = constrain(this.Qy3, 0, height);
		this.Qx4 = constrain(this.Qx4, 0, width);
		this.Qy4 = constrain(this.Qy4, 0, height);
	}

	display() {
		if (this.i == 0) {
			noStroke();
			fill(125);
			ellipse(this.Ex, this.Ey, this.Ew, this.Eh);
		}
		else if (this.i == 1) {
			noStroke();
			fill(125);
			triangle(this.Tx1, this.Ty1, this.Tx2, this.Ty2, this.Tx3, this.Ty3);
		}
		else if (this.i == 2) {
			rectMode(CORNER);

			noStroke();
			fill(125);
			rect(this.Rx, this.Ry, this.Rw, this.Rh, this.Rtl, this.Rtr, this.Rbr, this.Rbl);
		}
		else {
			noStroke();
			fill(125);
			quad(this.Qx1, this.Qy1, this.Qx2, this.Qy2, this.Qx3, this.Qy3, this.Qx4, this.Qy4);
		}
	}
}