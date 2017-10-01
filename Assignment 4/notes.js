// Make this into a game
// 

var pDrawer;
var i = 0, k;
var boxes = [];
var soundType = [];
var grid = false;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	pDrawer = new PatternDrawer();

	for (var x = 400/15; x <= 400+400/15; x += 400/15) {
		for (var y = 400/15; y <= 400+400/15; y += 400/15) {
			var temp = new BoxPlayer(x, y);
			boxes.push(temp);
		}
	}
	if (grid) {
		drawBoxes();
	}
	// print(boxes);
}


function draw() {
	background(0);
	var force = pDrawer.calculateAttraction();
	pDrawer.applyForce(force);

	pDrawer.update();
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
}