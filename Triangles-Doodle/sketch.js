let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;
let size = 400;
let offset = 2;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);

  noFill();
  stroke(255);


  triangle(centerX, centerY,
    centerX + size, centerY,
    centerX, centerY - size);

  stroke("red");
  triangle(centerX, centerY,
    centerX + size - (size / offset), centerY - (size / offset),
    centerX, centerY - size + (size / offset));


  // stroke("blue");
  // triangle(centerX + offset, centerY ,
  //   centerX + size - offset, centerY - offset,
  //   centerX, centerY - size + offset);


  let AD = sqrt((size / offset) ** 2 + (2 * size / offset) ** 2);
  let alpha = atan((size / offset) / (2 * size / offset));
  let x = cos(alpha) * (AD / offset);
  let y = sin(alpha) * (AD / offset);

  console.log(alpha)
  noStroke();
  fill("green");
  ellipse(centerX + x, centerY - y, 10);
}


function draw() {
}
