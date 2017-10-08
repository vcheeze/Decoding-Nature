// Model of a solar system
// Contains accurate scales of:
//     Planet size
//     Planet orbit trajectory
//     Planet orbit velocity
//     Distance from planet to sun
// some resources:
//     http://nineplanets.org/data1.html
//     https://solarsystem.nasa.gov/docs/modelingsolarsystem_20070112.pdf

// colors: 50514F, F25F5C, 247BA0, 70C1B3, 5BC03B, 9BC53D, E55934, FA7921


var sun;
var planets;


function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	sun = new Sun();
	addPlanets();
}

function draw() {
	background(0);

	sun.display();
}


function addPlanets() { // mass is multiplied by 10
	let p;
	p = new Planet(0.33, 4.88, "Mercury");
	planets.push(p);
	p = new Planet(4.9, 12.1, "Venus");
	planets.push(p);
	p = new Planet(6.0, 12.76, "Earth");
	planets.push(p);
	p = new Planet(0.64, 6.79, "Mars");
	planets.push(p);
	p = new Planet(1900, 143.0, "Jupiter");
	planets.push(p);
	p = new Planet(570, 120.5, "Saturn");
	planets.push(p);
	p = new Planet(87, 51.1, "Uranus");
	planets.push(p);
	p = new Planet(100, 49.5, "Neptune");
	planets.push(p);
}

function displayPlanets() {
	for (let i = 0; i < planets.length; i++) {
		planets[i].display();
	}
}
