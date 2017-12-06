/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.PointerLockControls = function ( camera ) {

	var scope = this;

	camera.rotation.set( 0, 0, 0 );

	var pitchObject = new THREE.Object3D();
	pitchObject.add( camera );

	var yawObject = new THREE.Object3D();
	yawObject.position.y = 10;
	yawObject.add( pitchObject );

	var PI_2 = Math.PI / 2;

	var onKeyDown = function ( keyEvent ) {

		if ( scope.enabled === false ) return;

		// var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		// var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		var movementX, movementY;

		if ( keyEvent.keyCode === 65) { // a: left
			movementX = -5;
			movementY = 0;
		}
		else if ( keyEvent.keyCode === 87) { // w: up
			movementX = 0;
			movementY = -5;
		}
		else if ( keyEvent.keyCode === 68 ) { // d: right
			movementX = 5;
			movementY = 0;
		}
		else if ( keyEvent.keyCode === 83) { // s: down
			movementX = 0;
			movementY = 5;
		}

		yawObject.rotation.y -= movementX * 0.002;
		pitchObject.rotation.x -= movementY * 0.002;

		pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );

	};

	this.dispose = function() {

		document.removeEventListener( 'keydown', onKeyDown, false );

	};

	document.addEventListener( 'keydown', onKeyDown, false );

	this.enabled = false;

	this.getObject = function () {

		return yawObject;

	};

	this.getDirection = function() {

		// assumes the camera itself is not rotated

		var direction = new THREE.Vector3( 0, 0, - 1 );
		var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

		return function( v ) {

			rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );

			v.copy( direction ).applyEuler( rotation );

			return v;

		};

	}();

};
