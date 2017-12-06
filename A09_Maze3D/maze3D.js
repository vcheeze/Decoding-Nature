/**
 * Have the final rendezvous point always visible to the mover
 * so that the object will be clear.
 */

'use strict';

// var sceneWidth, sceneHeight;
// var camera, scene;
// var renderer;
// var controls;
// var dom;
// var sun;
// var universe;
// var spaceShip;
// var starFields = [];
//
var camera, scene, renderer, controls;
var objects = [];
var raycaster;
var maze = document.getElementById('Maze3D');

var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

if ( havePointerLock ) {
	let element = document.body;

	let pointerlockchange = function( event ) {
		if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
			controlsEnabled = true;
			controls.enabled = true;
			maze.style.display = 'none';
		} else {
			controls.enabled = false;
			maze.style.display = 'block';
		}
	};

	let pointerlockerror = function( event ) {
		console.log("Pointer Lock Error!");
	}

	// Hook pointer lock state change events
	document.addEventListener( 'pointerlockchange', pointerlockchange, false );
	document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
	document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

	document.addEventListener( 'pointerlockerror', pointerlockerror, false );
	document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
	document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );
	document.addEventListener( 'click', function ( event ) {
		// Ask the browser to lock the pointer
		element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
		element.requestPointerLock();
	}, false );
}

init();
animate();

var controlsEnabled = false;

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();

function init() {
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xFFFFFF );
	scene.fog = new THREE.Fog( 0xFFFFFF, 0, 750 );

	let light = new THREE.HemisphereLight( 0xEEEEFF, 0X777788, 0.75 );
	light.position.set( 0.5, 1, 0.75 );
	scene.add( light );

	controls = new THREE.PointerLockControls( camera );
	scene.add( controls.getObject() );
	let onKeyDown = function ( event ) {
		switch ( event.keyCode ) {
			case 38: // up
			case 87: // w
				moveForward = true;
				break;
			case 37: // left
			case 65: // a
				moveLeft = true;
				break;
			case 40: // down
			case 83: // s
				moveBackward = true;
				break;
			case 39: // right
			case 68: // d
				moveRight = true;
				break;
		}
	};
	let onKeyUp = function ( event ) {
		switch( event.keyCode ) {
			case 38: // up
			case 87: // w
				moveForward = false;
				break;
			case 37: // left
			case 65: // a
				moveLeft = false;
				break;
			case 40: // down
			case 83: // s
				moveBackward = false;
				break;
			case 39: // right
			case 68: // d
				moveRight = false;
				break;
		}
	};
	// document.addEventListener( 'keydown', onKeyDown, false );
	// document.addEventListener( 'keyup', onKeyUp, false );

	raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	requestAnimationFrame( animate );
	if ( controlsEnabled === true ) {
		raycaster.ray.origin.copy( controls.getObject().position );
		raycaster.ray.origin.y -= 10;
		var intersections = raycaster.intersectObjects( objects );
		var onObject = intersections.length > 0;
		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;
		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;
		velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
		direction.z = Number( moveForward ) - Number( moveBackward );
		direction.x = Number( moveLeft ) - Number( moveRight );
		direction.normalize(); // this ensures consistent movements in all directions
		if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
		if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;
		if ( onObject === true ) {
			velocity.y = Math.max( 0, velocity.y );
			canJump = true;
		}
		controls.getObject().translateX( velocity.x * delta );
		controls.getObject().translateY( velocity.y * delta );
		controls.getObject().translateZ( velocity.z * delta );
		if ( controls.getObject().position.y < 10 ) {
			velocity.y = 0;
			controls.getObject().position.y = 10;
			canJump = true;
		}
		prevTime = time;
	}
	renderer.render( scene, camera );
}

