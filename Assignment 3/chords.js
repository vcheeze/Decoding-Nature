// rose petal reference: https://en.wikipedia.org/wiki/File:Rose-rhodonea-curve-7x9-chart-improved.svg

var player;
var angle = 0;
var n = 7;
var d = 6;
var k;
var mode = [7/6, 7/9, Math.E, 4/5, 3/4, 3/5, 3/8, 5/9]

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	
	player = new Player(width/2, height/2);
}


function draw() {
	background(0);
	k = n/d;

	translate(width/2, height/2);

	var amplitude = 200;

	var x = cos(k*angle) * cos(angle) * amplitude;
	var y = cos(k*angle) * sin(angle) * amplitude;
	// print(x, y);
	
	// var r = cos(k*angle) * amplitude;

	angle += 0.1;

	player.update(x, y);
	player.display();

	// stroke(255);
	// fill(255);
	// ellipse(x, y, 2, 2);
	// point(x, y);
}


function keyPressed() {
    if (keyCode === UP_ARROW) {
        n += 0.125;
        print(n);
    }
    else if (keyCode === RIGHT_ARROW) {
    	d += 0.125;
    }
}