var adventurer;
var x = 0, y = 0;
var shapes = [];
var winZone = 45; // width of the win zone
var collision;
var victory;
var prime;
var playing = false;
var isRightMode = true;
var won = false, dead = false;
var level = 1;
var levelText = 1;
var label = "Level: " + levelText;
var colors = []; // colors of the background
var colorIndex = 0;


function preload() {
	collision = loadSound('assets/collision.mp3');
	victory = loadSound('assets/victory.mp3');
	prime = loadFont('assets/Prime_Regular.otf');
}


function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	addColors();
	init();
}


function draw() {
	/*========== Draws the environment ==========*/
	if (isRightMode) {
		background(colors[colorIndex]);
		noStroke();
		if (colorIndex == colors.length-1) {
			fill(colors[0]);
		}
		else {
			fill(colors[colorIndex+1]);
		}
		rect(width-winZone, 0, winZone, height);
	}
	else {
		background(colors[colorIndex]);
		noStroke();
		if (colorIndex == colors.length-1) {
			fill(colors[0]);
		}
		else {
			fill(colors[colorIndex+1]);
		}
		rect(0, 0, winZone, height);
	}
	/*===========================================*/

	/*========== Flip the mode of the game ==========*/
	if ((won && isRightMode && adventurer.position.x < width-winZone) ||
		(won && !isRightMode && adventurer.position.x > winZone)) {
		print("Flipping the mode!");
		victory.stop();
		isRightMode = !isRightMode;
		colorIndex++;
		if (colorIndex == colors.length) {
			colorIndex = 0;
		}
		won = false;
		level += 5;
		levelText++;
		init();
	}
	/*===============================================*/

	/*== Text label displaying the current level ==*/
	textFont(prime, 48);
	fill(255);
	textAlign(CENTER, TOP);
	text(label, width/2, 15);
	/*=============================================*/

	/*========== Draws the adventurer ==========*/
	var force = adventurer.calculateAttraction(x, y);
	adventurer.applyForce(force);

	adventurer.update();
	adventurer.display();
	/*==========================================*/

	/*========== Game over condition ==========*/
	if (gameover()) {
		victory.setVolume(0.1);
		if (!playing) {
			victory.jump(0, 10);
			playing = true;
		}

		won = true;

		drawAllShapes();
	}
	else if (!dead) {
		playing = false;

		drawShapes();

		if (checkCollision()) {
			background(color('#FF0000'));
			collision.setVolume(0.1);
			collision.jump(4, 1);
			dead = true;
		}
	}
	else if (dead) {
		drawAllShapes();
		if ((isRightMode && adventurer.position.x < winZone) ||
			(!isRightMode && adventurer.position.x > width-winZone)) {
			init();
		}
		label = "";
		textFont(prime, 36);
		fill(255);
		textAlign(CENTER, CENTER);
		text("Sorry! Return to your starting position to play again.", width/2, height/2);
	}
	/*=========================================*/
}


function addColors() {
	var c;
	c = color('#000000');
	colors[0] = c;
	c = color('#68EDC6');
	colors[1] = c;
	c = color('#593959');
	colors[2] = c;
	c = color('#91E5F6');
	colors[3] = c;
	c = color('#272838');
	colors[4] = c;
	c = color('#EA638C');
	colors[5] = c;
}

function init() {
	adventurer = new Adventurer(isRightMode);

	shapes.length = 0; // reset the array

	label = "Level: " + levelText;

	if (level === 1) {
		for (var i = 0; i <= Math.floor(random(level)); i++) { // add random shapes
			var p = new pixelRect(isRightMode, winZone, colorIndex);
			shapes.push(p);
		}
	}
	else {
		for (var i = 0; i <= Math.floor(random(level-5, level)); i++) { // add random shapes
			var p = new pixelRect(isRightMode, winZone, colorIndex);
			shapes.push(p);
		}
	}

	dead = false;
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
	if ((isRightMode && adventurer.position.x > width-winZone) ||
		(!isRightMode && adventurer.position.x < winZone)) {
		return true;
	}
	return false;
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

function receiveOsc(address, value) {
	// console.log("received OSC: " + address + ", " + value);
	if (address == '/0/xcoord') {
		if (value >= 0) {
			x = map(value,0,320,0,width);
		}
	}
	if (address == '/0/ycoord') {
		if (value >= 0) {
			y = map(value,0,240,0,height);
		}
	}
}

//*****************Connect to Websocket*****************//
function setupOsc(oscPortIn, oscPortOut) {
	socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
	socket.on('connect', function() {
		socket.emit('config', {
			server: { port: oscPortIn,  host: '127.0.0.1'},
			client: { port: oscPortOut, host: '127.0.0.1'}
		});
	});
	socket.on('message', function(msg) {
		if (msg[0] == '#bundle') {
			for (var i = 2; i < msg.length; i++) {
				receiveOsc(msg[i][0], msg[i].splice(1));
			}
		} else {
			receiveOsc(msg[0], msg.splice(1));
		}
	});
}