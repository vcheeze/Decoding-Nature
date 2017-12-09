'use strict';

class StarField {
  constructor( scene ) {
    this.position = new THREE.Vector3(
      THREE.Math.randInt( -50, 30 ),
      THREE.Math.randInt( -50, 30 ),
      THREE.Math.randInt( -50, 30 )
    );

    this.width  = THREE.Math.randInt( 5, 25 );
    this.height = THREE.Math.randInt( 5, 25 );
    this.depth  = THREE.Math.randInt( 5, 25 );

    this.starsGeometry = new THREE.Geometry();
    for ( let i = 0; i < this.width; i++ ) {
      for ( let j = 0; j < this.height; j++ ) {
        for ( let k = 0; k < this.depth; k++ ) {
          let star = new THREE.Vector3(
            this.position.x + i,
            this.position.y + j,
            this.position.z + k
          );
          this.starsGeometry.vertices.push( star );
        }
      }
    }
    // this.starsGeometry.computeBoundingBox();

    this.starsMaterial = new THREE.PointsMaterial( {color: 0xE07B11} );

    this.starField = new THREE.Points( this.starsGeometry, this.starsMaterial );

    scene.add( this.starField );
  }
  //
  // rotate( axis, theta ) {
  //   console.log("Rotating starfield!");
  //
  //   for ( let i = 0; i < this.starField.geometry.vertices.length; i++ ) {
  //     this.starField.geometry.vertices[i].applyAxisAngle( axis, theta );
  //   }
  //
  //   this.starField.geometry.verticesNeedUpdate = true;
  // }
  //
  // move( forward ) {
  //   console.log("Moving starfield!");
  //
  //   for ( let i = 0; i < this.starField.geometry.vertices.length; i++ ) {
  //     if ( forward ) {
  //       this.starField.geometry.vertices[i].z += 1;
  //     }
  //     else {
  //       this.starField.geometry.vertices[i].z -= 1;
  //     }
  //   }
  //
  //   this.starField.geometry.verticesNeedUpdate = true;
  // }
  //
  // collide( spaceship ) {
  //
  // }
}
