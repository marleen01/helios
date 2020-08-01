let planets  = [];
let star;
let orbits = [];
let c = 0;
let ea_d = 20;
function setup() {
  createCanvas(600, 600);
  frameRate(60);
  mercury = new Planet(280, 335, 0.33, 0, 1.95, 0.8, ea_d * 0.383);
  venus = new Planet(200, 270, 4.87, 1, -0.3, 1.99, ea_d * 0.949);
  star = new Sun();
  planets.push(mercury, venus);
  for (var i = 0; i < planets.length; i++) {
    orbits.push([]);
  }
}

function draw() {
  background(0);
  c++;
  for (var i = 0; i < planets.length; i++) {
    const force = star.attract(planets[i]);
    planets[i].applyForce(force);
    planets[i].update();
    planets[i].display();
    // planets[i].displayOrbit();
  }
  star.display();
}
