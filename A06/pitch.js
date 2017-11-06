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
	flock.run();

	let micLevel = mic.getLevel();
	// print(micLevel);
	micLevel = map(micLevel, 0, 0.7, 0, height);

	let spectrum = fft.analyze();
	let centroid = fft.getCentroid(); // get the spectral centroid of the sound
	// print(centroid);
	centroid = map(centroid, 40, 4000, 0, width); // what values are best?
}
