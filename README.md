# Decoding Nature
Decoding Nature - Simulating nature with code

This class is taught by Professor Aaron Sherwood.

## Which Folders are What?
The Exercises/ folder contains exercises that I did in class.

Folders with the A## prefix are assignments done throughout the semester.

## What are the Assignments about?
### Assignment 1 - Predator
Pete (the circle) exists in a world of two zones. A Predator (the triangle) also
lives in the same world, and constantly wants to get at Pete and destroy him.
Pete is a little dumb and runs around all over the place randomly, implementing
a Perlin noise walk. Meanwhile, the Predator is attracted (in terms of force,
not in terms of love) to Pete and is constantly accelerating toward him.
However, the Predator goes a bit crazier when in the red zone, and a bit milder
when in the green zone.

Pete becomes bigger each time he is poked by the Predator. If he gets too big,
he will explode and die.
### Assignment 2 - Magnet
This assignment is meant to explore different types of forces. It simulates a
magnetic force. Since magnetic force is actually 3D, I had to transfer it
somehow to 2D. I decided to make the magnetic field a scalar value instead of a
vector, allowing the final force that is calculated to be a 2D vector.

I've also simulated water using sin equations. There's a circle at the bottom of
the water which attracts the other smaller circles moving around randomly (with
Perlin noise) in the water. Once these random smaller circles enter the
semicircle, which is the force-zone, then they will be pulled in to the circle
at the bottom.
### Assignment 3 - Sound of Roses
Since this assignment should involve oscillation, I decided to draw patterns
based on polar roses, as shown in this [Wikipedia article](https://en.wikipedia.org/wiki/Rose_%28mathematics%29). The pattern of
the roses depends on k, where k = n/d. I have chosen some values of n and d that
makes satisfying patterns.

Next, I draw a hidden grid of rectangles in the background, so that as my mover
moves around and draws the roses, it will trigger sounds with varying pitch
based on the y value of the rectangle. In order to balance the rate at which the
patterns are drawn and the rate at which the sounds are triggered, I've designed
the grid so that the notes will only be triggered if the mover moves close
enough to the center of the rectangles.

### Assignment 4 - Maze
For this assignment, I designed a maze whose obstacles are actually particle
systems. The reason for doing so is that these particles will only show one the
mover moves close enough to them. This means that the mover will have limited
visibility as it moves through the maze.

Using the **UP** and **DOWN** arrow keys, you can increase or decrease the visibility
respectively.

The goal of the game is simple: get to the other side, where there will be a
thin strip of area that has a different color. As you succeed each time, the
game will become increasingly hard.

Good luck!

### Assignment 5 (Midterm) - Solar System
For my midterm project, I created a simple simulation of the solar system. This
is done in 3D, which was quite a challenge, as I wished to make as many elements
in scale as possible. Since making everything in scale was impossible if I want
to fit all the planets on the canvas and make them visible, I resorted to
maintaining only the scale of the individual features/elements of the planets
within themselves, i.e. the masses of the planets are in scale in respect to
each other, but the masses are not in scale to their diameters or their
distances from the Sun.

Notes:
* The planets have different densities, so their mass and diameters do not
always correlate 1:1.
  * The mass is used to calculate gravitational attraction
  * The diameter is used to display the planets
* Since the Sun's size is far too big compared to the planets, it is not in
scale. However, the planets' sizes are.

Sources:
* General planetary data:
  * https://www.windows2universe.org/our_solar_system/planets_orbits_table.html
  * https://solarsystem.nasa.gov/docs/modelingsolarsystem_20070112.pdf
* Orbital Inclination: https://en.wikipedia.org/wiki/Orbital_inclination
* Conversion from polar to 3D coordinates:
  * https://en.wikipedia.org/wiki/Spherical_coordinate_system
  * http://tutorial.math.lamar.edu/Classes/CalcIII/SphericalCoords.aspx

### Assignment 6 - Pitch Follower
For this assignment, I simply followed Shiffman's implementation of a flock, and
tried to extend it by controlling the flock with sound. More specifically, the
frequency and amplitude of the sound controls the x and y coordinates,
respectively. The x coordinate corresponds to the frequency, while the y
coordinate is inversely related to the amplitude, so that the higher the volume,
the higher the flock will go (mapping to a lower y value).
