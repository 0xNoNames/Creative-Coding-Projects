function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  background(50);
  noFill();
  stroke(255);
  translate(width / 2, height)

  rectMode("center")

  // Sun
  // ellipse(0, 0, width / 2);
  rect(0, 0, width / 2);

  rotate(frameCount / -100.0);
  // polygon(0,-100, 50, 4);
  rect(0, -200, 100, 100)

  // rotate(i * 1.5);
  // rect(250, 250, 50, 50);
}

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

const drawTriangle = () => {}