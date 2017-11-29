'use strict';

class Cell {
  constructor(x_, y_, w_) {
    this.x = x_;
    this.y = y_;
    this.w = w_;

    this.state = Math.floor(random(2));
    this.previous = this.state;
    this.history = 0;
    this.ratio = 0;
  }

  savePrevious() {
    this.previous = this.state;
  }

  addHistory() {
    if (this.state === 1) {
      this.history++;
    }
  }

  newState(s) {
    this.state = s;
  }

  display() {
    // if (this.previous === 0 && this.state == 1) fill(0,0,255);
    // else if (this.state == 1) fill(0);
    // else if (this.previous == 1 && this.state === 0) fill(255,0,0);
    // if (this.state === 0) fill(0);
    // else fill(255);
    let c = map(this.ratio, 0, 1, 0, 255);
    fill(c);
    stroke(255);
    rect(this.x, this.y, this.w, this.w);
  }
}
