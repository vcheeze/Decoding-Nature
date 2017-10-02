/**
Pete is the predator.

He exists in a world of Good and Evil spectrum --> the closer pete is to the Good side, the more passive he is.
The closer pete is to the Evil side, the more aggresive he is. His walking pattern is guided by the mouse.

Define random points that would appear over time at random points on the canvas. These are the prey.
The prey disappear if pete catches up to them.
*/


var pete;
var prey;
var prey_x, prey_y, prey_size;
var osc;
var playing = false;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	pete = new Pete();
    prey = new Prey();
    osc = new p5.SinOsc(960);
    osc.amp(0);
}

function draw() {
	background(color('#49BEAA')); // 1F9472 04746C 3A9266
    push();
    fill(color('#EF767A')); // F35F46 DE2130 E62B13
    noStroke();
    rect(0, 0, width/2, height);
    pop();

	pete.update();
	pete.display();
    prey.update();
    prey.display();
}


// Pete object
function Pete() {
    this.r = 7.5;
    this.position = createVector(115, 85);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0.1, 0.1)

    // Update Pete's position --> allows it to move
    this.update = function() {
        var direction = createVector(prey_x, prey_y);
        direction.sub(this.position);
        if (Math.abs(direction.x) <= prey_size && Math.abs(direction.y) <= prey_size) {
            print('Collide!');
            // Play sound
            osc.start();
            osc.amp(0.5, 0.05);
            playing = true;
            osc.stop(0.5);
            // Prey gets bigger
            prey.explode();
        }

        if (this.position.x > width/2) {
            direction.mult(0.001);
            this.acceleration = direction;
            this.velocity.add(this.acceleration);
            this.velocity.limit(5);
            this.position.add(this.velocity);
        }
        else {
            direction.mult(0.01);
            this.acceleration = direction;
            this.velocity.add(this.acceleration);
            this.velocity.limit(10);
            this.position.add(this.velocity);
        }
        
        // Bouncing functionality
        if (this.position.x >= width) {
            this.acceleration.x *= -1;
            this.velocity.x *= -1;
        }
        if (this.position.y >= height || this.position.y <= 0) {
            this.acceleration.y *= -1;
            this.velocity.y *= -1;
        }
    };

    // Defines the look of Pete
    this.display = function() {
        // Draw a triangle rotated in the direction of velocity
        var theta = this.velocity.heading() + radians(90);
        fill(127);
        stroke(200);
        push();
        translate(this.position.x,this.position.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.r*2);
        vertex(-this.r, this.r*2);
        vertex(this.r, this.r*2);
        endShape(CLOSE);
        pop();
    };
}

function keyPressed() {
    if (pete.position.x > width/2) {
        if (keyCode === UP_ARROW) {
            pete.velocity.y -= 5;
        }
        else if (keyCode === DOWN_ARROW) {
            pete.velocity.y += 5;
        }
        else if (keyCode === LEFT_ARROW) {
            pete.velocity.x -= 5;
        }
        else if (keyCode === RIGHT_ARROW) {
            pete.velocity.x += 5;
        }
    }
}


function Prey() {
    this.position = createVector(width/2, height/2);
    this.noff = createVector(random(1000), random(1000));
    this.size = 10;

    this.update = function() {
        this.position.x = map(noise(this.noff.x), 0, 1, 0, width);
        this.position.y = map(noise(this.noff.y), 0, 1, 0, height);
        this.noff.add(0.01, 0.01, 0);
        prey_x = this.position.x;
        prey_y = this.position.y;
    }

    this.display = function() {
        stroke(0);
        fill(100);
        ellipse(this.position.x, this.position.y, this.size, this.size);
    }

    this.explode = function() {
        this.size += 20;
        if (this.size >= 150)
            this.size = 0;
    }

    prey_size = this.size;
}