// init();
//
// function init() {
// 	// set up the scene
// 	createScene();
//
// 	let controls = new THREE.OrbitControls( camera, renderer.domElement );
// 	controls.maxPolarAngle = Math.PI * 0.5;
// 	controls.minDistance = 10;
// 	controls.maxDistance = 500;
//
// 	//call game loop
// 	update();
// }
//
// function createScene() {
//   sceneWidth = window.innerWidth;
//   sceneHeight = window.innerHeight;
//   scene = new THREE.Scene();
//   // scene.fog = new THREE.FogExp2( 0xf0fff0, 0.14 );
//   camera = new THREE.PerspectiveCamera( 60, sceneWidth/sceneHeight, 0.1, 1000 ); // perspective camera
//   renderer = new THREE.WebGLRenderer( { alpha: true } ); // renderer with transparent backdrop
//   renderer.setClearColor( 0xfffafa, 1 );
//   renderer.shadowMap.enabled = true; // enable shadow
//   renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//   renderer.setSize( sceneWidth, sceneHeight );
//   dom = document.getElementById( 'Maze3D' );
// 	dom.appendChild( renderer.domElement );
//
// 	universe = new Universe( scene, 75, 40 ); // scene, size, sides
//
// 	spaceShip = new SpaceShip( scene, 0, 0, 75 );
// 	let stars;
// 	for ( let i = 0; i < 6; i++ ) {
// 		 stars = new StarField( scene );
// 		 starFields.push( stars );
// 	}
//
// 	addLight();
//
// 	camera.position.z = 10;
// 	window.addEventListener( 'resize', onWindowResize, false ); // resize callback
//
// 	document.onkeydown = handleKeyDown;
//
// 	// instruction text: how to play the game
//   let infoText = document.createElement('div');
// 	infoText.style.position = 'absolute';
// 	infoText.style.width = 100;
// 	infoText.style.height = 100;
// 	infoText.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
// 	infoText.style.color = "white";
// 	infoText.style.fontFamily = "sans-serif";
// 	infoText.innerHTML = "Game Instructions";
// 	infoText.style.top = 10 + 'px';
// 	infoText.style.left = 10 + 'px';
// 	document.body.appendChild(infoText);
// }
//
// // keyboard controls
// function handleKeyDown( keyEvent ) {
// 	if ( keyEvent.keyCode === 65) { // a: left
// 		universe.mesh.rotateY( THREE.Math.degToRad(-1) );
// 		let axis = new THREE.Vector3( 0, 1, 0 );
// 		for ( let i = 0; i < starFields.length; i++ ) {
// 			starFields[i].rotate( axis, THREE.Math.degToRad(-1) );
// 		}
// 	}
// 	else if ( keyEvent.keyCode === 87) { // w: up
// 		universe.mesh.rotateX( THREE.Math.degToRad(-1) );
// 		let axis = new THREE.Vector3( 1, 0, 0 );
// 		for ( let i = 0; i < starFields.length; i++ ) {
// 			starFields[i].rotate( axis, THREE.Math.degToRad(-1) );
// 		}
// 	}
// 	else if ( keyEvent.keyCode === 68 ) { // d: right
// 		universe.mesh.rotateY(THREE.Math.degToRad(1));
// 		let axis = new THREE.Vector3( 0, 1, 0 );
// 		for ( let i = 0; i < starFields.length; i++ ) {
// 			starFields[i].rotate( axis, THREE.Math.degToRad(1) );
// 		}
// 	}
// 	else if ( keyEvent.keyCode === 83) { // s: down
// 		universe.mesh.rotateX( THREE.Math.degToRad(1) );
// 		let axis = new THREE.Vector3( 1, 0, 0 );
// 		for ( let i = 0; i < starFields.length; i++ ) {
// 			starFields[i].rotate( axis, THREE.Math.degToRad(1) );
// 		}
// 	}
// 	else if ( keyEvent.keyCode === 71) { // g: forward
// 		universe.mesh.position.z += 1;
// 		for ( let i = 0; i < starFields.length; i++ ) {
// 			starFields[i].move( true );
// 		}
// 	}
// 	else if ( keyEvent.keyCode === 72) { // h: brakes
// 		universe.mesh.position.z -= 1;
// 		for ( let i = 0; i < starFields.length; i++ ) {
// 			starFields[i].move( false );
// 		}
// 	}
// }
//
// // add lighting
// function addLight() {
// 	let hemisphereLight = new THREE.HemisphereLight( 0xfffafa, 0x000000, 0.5 );
// 	scene.add( hemisphereLight );
// 	sun = new THREE.DirectionalLight( 0xcdc1c5, 0.4 );
// 	sun.position.set( 48, 24, 7 );
// 	sun.castShadow = true;
// 	scene.add( sun );
// 	// set up shadow properties for the sun light
// 	sun.shadow.mapSize.width = 256;
// 	sun.shadow.mapSize.height = 256;
// 	sun.shadow.camera.near = 0.5;
// 	sun.shadow.camera.far = 50 ;
// }
//
// function update() {
//   render();
// 	requestAnimationFrame( update ); // request next update
// }
//
// function render() {
//     renderer.render( scene, camera ); // draw
// }
//
// function onWindowResize() {
// 	// resize & align
// 	sceneHeight = window.innerHeight;
// 	sceneWidth = window.innerWidth;
// 	renderer.setSize( sceneWidth, sceneHeight );
// 	camera.aspect = sceneWidth / sceneHeight;
// 	camera.updateProjectionMatrix();
// }
