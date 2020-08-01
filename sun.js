class Sun {
  constructor() {
    this.pos = createVector(width/2, height/2);
    this.mass = 1988500;
    this.G = Math.pow(6.6743, -5);
  }
  attract(mover) {
    let force = p5.Vector.sub(this.pos, mover.pos);
    let distance = force.mag();
    distance = constrain(distance, 38, 58);

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
