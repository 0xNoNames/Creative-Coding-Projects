// class Star {
// 	constructor() {
// 		this.x = random(-width, width);
// 		this.y = random(-height, height);
// 		this.z = 1;

// 		this.r = random(1, 8);
// 	}

// 	update() {
// 		// speed += 1;
// 		this.x += speed;
// 		this.y += speed;
// 	}

// 	draw() {
// 		noStroke();
// 		fill(255, 255, 255);
// 		ellipse(this.x, this.y, this.r);
// 	}
// }


class Star {

	constructor() {
		this.x = random(-width, width);
		this.y = random(-height, height);
		this.z = random(height);
		this.pz = this.z;
	}

	update() {
		this.z = this.z - speed;
		if (this.z < 1) {
			this.z = height;
			this.x = random(-width, width);
			this.y = random(-height, height);
			this.pz = this.z;
		}
	}

	draw() {
		fill(255);
		noStroke();

		let sx = map(this.x / this.z, 0, 1, 0, width);
		let sy = map(this.y / this.z, 0, 1, 0, height);

		let r = map(this.z, 0, height, 4, 0);
		let px = map(this.x / this.pz, 0, 1, 0, width);
		let py = map(this.y / this.pz, 0, 1, 0, height);

		this.pz = this.z;

		stroke(255);
		strokeWeight(r);
		line(px, py, sx, sy);
	}
}


let speed = 15;
let stars = [];

setup = () => {
	createCanvas(windowWidth, windowHeight);
	// createCanvas(500, 500);
	noStroke();
	fill(255, 255, 255);
	stars = Array.from({ length: 25000 }, () => new Star());
};

draw = () => {
	background(0);
	translate(width / 2, height / 2);
	stars.forEach(star => {
		star.update();
		star.draw();
	});
};

// windowResized = () => {
// 	resizeCanvas(windowWidth, windowHeight);
// };


// mouseWheel = (event) => {
// };
// touchStarted = (event) => {
// 	if (event.touches != null) {
// 		zooming = (fract >= 7 || fract <= 1) ? !zooming : zooming;
// 		fract = (event.touches.length == 2 && zooming) ? fract + 1 : (event.touches.length == 2 && !zooming) ? fract - 1 : fract;
// 	}
// };