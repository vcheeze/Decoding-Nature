// rose petal reference: https://en.wikipedia.org/wiki/File:Rose-rhodonea-curve-7x9-chart-improved.svg

var angle = 0;
var k = Math.sqrt(2);;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	background(0);
}


function draw() {

	translate(width/2, height/2);

	var amplitude = 200;

	var x = cos(k*angle) * cos(angle) * amplitude;
	var y = cos(k*angle) * sin(angle) * amplitude;
	print(x, y);
	angle += 0.25;

	stroke(255);
	// fill(255);
	// ellipse(x, y, 2, 2);
	point(x, y);
}