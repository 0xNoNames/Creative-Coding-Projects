let planets = {};

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  let earth = new Planet(50, 250, 5, 0.005, color(47, 82, 229));
  let moon = new Planet(25, earth.distance, 3, 0.005, color(200, 200, 200), earth.x, earth.y, earth.orbitAngle);
  planets = [earth, moon];
}


function draw() {
  background(50);
  // translate(width / 2, height * 1.25);
  translate(width / 2, height / 2);

  // Sun
  fill(255, 204, 0);
  noStroke();
  ellipse(0, 0, 200);

  for (i in planets) {
    planets[i].show();
    planets[i].orbit();
  }

  // rotate(frameCount / -100.0);
  // polygon(0,-100, 50, 4);
  // rect(0, -200, 100, 100);

  // rotate(i * 1.5);
  // rect(250, 250, 50, 50);
}