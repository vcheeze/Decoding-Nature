var lsys = [];
var turtles = [];
var counter;
var yoff = 0.0, aoff = 0.0;
var angles = [];
var xposition = 1.5;
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
	// c = color('#415242');
	// colors[6] = c;
	// c = color('#888A58');
	// colors[7] = c;
	// c = color('#CEC168');
	// colors[8] = c;
	// c = color('#FEFCFA');
	// colors[9] = c;
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  var ruleset = [];
  // ruleset[0] = new Rule('F', "FF+[+F-F-F]-[-F+F+F]");

  ruleset[0] = new Rule('X', "F[−X][X]F[−X]+FX");
  ruleset[1] = new Rule('F', "FF");
  // axiom = X

  // ruleset[0] = new Rule('F', "FF+F-F+F+FF");
  // axiom = F+F+F+F

  for (var i = 0; i < 5; i++) {
    var h = random(6, 8);
    lsys[i] = new LSystem("X", ruleset);
    turtles[i] = new Turtle(lsys[i].getSentence(), height/h, radians(25));
    angles[i] = random(-PI/3, -PI/2);
  }

  addColors();

  for (var i = 0; i < random(3, 6); i++) {
    fish[i] = new Fish(colors[i]);
  }

  counter = 0;
}

function draw() {
  background(26);

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

  fill(0);
  //text("Click mouse to generate", 10, height-10);



  for (var i = 0; i < turtles.length; i++) {
    push();
    if (i === 1) {
      translate(width/1.5, height);
    }
    else if (i === 2) {
      translate(width/2, height);
    }
    else if (i === 3) {
      translate(width/2.5, height);
    }
    else if (i === 4) {
      translate(width/3, height);
    }
    else {
      translate(width/4, height);
    }
    // translate(width/xposition, height);
    rotate(angles[i]);
    // rotate(-PI/2);
    // rotate(-radians(75));
    turtles[i].render();


    if (counter < 5) {
      push();
      lsys[i].generate();
      //println(lsys.getSentence());
      turtles[i].setToDo(lsys[i].getSentence());
      turtles[i].changeLen(0.5);
      pop();
      //redraw();
    }
    turtles[i].move();
    pop();
  }

  for (var j = 0; j < fish.length; j++) {
    fish[j].update();
    fish[j].display();
  }

  counter++;
}
