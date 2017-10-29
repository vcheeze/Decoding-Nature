# Decoding Nature
Decoding Nature - Simulating nature with code

This class is taught by Professor Aaron Sherwood.

## Which Folders are What?
The Exercises/ folder contains exercises that I did in class.

Folders with the A## prefix are assignments done throughout the semester.

## What are the Assignments about?
### Assignment 1 - Predator
Pete (the circle) exists in a world of two zones. A Predator (the triangle) also lives in the same world, and constantly wants to get at Pete and destroy him. Pete is a little dumb and runs around all over the place randomly, implementing a Perlin noise walk. Meanwhile, the Predator is attracted (in terms of force, not in terms of love) to Pete and is constantly accelerating toward him. However, the Predator goes a bit crazier when in the red zone, and a bit milder when in the green zone.

Pete becomes bigger each time he is poked by the Predator. If he gets too big, he will explode and die.
### Assignment 2 - Magnet
This assignment simulates a magnetic force. Since magnetic force is actually 3D, I had to transfer it somehow to 2D. I decided to make the magnetic field a scalar value instead of a vector, allowing the final force that is calculated to be a 2D vector.

I've also simulated water using sin equations. There's a circle at the bottom of the water which attracts the other smaller circles moving around randomly (with Perlin noise) in the water. Once these random smaller circles enter the semicircle, which is the force-zone, then they will be pulled in to the circle at the bottom.
### Assignment 3 - Sound of Roses

### Assignment 4 - Maze

### Midterm Assignment - Solar System
Notes:
* The planets have different densities, so their mass and diameters do not always correlate 1:1.
  * The mass is used to calculate gravitational attraction
  * The diameter is used to display the planets
* Since the Sun's size is far too big compared to the planets, it is not in scale. However, the planets' sizes are.

Sources:
* General planetary data:
  * https://www.windows2universe.org/our_solar_system/planets_orbits_table.html
  * https://solarsystem.nasa.gov/docs/modelingsolarsystem_20070112.pdf
* Orbital Inclination: https://en.wikipedia.org/wiki/Orbital_inclination
* Conversion from polar to 3D coordinates:
  * https://en.wikipedia.org/wiki/Spherical_coordinate_system
  * http://tutorial.math.lamar.edu/Classes/CalcIII/SphericalCoords.aspx
