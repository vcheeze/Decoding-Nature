var Attractor = function(x, y, r) { // x and y coordinates, r: radius
	this.position = createVector(x, y);
	this.velocity = createVector(-5, 0);
	this.field = createVector(random(0.75, 1), random(0.75, 1)); // determine appropriate values later

	this.calculateAttraction = function(m) {
		var force = p5.Vector.sub(this.position, m.position);
		force.normalize();

		var magnetic = m.velocity.mag() * m.charge;
		force.mult(magnetic);
		force.mult(this.field.mag());
		print(force.mag());
		return force;
	};

	this.update = function() { // goes back and forth at the bottom
		this.position.add(this.velocity);

		// bounce off the edges
		if (this.position.x > width - r || this.position.x < r)
			this.velocity.x *= -1;
	};

	this.display = function() {
		ellipseMode(CENTER);
		strokeWeight(4);
		stroke(0);
		fill(101, 200);
		ellipse(this.position.x, this.position.y, r*2, r*2);
	};
};