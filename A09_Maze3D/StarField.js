'use strict';

class StarField {
  constructor( scenen ) {
    this.position = new THREE.Vector3(
      THREE.Math.randInt( -30, 30 ),
      THREE.Math.randInt( -30, 30 ),
      THREE.Math.randInt( -30, 30 )
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

    this.starsMaterial = new THREE.PointsMaterial( {color: 0xE07B11} );

    this.starField = new THREE.Points( this.starsGeometry, this.starsMaterial );

    scene.add( this.starField );
  }

  rotate( axis, theta ) {
    console.log("Rotating starfield!");
    this.starField.geometry.verticesNeedUpdate = true;
    let origin = new THREE.Vector3( 0, 0, 0 );

    for ( let i = 0; i < this.starField.geometry.vertices.length; i ++ ) {
      this.starField.geometry.vertices[i].sub( origin );
      this.starField.geometry.vertices[i].applyAxisAngle( axis, theta );
      this.starField.geometry.vertices[i].add( origin );
      // this.starField.geometry.vertices[i].rotateOnAxis( axis, theta );
    }
  }

  collide( spaceship ) {

  }
}
