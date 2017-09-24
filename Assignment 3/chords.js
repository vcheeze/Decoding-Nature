// rose petal reference: https://en.wikipedia.org/wiki/File:Rose-rhodonea-curve-7x9-chart-improved.svg

var player;
var angle = 0;
var i = 0, k;
var mode = [1, 3, 2, 3/2, 5/3, 7/6, 7/9, 5/9, 3/5, 3/4, 4/5, 3/8, Math.E];

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	background(0);
	player = new Player(width/2, height/2);
}


function draw() {
	// background(0);
	k = mode[i];

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
    	background(0);
        if (i === mode.length - 1) {
        	i = 0;
        }
        else {
        	i++;
        }
    }
    else if (keyCode === DOWN_ARROW) {
    	background(0);
    	if (i === 0) {
        	i = mode.length - 1;
        }
        else {
        	i--;
        }
    }
}