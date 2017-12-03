var sceneWidth, sceneHeight;
var camera;
var scene;
var renderer;
var dom;
var sun;
var ground;
var rollingGroundSphere, heroSphere;
var rollingSpeed = 0.008, heroRollingSpeed;
var worldRadius = 26, heroRadius = 0.2;
var sphericalHelper;
var pathAngleValues;
var heroBaseY = 1.8;
var bounceValue = 0.1;
var gravity = 0.005;
var clock;


init();

function init() {
	// set up the scene
	createScene();

	//call game loop
	update();
}

function createScene() {
	clock = new THREE.Clock();
	clock.start();
	heroRollingSpeed = ( rollingSpeed*worldRadius/heroRadius ) / 5;
	sphericalHelper = new THREE.Spherical();
	pathAngleValues = [ 1.52, 1.57, 1.62 ];
    sceneWidth = window.innerWidth;
    sceneHeight = window.innerHeight;
    scene = new THREE.Scene();//the 3d scene
    scene.fog = new THREE.FogExp2( 0xf0fff0, 0.14 );
    camera = new THREE.PerspectiveCamera( 60, sceneWidth/sceneHeight, 0.1, 1000 );//perspective camera
    renderer = new THREE.WebGLRenderer( { alpha: true } );//renderer with transparent backdrop
    renderer.setClearColor( 0xfffafa, 1 );
    renderer.shadowMap.enabled = true; // enable shadow
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize( sceneWidth, sceneHeight );
    dom = document.getElementById( 'TutContainer' );
	dom.appendChild( renderer.domElement );
	addWorld();
	addHero();
	addLight();

	camera.position.z = 6.5;
	camera.position.y = 2.5;
	window.addEventListener( 'resize', onWindowResize, false ); // resize callback

	document.onkeydown = handleKeyDown;

  var infoText = document.createElement('div');
	infoText.style.position = 'absolute';
	infoText.style.width = 100;
	infoText.style.height = 100;
	infoText.style.backgroundColor = "yellow";
	infoText.innerHTML = "UP - Jump, Left/Right - Move";
	infoText.style.top = 10 + 'px';
	infoText.style.left = 10 + 'px';
	document.body.appendChild(infoText);
}

function handleKeyDown( keyEvent ) {
	if ( keyEvent.keyCode === 37) { // left

	} else if ( keyEvent.keyCode === 39) { // right

	} else {
		if ( keyEvent.keyCode === 38 ) { // up, jump

		}
	}
}

function addHero() {
	var sphereGeometry = new THREE.DodecahedronGeometry( heroRadius, 1);
	var sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xe5f2f2 ,shading:THREE.FlatShading} )
	heroSphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
	heroSphere.receiveShadow = true;
	heroSphere.castShadow = true;
	scene.add( heroSphere );
	heroSphere.position.y = heroBaseY;
	heroSphere.position.z = 4.8;
}

function addWorld() {
	var sides = 40;
	var tiers = 40;
	var sphereGeometry = new THREE.SphereGeometry( worldRadius, sides,tiers);
	var sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xfffafa, shading:THREE.FlatShading} )

	rollingGroundSphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
	rollingGroundSphere.receiveShadow = true;
	rollingGroundSphere.castShadow = false;
	rollingGroundSphere.rotation.z = -Math.PI/2;
	scene.add( rollingGroundSphere );
	rollingGroundSphere.position.y = -24;
	rollingGroundSphere.position.z = 2;
}

function addLight() {
	var hemisphereLight = new THREE.HemisphereLight( 0xfffafa, 0x000000, .9 )
	scene.add( hemisphereLight );
	sun = new THREE.DirectionalLight( 0xcdc1c5, 0.9 );
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
  //animate
  rollingGroundSphere.rotation.x += rollingSpeed;
  heroSphere.rotation.x -= heroRollingSpeed;
  if (heroSphere.position.y <= heroBaseY){
  	bounceValue = ( Math.random()*0.04 ) + 0.005;
  }
  heroSphere.position.y += bounceValue;
  heroSphere.position.x = THREE.Math.lerp( heroSphere.position.x, heroSphere.position.y, 2*clock.getDelta() );//clock.getElapsedTime());
  bounceValue -= gravity;
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
