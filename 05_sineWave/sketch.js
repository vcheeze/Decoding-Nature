var angle = 0;

function setup() {
	createCanvas(640, 360);
	rectMode(CENTER);
}

function draw() {
	background(220);
	noStroke();
	fill(255, 200);
	for (var i = 0; i < width; i+= 24) {
		var y = height / 2;
		var amplitude = 100;
		y += sin(angle) * amplitude;
		ellipse(i, y, 48, 48);
		angle += 0.24;
	}
}