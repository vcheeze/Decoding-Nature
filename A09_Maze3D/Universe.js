class Universe {
  constructor( scene, size, sides ) {
    this.size = size;
    this.sides = sides;

  	this.geometry = new THREE.SphereGeometry( this.size, this.sides, this.sides );
  	this.material = new THREE.MeshLambertMaterial({
  		color: 0x000000,
  		wireframe: true,
  		transparent: true,
  		opacity: 0.5
  	});

  	this.mesh = new THREE.Mesh( this.geometry, this.material );
  	this.mesh.receiveShadow = true;
  	this.mesh.castShadow = false;
    this.mesh.material.side = THREE.DoubleSide
    this.mesh.position.set( 0, 0, 0 );

  	scene.add( this.mesh );
  }
}
