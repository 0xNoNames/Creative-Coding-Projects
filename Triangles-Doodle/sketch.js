let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;
let size = 400;
let offset = 2;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  translate(centerX, centerY);
  noFill();
  stroke(255);

  noStroke();
  fill("red");
  x1 = 0, y1 = 0;
  x2 = 0, y2 = size;
  x3 = sin(PI / 3) * size, y3 = cos(PI / 3) * size;

  ellipse(x1, y1, 10);
  ellipse(x2, y2, 10);
  ellipse(x3, y3, 10);

  triangle(x1, y1, x2, y2, x3, y3);

  fill("green");
  x1 = 0, y1 = size;
  x2 = 0, y2 = size * 2;
  x3 = sin(PI / 3) * size, y3 = cos(PI / 3) * size * 3;

  ellipse(x1, y1, 10);
  ellipse(x2, y2, 10);
  ellipse(x3, y3, 10);

  triangle(x1, y1, x2, y2, x3, y3);

  fill("blue");
  x1 = 0, y1 = size;
  x2 = sin(PI / 3) * size, y2 = cos(PI / 3) * size;
  x3 = sin(PI / 3) * size, y3 = cos(PI / 3) * size * 3;

  ellipse(x1, y1, 10);
  ellipse(x2, y2, 10);
  ellipse(x3, y3, 10);

  triangle(x1, y1, x2, y2, x3, y3);

  // triangle(centerX, centerY,
  //   centerX + size, centerY,
  //   centerX, centerY - size);

  // stroke("red");
  // triangle(centerX, centerY,
  //   centerX + size - (size / offset), centerY - (size / offset),
  //   centerX, centerY - size + (size / offset));


  // stroke("blue");
  // triangle(centerX + offset, centerY ,
  //   centerX + size - offset, centerY - offset,
  //   centerX, centerY - size + offset);


  // let AD = sqrt((size / offset) ** 2 + (2 * size / offset) ** 2);
  // let alpha = atan((size / offset) / (2 * size / offset));
  // let x = cos(alpha) * (AD / offset);
  // let y = sin(alpha) * (AD / offset);

  // console.log(alpha);
  // noStroke();
  // fill("green");
  // ellipse(centerX + x, centerY - y, 10);
}


function draw() {
}
