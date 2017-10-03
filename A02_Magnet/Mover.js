/**
	The Mover class
*/
var Mover = function(color) {
	this.mass = 2;
	this.position = createVector(random(width), 0);
	this.velocity = createVector(0, 0.1);
	this.acceleration = createVector(0, 0);
	this.charge = random(0.1, 0.5);
	this.noff = createVector(random(1000), random(1000));

	this.applyForce = function(force) {
		var f = p5.Vector.div(force, this.mass);
		this.acceleration.add(f);
	};

	this.update = function(attractor) {
		var distance = p5.Vector.dist(this.position, attractor.position);

		// if (this.position.y > 500) {
		if (distance < 200) {
			print("Inside force zone");
			var force = attractor.calculateAttraction(this);
			this.applyForce(force);
			this.velocity.add(this.acceleration);
			this.position.add(this.velocity);
			this.acceleration.mult(0);
		}
		else {
			print("Outside force zone");
			this.position.x = map(noise(this.noff.x), 0, 1, 0, width);
	        this.position.y = map(noise(this.noff.y), 0, 1, 150, height);
	        this.noff.add(0.01, 0.01, 0);
	    	// print(this.position.x, temp.x);
	    	// print(this.position.y, temp.y);
		}
    };

	this.bounce = function() {
		if (this.position.x >= width-this.mass*8 || this.position.x < this.mass*8) {
            this.acceleration.x *= -1;
            this.velocity.x *= -1;
        }
        if (this.position.y > height - (this.mass*8)) {
			this.velocity.y *= -0.5;
			this.position.y = height - (this.mass*8);
		}
	};

	this.display = function() {
		stroke(0);
	    strokeWeight(2);
	    fill(color);
	    ellipse(this.position.x, this.position.y, this.mass*16, this.mass*16);
	};
};