let planets = {};
let timeSince = 0;

// Taille de la Terre en pixels
const earthSize = 50;

// Ratio entre la distance et la taille des planètes
const ratioDist = 800;
const globalDist = earthSize * (11727.81 / ratioDist); // J'ai fait les calculs par rapport aux propriétés de la Terre

// Ratio entre le temps dans le jeu et le temps réel
const ratioTime = 25000;

// const sunValues = { sunPos: [], radius: 109.05 * earthSize };
const sunValues = { color: "#fce570", nbpoints: 11, radius: 109.05, distance: 0, orbVel: 0, rotVel: 0.000082, sunPos: [] };
const mercuryValues = { color: "#e5e5e5", nbpoints: 10, radius: 0.38, distance: 0.39, orbVel: 0.00000946, rotVel: 0.0000014 };
const venusValues = { color: "#a57c1b", nbpoints: 9, radius: 0.95, distance: 0.72, orbVel: 0.00000371, rotVel: -0.00000034 };
const earthValues = { color: "#6b93d6", nbpoints: 4, radius: 1, distance: 1, orbVel: 0.00000228, rotVel: 0.000083 };
const marsValues = { color: "#c1440e", nbpoints: 7, radius: 0.53, distance: 1.52, orbVel: 0.00000121, rotVel: 0.000081 };
const jupiterValues = { color: "#dcd0b8", nbpoints: 6, radius: 11.21, distance: 5.20, orbVel: 0.000000192, rotVel: 0.00020 };
const saturnValues = { color: "#c3924f", nbpoints: 5, radius: 9.45, distance: 9.55, orbVel: 0.0000000775, rotVel: 0.00019 };
const uranusValues = { color: "#93cdf1", nbpoints: 4, radius: 4.01, distance: 19.19, orbVel: 0.0000000272, rotVel: -0.00012 };
const neptuneValues = { color: "#fff", nbpoints: 3, radius: 3.88, distance: 30.11, orbVel: 0.0000000139, rotVel: 0.00012 };

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  // let moon = new Satellite(radius = 10, distance = 50, nbpoints= 3, orbitVel = 0.05, rotationVel = 0.05, color(200, 200, 200));

  // sunValues.sunPos = [width / 2, height / 2];
  sunValues.sunPos = [0, height / 2];

  let mercury = new Planet(mercuryValues.color, mercuryValues.nbpoints, mercuryValues.radius * earthSize, mercuryValues.distance * globalDist, mercuryValues.orbVel * ratioTime, mercuryValues.rotVel * ratioTime);
  let venus = new Planet(venusValues.color, venusValues.nbpoints, venusValues.radius * earthSize, venusValues.distance * globalDist, venusValues.orbVel * ratioTime, venusValues.rotVel * ratioTime);
  let earth = new Planet(earthValues.color, earthValues.nbpoints, earthValues.radius * earthSize, earthValues.distance * globalDist, earthValues.orbVel * ratioTime, earthValues.rotVel * ratioTime);
  let mars = new Planet(marsValues.color, marsValues.nbpoints, marsValues.radius * earthSize, marsValues.distance * globalDist, marsValues.orbVel * ratioTime, marsValues.rotVel * ratioTime);
  let jupiter = new Planet(jupiterValues.color, jupiterValues.nbpoints, jupiterValues.radius * earthSize, jupiterValues.distance * globalDist, jupiterValues.orbVel * ratioTime, jupiterValues.rotVel * ratioTime);
  let saturn = new Planet(saturnValues.color, saturnValues.nbpoints, saturnValues.radius * earthSize, saturnValues.distance * globalDist, saturnValues.orbVel * ratioTime, saturnValues.rotVel * ratioTime);
  let uranus = new Planet(uranusValues.color, uranusValues.nbpoints, uranusValues.radius * earthSize, uranusValues.distance * globalDist, uranusValues.orbVel * ratioTime, uranusValues.rotVel * ratioTime);
  let neptune = new Planet(neptuneValues.color, neptuneValues.nbpoints, neptuneValues.radius * earthSize, neptuneValues.distance * globalDist, neptuneValues.orbVel * ratioTime, neptuneValues.rotVel * ratioTime);
  planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];
}

function draw() {
  background(50);
  translate(sunValues.sunPos[0], sunValues.sunPos[1]);
  noStroke();

  push();

  // Sun
  fill("#fce570");
  ellipse(0, 0, sunValues.radius / 2);

  // -- -- -- -- -- Orbits -- -- -- -- -- \\

  // Light-hour
  fill("white");
  textSize(10);
  text("One light-hour", 5 + 7.2 * globalDist, 0);
  strokeWeight(0.5);
  noFill();
  stroke("white");
  ellipse(0, 0, 7.2 * globalDist * 2);

  strokeWeight(0.2);

  stroke(mercuryValues.color);
  fill(mercuryValues.color);
  textSize(10);
  text("Mercury", 5 + mercuryValues.distance * globalDist, 0);
  noFill();
  ellipse(0, 0, mercuryValues.distance * globalDist * 2);

  stroke(venusValues.color);
  fill(venusValues.color);
  textSize(10);
  text("Venus", 5 + venusValues.distance * globalDist, 15);
  noFill();
  ellipse(0, 0, venusValues.distance * globalDist * 2);

  stroke(earthValues.color);
  fill(earthValues.color);
  textSize(10);
  text("Earth", 5 + earthValues.distance * globalDist, 30);
  noFill();
  ellipse(0, 0, earthValues.distance * globalDist * 2);

  stroke(marsValues.color);
  fill(marsValues.color);
  textSize(10);
  text("Mars", 5 + marsValues.distance * globalDist, 45);
  noFill();
  ellipse(0, 0, marsValues.distance * globalDist * 2);

  stroke(jupiterValues.color);
  fill(jupiterValues.color);
  textSize(10);
  text("Jupiter", 5 + jupiterValues.distance * globalDist, 0);
  noFill();
  ellipse(0, 0, jupiterValues.distance * globalDist * 2);

  stroke(saturnValues.color);
  fill(saturnValues.color);
  textSize(10);
  text("Saturn", 5 + saturnValues.distance * globalDist, 0);
  noFill();
  ellipse(0, 0, saturnValues.distance * globalDist * 2);

  stroke(uranusValues.color);
  fill(uranusValues.color);
  textSize(10);
  text("Uranus", 5 + uranusValues.distance * globalDist, 0);
  noFill();
  ellipse(0, 0, uranusValues.distance * globalDist * 2);

  stroke(neptuneValues.color);
  fill(neptuneValues.color);
  textSize(10);
  text("Neptune", 5 + neptuneValues.distance * globalDist, 0);
  noFill();
  ellipse(0, 0, neptuneValues.distance * globalDist * 2);

  pop();

  timeSince += deltaTime;

  if (timeSince >= 0.2) {
    timeSince -= 0.2;
    for (i in planets) {
      planets[i].show();
      planets[i].update();
    }
  }
}