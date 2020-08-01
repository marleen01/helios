let planets  = [];
let star;
let orbits = [];
let c = 0;
function setup() {
  createCanvas(600, 600);
  frameRate(60);
  mercury = new Planet(280, 340, 0.33, 0, 5, 0.5);
  // venus = new Planet(200, 200, 487, 1, 0);
  star = new Attractor();
  planets.push(mercury);
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
    planets[i].displayOrbit();
  }
  star.display();
}

class Attractor {

  constructor() {
    this.pos = createVector(width/2, height/2);
    this.mass = 1988500;
    this.G = Math.pow(6.6743, -4);
  }

  attract(mover) {
    let force = p5.Vector.sub(this.pos, mover.pos);
    let distance = force.mag();
    distance = constrain(distance, 5, 25);

    let strength = (this.G * this.mass * mover.mass) /
    (distance * distance);
    force.setMag(strength);
    return force;
  }

  display() {
    stroke(255);
    fill(255);
    ellipse(this.pos.x, this.pos.y, 50);
  }
}

class Planet {
  constructor(x, y, m, id, startx, starty) {
    this.mass = m;
    this.startx = startx;
    this.starty = starty;
    this.pos = createVector(x, y);
    this.vel = createVector(this.startx, this.starty);
    this.acc = createVector();
    this.id = id;

  }
  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

  }

  display() {
    push();
    stroke(0);
    fill(255);
    ellipse(this.pos.x, this.pos.y,
      12.75, 12.75);
    pop();
  }

  displayOrbit() {
    let v = createVector(this.pos.x, this.pos.y);
    orbits[this.id].push(v);
    if (c > 300) {
      orbits[this.id].splice(0, 1);
    }
    for (var i = 0; i < orbits[this.id].length; i++) {
      push();
      stroke(255);
      strokeWeight(2);
      point(orbits[this.id][i].x, orbits[this.id][i].y);
      pop();
    }
  }
}
