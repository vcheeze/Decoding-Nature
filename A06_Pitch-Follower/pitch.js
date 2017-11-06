'use strict';

var flock;
var playing = false;
var mic;
var fft;


function setup() {
	createCanvas(window.innerWidth, window.innerHeight);

	flock = new Flock();
	for (let i = 0; i < 60; i++) {
		let b = new Boid(width/2, height/2);
		flock.addBoid(b);
	}

	mic = new p5.AudioIn();
	mic.start();
	fft = new p5.FFT();
	fft.setInput(mic);
}

function draw() {
	background(51);

	let micLevel = mic.getLevel();
	print(micLevel);
	micLevel = constrain(micLevel, 0.01, 0.55)
	micLevel = map(micLevel, 0.01, 0.55, height, 0);
	// print(micLevel);

	let spectrum = fft.analyze();
	let centroid = fft.getCentroid(); // get the spectral centroid of the sound
	// print(centroid);
	centroid = constrain(centroid, 1000, 4000);
	centroid = map(centroid, 1000, 4000, 0, width); // what values are best?

	flock.run(centroid, micLevel);
}
