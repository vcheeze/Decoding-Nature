'use strict';

class Star {
  constructor() {
  	this.geometry = new THREE.SphereGeometry( 5 );
  	this.material = new THREE.MeshLambertMaterial({
  		color: 0x000000,
  		transparent: true,
  		opacity: 0.5
  	});

  	this.mesh = new THREE.Mesh( this.geometry, this.material );
  	this.mesh.receiveShadow = true;
  	this.mesh.castShadow = true;
    this.mesh.material.side = THREE.DoubleSide
    this.mesh.position.set( 0, 0, 0 );

  }
}
