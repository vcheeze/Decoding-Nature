'use strict';

class StarField {
  constructor( scene ) {
    this.position = new THREE.Vector3(
      THREE.Math.randInt( -window.innerWidth/4, window.innerWidth/4 ),
      THREE.Math.randInt( -window.innerHeight/4, window.innerHeight/4 ),
      THREE.Math.randInt( -225, -100 )
    );

    this.width  = THREE.Math.randInt( 10, 100 );
    this.height = THREE.Math.randInt( 10, 100 );
    this.depth  = THREE.Math.randInt( 10, 100 );

    this.starsGeometry = new THREE.Geometry();
    this.candidates = [];
    for ( let i = 0; i < this.width; i += 2 ) {
      for ( let j = 0; j < this.height; j += 2 ) {
        for ( let k = 0; k < this.depth; k += 2 ) {
          let star = new THREE.Vector3(
            this.position.x + i,
            this.position.y + j,
            this.position.z + k
          );
          // this.candidates.push( star );
          this.starsGeometry.vertices.push( star );
        }
      }
    }
    this.starsGeometry.computeBoundingBox();

    this.starsMaterial = new THREE.PointsMaterial( {color: 0xefefef /*E07B11*/} );

    this.starField = new THREE.Points( this.starsGeometry, this.starsMaterial );

    scene.add( this.starField );
  }

  // display the points if the user gets close enough to them
  showStars( player ) {
    let distance;

    for ( let i = 0; i < this.candidates.length; i++ ) {
      distance = player.position.distanceTo( this.candidates[i] );
      console.log(distance);
      if ( distance < 300 ) {
        this.starsGeometry.vertices.push( this.candidates[i] );
      }
    }

    this.starsGeometry.verticesNeedUpdate = true;
  }
}
