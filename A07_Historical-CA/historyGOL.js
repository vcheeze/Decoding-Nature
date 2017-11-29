'use strict';

class GOL {
  constructor() {
    this.w = 8;
    this.columns = width/this.w;
    this.rows = height/this.w;

    // Game of life board
    this.board = new Array(this.columns);
    for (let i = 0; i < this.columns; i++) {
      this.board[i] = new Array(this.rows);
    }

    this.init();
}

  init() {
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.board[i][j] = new Cell(i*this.w, j*this.w, this.w);
      }
    }
  }

  // The process of creating the new generation
  generate(g) {
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.board[i][j].savePrevious();
        this.board[i][j].addHistory();
      }
    }

    // Loop through every spot in our 2D array and check spots neighbors
    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows; y++) {

        // Add up all the states in a 3x3 surrounding grid
        let neighbors = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            neighbors += this.board[(x+i+this.columns)%this.columns][(y+j+this.rows)%this.rows].previous;
          }
        }

        // A little trick to subtract the current cell's state since
        // we added it in the above loop
        neighbors -= this.board[x][y].previous;

        let lifeRatio = this.board[x][y].history / g;
        this.board[x][y].ratio = lifeRatio;
        let r = random();

        // Rules of Life
        // if ((this.board[x][y].state === 1)
        //     && (neighbors  <  2)) {
        //     // && (r < lifeRatio)) {
        //       this.board[x][y].newState(0);
        // }
        // else if ((this.board[x][y].state === 1)
        //          && (neighbors  >  3)) {
        //          // && (r < lifeRatio)) {
        //   this.board[x][y].newState(0);
        // }
        // else if ((this.board[x][y].state === 0)
        //          && (neighbors === 3)) {
        //          // && (r > lifeRatio)) {
        //   this.board[x][y].newState(1);
        // }

        if ((this.board[x][y].state === 1)
            && (neighbors  <  2)
            && (r < lifeRatio)) {
              this.board[x][y].newState(0);
        }
        else if ((this.board[x][y].state === 1)
                 && (neighbors  >  3)
                 && (r < lifeRatio)) {
          this.board[x][y].newState(0);
        }
        else if ((this.board[x][y].state === 0)
                 && (neighbors === 3)
                 && (r > lifeRatio)) {
          this.board[x][y].newState(1);
        }

        // else do nothing!
      }
    }
  }

  // This is the easy part, just draw the cells, fill 255 for '1', fill 0 for '0'
  display() {
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.board[i][j].display();
      }
    }
  }
}
