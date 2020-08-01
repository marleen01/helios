class Planet {
  constructor(x, y, m, id, startx, starty, dia) {
    this.dia = dia;
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
      this.dia, this.dia);
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
