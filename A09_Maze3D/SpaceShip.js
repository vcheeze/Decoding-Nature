'use strict';

class SpaceShip {
  constructor( scene, x, y, z ) {
    this.x = x;
    this.y = y;
    this.z = y;

    this.geometry = new THREE.ConeGeometry( 1.5, 4.5, 8 );
    this.material = new THREE.MeshLambertMaterial({
      // color: 0x000000,
      color: 0x1FCF66,
      wireframe: true
    });

    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.mesh.position.set( this.x, this.y, this.z );
    this.mesh.castShadow = true;
    this.mesh.rotateX( THREE.Math.degToRad( -60 ) );

    scene.add( this.mesh );
  }

  update() {
    this.material.needsUpdate = true;

    this.x += x;
    this.y += y;
    this.z += z;
  }
}
