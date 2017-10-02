var adventurer;
var shapes = [];
var collision;
var victory;
var playing = false;


function preload() {
	collision = loadSound('assets/collision.mp3');
	victory = loadSound('assets/victory.mp3');
}


function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	init();
}


function draw() {
	background(0);
	noStroke();
	fill(color('#68EDC6'))
	rect(width-45, 0, 45, height);

	var force = adventurer.calculateAttraction();
	adventurer.applyForce(force);

	adventurer.update();
	adventurer.display();

	if (gameover()) {
		victory.setVolume(0.1);
		if (!playing) {
			victory.jump(0, 10);
			playing = true;
		}
		drawAllShapes();
	}
	else {
		drawShapes();

		if (checkCollision()) {
			background(color('#FF0000'));
			collision.setVolume(0.1);
			collision.jump(4, 1);
			init();
		}
	}
}


function init() {
	adventurer = new Adventurer();

	shapes.length = 0; // reset the array

	for (var i = 0; i <= Math.floor(random(20, 30)); i++) { // add random shapes
		var temp = new pixelRect();
		shapes.push(temp);
	}
}

function drawShapes() {
	for (var i = 0; i < shapes.length; i++) {
		if (shapes[i].display(adventurer)) {
			return true;
		}
	}
	return false;
}

function drawAllShapes() {
	for (var i = 0; i < shapes.length; i++) {
		shapes[i].displayAll();
	}
}


function checkCollision() {
	for (var i = 0; i < shapes.length; i++) {
		if (shapes[i].collide(adventurer)) {
			return true;
		}
	}
	return false;
}

function gameover() {
	if (adventurer.position.x > width-30) {
		return true;
	}
}

function increaseVisibility() {
	for (var i = 0; i < shapes.length; i++) {	
		shapes[i].visibility += 10;
		shapes[i].visibility = constrain(shapes[i].visibility, 25, 100);
		shapes[i].modifyMaxDistance();
	}
}

function decreaseVisibility() {
	for (var i = 0; i < shapes.length; i++) {
		shapes[i].visibility -= 10;
		shapes[i].visibility = constrain(shapes[i].visibility, 25, 100);
		shapes[i].modifyMaxDistance();
	}
}

function keyPressed() {
	if (keyCode == 32) {
		init();
	}
	else if (keyCode == UP_ARROW) {
		increaseVisibility();
	}
	else if (keyCode == DOWN_ARROW) {
		decreaseVisibility();
	}
}