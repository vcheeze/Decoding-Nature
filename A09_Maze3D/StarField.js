'use strict';

class StarField {
  constructor( scene ) {
    this.position = new THREE.Vector3(
      THREE.Math.randInt( -window.innerWidth/4, window.innerWidth/4 ),
      THREE.Math.randInt( -window.innerHeight/4, window.innerHeight/4 ),
      THREE.Math.randInt( -350, -100 )
    );

    // this.position = new THREE.Vector3( 0, 0, -100 );

    this.width  = THREE.Math.randInt( 10, 100 );
    this.height = THREE.Math.randInt( 10, 100 );
    this.depth  = THREE.Math.randInt( 10, 100 );

    // this.starsGeometry = new THREE.Geometry();
    this.stars = [];
    for ( let i = 0; i < this.width; i += 4 ) {
      for ( let j = 0; j < this.height; j += 4 ) {
        for ( let k = 0; k < this.depth; k += 4 ) {
          let geometry = new THREE.Geometry();
          let pos = new THREE.Vector3(
            this.position.x + i,
            this.position.y + j,
            this.position.z + k
          );
          geometry.vertices.push( pos );
          geometry.computeBoundingBox();

          let material = new THREE.PointsMaterial( {color: 0xefefef} );
          let star = new THREE.Points( geometry, material );

          scene.add( star );

          this.stars.push( star );
        }
      }
    }

    // console.log(this.stars);
    // this.starsGeometry.computeBoundingBox();

    // this.starsMaterial = new THREE.PointsMaterial( {color: 0xefefef /*E07B11*/} );

    // this.starField = new THREE.Points( this.starsGeometry, this.starsMaterial );

    // scene.add( this.starField );
  }

  // display the points if the user gets close enough to them
  processPlayerDistance( player ) {
    let distance;

    for ( let i = 0; i < this.stars.length; i++ ) {
      distance = player.position.distanceTo( this.stars[i].geometry.vertices[0] );
      // console.log(distance);
      if ( distance < 50 ) {
        this.stars[i].visible = true;
      }
      else {
        this.stars[i].visible = false;
      }
    }
  }
}
