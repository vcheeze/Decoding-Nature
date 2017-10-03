/**
	Mover's home
	Movers
	Magnetic force: F = qvB (http://hyperphysics.phy-astr.gsu.edu/hbase/magnetic/magfor.html)
		magnitude of the force: F = qvB sinθ where θ < 180

	If a Mover senses the force above a certain level, it will be able to find its home.
	It not, it just wanders around randomly.
*/
var yoff = 0.0;
var home;
var fish = [];
var colors = [];

function addColors() {
	var c;
	c = color('#ED4942');
	colors[0] = c;
	c = color('#F7A455');
	colors[1] = c;
	c = color('#F6DB77');
	colors[2] = c;
	c = color('#66DFAD');
	colors[3] = c;
	c = color('#338078');
	colors[4] = c;
	c = color('#1E2622');
	colors[5] = c;
	c = color('#415242');
	colors[6] = c;
	c = color('#888A58');
	colors[7] = c;
	c = color('#CEC168');
	colors[8] = c;
	c = color('#FEFCFA');
	colors[9] = c;
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);

	home = new Attractor(width/2, height-30, 30);

	addColors();

	for (var i = 0; i < random(3, 10); i++) {
		fish[i] = new Mover(colors[i]);
	}
}

function draw() {
	background(51);

	// ambientLight(100);
	// pointLight(250, 250, 250, 100, 100, 0);
	// ambientMaterial(250);

	// draw waves to simulate water
	fill(color('#A8E0FF'));
	noStroke();
	beginShape();
	var xoff = 0;
	for (var x = 0; x <= width; x += 10) {
		var y = map(noise(xoff, yoff), 0, 1, 150, 250);
		vertex(x, y);
		xoff += 0.05;
	}
	yoff += 0.01;
	vertex(width, height);
	vertex(0, height);
	endShape(CLOSE);

	fill(0, 180);
	arc(width/2, height, 420, 420, PI, TWO_PI);

	home.display();

	for (var i = 0; i < fish.length; i++) {
		fish[i].update(home);
		fish[i].display();
		fish[i].bounce();
	}
}
