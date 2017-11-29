// Koch Curve
// Renders a simple fractal, the Koch snowflake
// Each recursive level drawn in sequence

var lines = [];   // A list to keep track of all the lines

function setup() {
  createCanvas(640, 360);
  var a = createVector(425, 125);
  var b = createVector(225, 125);
  var c = a.copy();
  var v = p5.Vector.sub(b, a);
  v.rotate(-PI/3);
  c.add(v);

  lines.push(new KochLine(b, a));
  lines.push(new KochLine(c, b));
  lines.push(new KochLine(a, c));

  for (var i = 0; i < 5; i++) {
    generate();
  }
}

function draw() {
  background(51);
  for (var i = 0; i < lines.length; i++) {
  	var l = lines[i];
    l.display();
  }
}

function generate() {
  var next = [];    // Create emtpy list
  for (var i = 0; i < lines.length; i++) {
  	var l = lines[i];
    // Calculate 5 koch p5.Vectors (done for us by the line object)
    var a = l.kochA();
    var b = l.kochB();
    var c = l.kochC();
    var d = l.kochD();
    var e = l.kochE();
    // Make line segments between all the p5.Vectors and add them
    next.push(new KochLine(a, b));
    next.push(new KochLine(b, c));
    next.push(new KochLine(c, d));
    next.push(new KochLine(d, e));
  }
  lines = next;
}
