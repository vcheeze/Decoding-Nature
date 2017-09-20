function setup() {
    createCanvas(640, 360);
    background(127);
}

function draw() {
    var xloc = randomGaussian();
    var yloc = randomGaussian();
  
    var x_sd = 40;
    var y_sd = 20;
    xloc = (xloc * x_sd) + width/2;
    yloc = (yloc * y_sd) + height/2;
  
    fill(256, 10);
    noStroke();
    ellipse(xloc, yloc, 20, 20);
}