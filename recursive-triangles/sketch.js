class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Point(this.x, this.y);
  }
}

class Triangle {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  rotate() {
    let tmp = this.c;
    this.c = this.b;
    this.b = this.a;
    this.a = tmp;
    return this;
  }
}

const randint = (min, max) => {
  return round(random(min, max));
};

const innerTriangle = (triangle0, triangle1, ratio, depth) => {
  noFill();
  stroke(color0.x, color0.y, color0.z, 200);
  triangle(triangle0.a.x, triangle0.a.y, triangle0.b.x, triangle0.b.y, triangle0.c.x, triangle0.c.y);
  // stroke(color1.x, color1.y, color1.z, 200);
  triangle(triangle1.a.x, triangle1.a.y, triangle1.b.x, triangle1.b.y, triangle1.c.x, triangle1.c.y);
  triangle0.a.x += (triangle0.b.x - triangle0.a.x) / ratio;
  triangle0.a.y += (triangle0.b.y - triangle0.a.y) / ratio;
  triangle1.a.x += (triangle1.b.x - triangle1.a.x) / ratio;
  triangle1.a.y += (triangle1.b.y - triangle1.a.y) / ratio;
  if (depth) innerTriangle(triangle0.rotate(), triangle1.rotate(), ratio, --depth);
};

let fract = 4;
let effect = 0;
let ratio, depth, color0, color1;

setup = () => {
  createCanvas(windowWidth, windowHeight);
  background(0);
  color0 = createVector(randint(50, 150), randint(50, 150), randint(50, 150));
  // color1 = createVector(randint(50, 150), randint(50, 150), randint(50, 150));
};

draw = () => {
  background(0);
  ratio = ceil(20 * (mouseX / width));
  depth = floor(10 * ratio * ((height - mouseY) / height));
  for (let y = 0; y <= height + height / fract; y += height / fract) {
    for (let x = 0; x <= width + width / fract; x += width / fract) {
      let a, b, c0, c1, triangle0, triangle1;
      if (effect < 4) {
        a = new Point(x, y);
        b = new Point(x + width / fract, y - height / fract);
        c0 = new Point(x, y - height / fract);
        c1 = new Point(x + width / fract, y);
      }
      else {
        c1 = new Point(x, y);
        c0 = new Point(x + width / fract, y - height / fract);
        b = new Point(x, y - height / fract);
        a = new Point(x + width / fract, y);
      }
      switch (effect % 4) {
        case 0:
          triangle0 = new Triangle(a.clone(), c0.clone(), b.clone());
          triangle1 = new Triangle(a.clone(), b.clone(), c1.clone());
          break;
        case 1:
          triangle0 = new Triangle(a.clone(), b.clone(), c0.clone());
          triangle1 = new Triangle(a.clone(), c1.clone(), b.clone());
          break;
        case 2:
          triangle0 = new Triangle(a.clone(), c0.clone(), b.clone());
          triangle1 = new Triangle(a.clone(), c1.clone(), b.clone());
          break;
        case 3:
          triangle0 = new Triangle(a.clone(), c0.clone(), b.clone());
          triangle1 = new Triangle(a.clone(), b.clone(), c1.clone());
          break;
      }
      innerTriangle(triangle0, triangle1, ratio, depth);
    }
  }
};

windowResized = () => {
  resizeCanvas(windowWidth, windowHeight);
};

mouseClicked = () => {
  color0 = createVector(randint(50, 150), randint(50, 150), randint(50, 150));
  // color1 = createVector(randint(50, 150), randint(50, 150), randint(50, 150));
  effect = (effect + 1) % 8;
};

mouseWheel = (event) => {
  if (event.deltaY > 0 && fract < 14)
    fract += 1;
  else if (event.deltaY < 0 && fract > 1)
    fract -= 1;
};