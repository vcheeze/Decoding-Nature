// Using this variable to decide whether to draw all the stuff
var debug = true;

// A path object (series of connected points)
var path;

// Two vehicles
// var car1;
// var car2;
var flock;
var soff = 0;
var eoff = 0;
var xoff = 0;
var yoff = 0;

function setup() {
  var text = createP("Hit space bar to toggle debugging lines.<br>Click the mouse to generate a new path.");
  text.position(10,365);

  createCanvas(640, 360);
  newPath();

  // Each vehicle has different maxspeed and maxforce for demo purposes
  // car1 = new Vehicle(0, height/2, 2, 0.04);
  // car2 = new Vehicle(0, height/2, 3, 0.1);

  flock = new Flock();
  // Add an initial set of boids into the system
  for (var i = 0; i < 30; i++) {
    // var b = new Boid(width/2,height/2);
    var b = new Vehicle(0, height/2, random(1, 3), random(0.01, 0.1));
    flock.addBoid(b);
  }
  noiseSeed(Math.floor(random(10000)));
}

function draw() {
  background(51);
  // Display the path
  path.display();

  for (var i = 0; i < flock.boids.length; i++) {
    flock.boids[i].follow(path);
    flock.boids[i].run(flock.boids);
    flock.boids[i].borders(path);
  }


  // The boids follow the path
  // car1.follow(path);
  // car2.follow(path);
  // Call the generic run method (update, borders, display, etc.)
  // car1.run();
  // car2.run();

  // Check if it gets to the end of the path since it's not a loop
  // car1.borders(path);
  // car2.borders(path);


  // can also use sin cos to oscillate y value
  // path.points[0].y = map(noise(soff), 0, 1, 0, height);
  //
  // for (var i = 1; i < path.points.length-1; i++) {
  //   path.points[i].x = map(noise(xoff), 0, 1, 0, width);
  //   path.points[i].y = map(noise(yoff), 0, 1, 0, height);
  // }
  //
  // path.points[path.points.length-1].y = map(noise(eoff), 0, 1, 0, height);
  //
  // soff += 0.003;
  // yoff += 0.005;
  // xoff += 0.005;
  // eoff += 0.004;

  path.points[1].y = height/2 + sin(frameCount*0.003) * height/2;
  path.points[2].y = height/2 + sin(frameCount*0.005) * height/2;
  path.points[3].y = height/2 + cos(frameCount*0.004) * height/2;
}

function newPath() {
  // A path is a series of connected points
  // A more sophisticated path might be a curve
  path = new Path();
  path.addPoint(-20, height/2);
  path.addPoint(random(0, width/2), random(0, height));
  path.addPoint(random(width/2, width), random(0, height));
  path.addPoint(width+20, height/2);
}

function keyPressed() {
  if (key == ' ') {
    debug = !debug;
  }
  if (keyCode === 78) {
    print("new point!");
    var n = createVector(random(width), random(0, height));
    var index = 0;
    for (var i = 1; i < path.points.length-1; i++) {
      if (path.points[i].x > n.x) {
        index = i-1;
      }
    }
    if (index != 0) {
      path.points.splice(index, 0, n);
    }
    else {
      path.points.splice(1, 0, n);
    }
  }
}

function mousePressed() {
  newPath();
}
