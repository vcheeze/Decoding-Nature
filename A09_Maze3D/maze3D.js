var sceneWidth, sceneHeight;
var camera;
var scene;
var renderer;
var dom;
var sun;
var universe;
var spaceShip;
var starFields = [];

init();

function init() {
	// set up the scene
	createScene();

	var controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.maxPolarAngle = Math.PI * 0.5;
	controls.minDistance = 10;
	controls.maxDistance = 500;

	//call game loop
	update();
}

function createScene() {
  sceneWidth = window.innerWidth;
  sceneHeight = window.innerHeight;
  scene = new THREE.Scene(); // the 3d scene
  // scene.fog = new THREE.FogExp2( 0xf0fff0, 0.14 );
  camera = new THREE.PerspectiveCamera( 60, sceneWidth/sceneHeight, 0.1, 1000 ); // perspective camera
  renderer = new THREE.WebGLRenderer( { alpha: true } ); // renderer with transparent backdrop
  renderer.setClearColor( 0xfffafa, 1 );
  renderer.shadowMap.enabled = true; // enable shadow
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize( sceneWidth, sceneHeight );
  dom = document.getElementById( 'TutContainer' );
	dom.appendChild( renderer.domElement );

	universe = new Universe( scene, 75, 40 ); // scene, size, sides

	spaceShip = new SpaceShip( scene, 0, 0, 75 );
	let stars;
	for ( let i = 0; i < 4; i++ ) {
		 stars = new StarField( scene );
		 starFields.push( stars );
	}

	addLight();

	// camera.position.z = 10;
	camera.position.z = 10;
	window.addEventListener( 'resize', onWindowResize, false ); // resize callback

	document.onkeydown = handleKeyDown;

  var infoText = document.createElement('div');
	infoText.style.position = 'absolute';
	infoText.style.width = 100;
	infoText.style.height = 100;
	infoText.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
	infoText.style.color = "white";
	infoText.innerHTML = "Game Instructions";
	infoText.style.top = 10 + 'px';
	infoText.style.left = 10 + 'px';
	document.body.appendChild(infoText);
}

function handleKeyDown( keyEvent ) {
	if ( keyEvent.keyCode === 65) { // a: left
		universe.mesh.rotateY( THREE.Math.degToRad(-1) );
		let axis = new THREE.Vector3( 0, 1, 0 );
		for ( let i = 0; i < starFields.length; i++ ) {
			starFields[i].rotate( axis, THREE.Math.degToRad(-1) );
		}
	}
	else if ( keyEvent.keyCode === 87) { // w: up
		universe.mesh.rotateX( THREE.Math.degToRad(-1) );
		let axis = new THREE.Vector3( 1, 0, 0 );
		for ( let i = 0; i < starFields.length; i++ ) {
			starFields[i].rotate( axis, THREE.Math.degToRad(-1) );
		}
	}
	else if ( keyEvent.keyCode === 68 ) { // d: right
		universe.mesh.rotateY(THREE.Math.degToRad(1));
		let axis = new THREE.Vector3( 0, 1, 0 );
		for ( let i = 0; i < starFields.length; i++ ) {
			starFields[i].rotate( axis, THREE.Math.degToRad(1) );
		}
	}
	else if ( keyEvent.keyCode === 83) { // s: down
		universe.mesh.rotateX( THREE.Math.degToRad(1) );
		let axis = new THREE.Vector3( 1, 0, 0 );
		for ( let i = 0; i < starFields.length; i++ ) {
			starFields[i].rotate( axis, THREE.Math.degToRad(1) );
		}
	}
	else if ( keyEvent.keyCode === 71) { // g: forward
		universe.mesh.position.z += 1;
		for ( let i = 0; i < starFields.length; i++ ) {
			starFields[i].move( true );
		}
	}
	else if ( keyEvent.keyCode === 72) { // h: backward
		universe.mesh.position.z -= 1;
		for ( let i = 0; i < starFields.length; i++ ) {
			starFields[i].move( false );
		}
	}
}

function addLight() {
	var hemisphereLight = new THREE.HemisphereLight( 0xfffafa, 0x000000, 0.5 );
	scene.add( hemisphereLight );
	sun = new THREE.DirectionalLight( 0xcdc1c5, 0.4 );
	sun.position.set( 12, 6, -7 );
	sun.castShadow = true;
	scene.add( sun );
	// set up shadow properties for the sun light
	sun.shadow.mapSize.width = 256;
	sun.shadow.mapSize.height = 256;
	sun.shadow.camera.near = 0.5;
	sun.shadow.camera.far = 50 ;
}

function update() {
  render();
	requestAnimationFrame( update ); // request next update
}

function render() {
    renderer.render( scene, camera ); // draw
}

function onWindowResize() {
	// resize & align
	sceneHeight = window.innerHeight;
	sceneWidth = window.innerWidth;
	renderer.setSize( sceneWidth, sceneHeight );
	camera.aspect = sceneWidth / sceneHeight;
	camera.updateProjectionMatrix();
}
