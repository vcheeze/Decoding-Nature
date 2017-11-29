function Turtle(s, l, t) {
  this.todo = s;
  this.len = l;
  this.theta = t;
  this.r = random();

  this.render = function() {
    stroke(color('#9ACD32'));
    strokeWeight(0.8);
    for (var i = 0; i < this.todo.length; i++) {
      var c = this.todo.charAt(i);
      if (c === 'F' || c === 'G') {
        line(0, 0, this.len, 0);
        translate(this.len, 0);
      }
      else if (c === '+') {
        rotate(this.theta);
      }
      else if (c === '-') {
        rotate(-this.theta);
      }
      else if (c === '[') {
        push();
      }
      else if (c === ']') {
        pop();
      }
    }
  };

  this.move = function() {
    // move by Perlin noise
    this.theta = map(noise(this.r), 0, 1, radians(-75), radians(0));
    this.r += 0.005;

    // move by oscillation
    // var period = 120;
    // this.theta = sin(frameCount / period) + radians(60);
  };

  this.setLen = function(l) {
    this.len = l;
  };

  this.changeLen = function(percent) {
    this.len *= percent;
  };

  this.setToDo = function(s) {
    this.todo = s;
  };
}
