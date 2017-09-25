// rose petal reference: https://en.wikipedia.org/wiki/File:Rose-rhodonea-curve-7x9-chart-improved.svg

var pDrawer;
var angle = 0;
var i = 0, k;
var mode = [1, 3, 2, 3/2, 5/3, 7/6, 7/9, 5/9, 3/5, 3/4, 4/5, 3/8, Math.E];
var boxes = [];
var soundType = [];
var grid = false, noTrail = true;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	background(0);
	pDrawer = new PatternDrawer(0, 0);

	// x coord: width/2 - 200 --> width/2 + 200
	// y coord: height/2 + 200 --> height/2 -200
	push();
	translate(width/2, height/2);
	for (var x = -200; x <= 200; x += 400/15) {
		for (var y = -200; y <= 200; y += 400/15) {
			var temp = new BoxPlayer(x, y);
			boxes.push(temp);
		}
	}
	if (grid) {
		drawBoxes();
	}
	pop();
	// print(boxes);
}


function draw() {
	if (noTrail) {
		background(0);
		if (grid) {
			push();
			translate(width/2, height/2);
			drawBoxes();
			pop();
		}
	}

	k = mode[i];

	translate(width/2, height/2);

	var amplitude = 200;

	var x = cos(k*angle) * cos(angle) * amplitude;
	var y = cos(k*angle) * sin(angle) * amplitude;
	// print(x, y);
	
	angle += 0.01;

	pDrawer.update(x, y);
	pDrawer.display();

	checkBoxes();

	// stroke(255);
	// fill(255);
	// ellipse(x, y, 2, 2);
	// point(x, y);
}


function drawBoxes() {
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].display();
	}
}


function checkBoxes() {
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].contains(pDrawer);
	}
}


function eraseBoxes() {
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].drawRect = false;
	}
}


function showBoxes() {
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].drawRect = true;
	}
}


function keyPressed() {
    if (keyCode === UP_ARROW) {
    	background(0);
    	if (grid) {
    		drawBoxes();
    	}
        if (i === mode.length - 1) {
        	i = 0;
        }
        else {
        	i++;
        }
    }
    else if (keyCode === DOWN_ARROW) {
    	background(0);
    	if (grid) {
    		drawBoxes();
    	}
    	if (i === 0) {
        	i = mode.length - 1;
        }
        else {
        	i--;
        }
    }
    else if (keyCode === 71) { // press G key
    	grid = !grid;
    	if (grid) {
    		drawBoxes();
    	}
    	else {
    		background(0);
    	}
    }
    else if (keyCode === 32) { // press space bar
    	showBoxes();
    	noTrail = !noTrail;
    	if (!noTrail) {
    		eraseBoxes();
    	}
    }
}