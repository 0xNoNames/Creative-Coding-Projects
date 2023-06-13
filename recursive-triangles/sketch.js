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

const hsl2rgb = (hue = round(random(0, 360)), saturation = 1, luminance = 0.5, alpha = 0.25) => {
	let a = saturation * Math.min(luminance, 1 - luminance);
	let f = (n, k = (n + hue / 30) % 12) => luminance - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
	return [round(f(0) * 255), round(f(8) * 255), round(f(4) * 255), round(alpha * 255)];
};

const innerTriangle = (triangle0, triangle1, ratio, depth) => {
	noFill();
	stroke(color[0], color[1], color[2], color[3]);
	triangle(triangle0.a.x, triangle0.a.y, triangle0.b.x, triangle0.b.y, triangle0.c.x, triangle0.c.y);
	triangle(triangle1.a.x, triangle1.a.y, triangle1.b.x, triangle1.b.y, triangle1.c.x, triangle1.c.y);
	triangle0.a.x += (triangle0.b.x - triangle0.a.x) / ratio;
	triangle0.a.y += (triangle0.b.y - triangle0.a.y) / ratio;
	triangle1.a.x += (triangle1.b.x - triangle1.a.x) / ratio;
	triangle1.a.y += (triangle1.b.y - triangle1.a.y) / ratio;
	if (depth > 0) innerTriangle(triangle0.rotate(), triangle1.rotate(), ratio, --depth);
};

let fract = 4;
let effect = 0;
let zooming = true;
let ratio, depth, color;

setup = () => {
	createCanvas(windowWidth, windowHeight);
	background(0);
	color = hsl2rgb();
};

draw = () => {
	background(0);
	ratio = 1 + 20 * (mouseX / width);
	depth = 10 * ratio * ((height - mouseY) / height);
	for (let y = 0; y <= height + height / fract; y += height / fract) {
		for (let x = 0; x <= width + width / fract; x += width / fract) {
			let a, b, c0, c1;
			if (effect < 4) {
				a = new Point(x, y);
				b = new Point(x + width / fract, y - height / fract);
				c0 = new Point(x, y - height / fract);
				c1 = new Point(x + width / fract, y);
			}
			else {
				a = new Point(x + width / fract, y);
				b = new Point(x, y - height / fract);
				c1 = new Point(x, y);
				c0 = new Point(x + width / fract, y - height / fract);
			}
			switch (effect % 4) {
				case 0:
					innerTriangle(new Triangle(a.clone(), c0.clone(), b.clone()), new Triangle(a.clone(), b.clone(), c1.clone()), ratio, depth);
					break;
				case 1:
					innerTriangle(new Triangle(a.clone(), b.clone(), c0.clone()), new Triangle(a.clone(), c1.clone(), b.clone()), ratio, depth);
					break;
				case 2:
					innerTriangle(new Triangle(a.clone(), c0.clone(), b.clone()), new Triangle(a.clone(), c1.clone(), b.clone()), ratio, depth);
					break;
				case 3:
					innerTriangle(new Triangle(a.clone(), c0.clone(), b.clone()), new Triangle(a.clone(), b.clone(), c1.clone()), ratio, depth);
					break;
			}
		}
	}
};

windowResized = () => {
	resizeCanvas(windowWidth, windowHeight);
};

mouseClicked = () => {
	color = hsl2rgb();
	effect = (effect + 1) % 8;
};

mouseWheel = (event) => {
	fract = (event.deltaY > 0 && fract < 14) ? fract += 1 : (event.deltaY < 0 && fract > 1) ? fract -= 1 : fract;
};

touchStarted = (event) => {
	if (event.touches != null) {
		fract = (event.touches.length == 2 && zooming) ? fract + 1 :
			(event.touches.length == 2 && !zooming) ? fract - 1 : fract;
		zooming = (fract == 7 || fract == 1) ? !zooming : zooming;
	}
};