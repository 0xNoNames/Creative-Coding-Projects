function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  earth = new Planet(100, height, 10, 0.005, color(47, 82, 229));
  moon = new Planet(50, height, 3, 0.005, color(200, 200, 200));
}

function draw() {
  background(50);
  translate(width / 2, height * 1.25);

  // rectMode("center");

  // Sun
  fill(255, 204, 0);
  noStroke();
  ellipse(0, 0, width / 1.5);

  earth.show();
  earth.orbit();
  moon.show();
  moon.orbit();

  // rotate(frameCount / -100.0);
  // polygon(0,-100, 50, 4);
  // rect(0, -200, 100, 100);

  // rotate(i * 1.5);
  // rect(250, 250, 50, 50);
}