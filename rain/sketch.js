raindrops = [];
depth = 10;
maxDepth = Math.exp(depth);

class Raindrop {
	constructor() {
		this.initialize();
		this.y = random(-height, height);
	}
	initialize = () => {
		this.x = random(-width / 4, width * 1.25);
		this.y = random(-height);
		this.z = exp(random(0, depth));
		this.lenght = map(this.z, 0, maxDepth, 10, 100);
		this.width = map(this.z, 0, maxDepth, 1, 20);
		this.speed = map(this.z, 0, maxDepth, 3, 60);
		this.strength = map(this.z, 0, maxDepth, 50, 255);
	};

	show = (angle) => {
		stroke(82, 104, 191, this.strength);
		strokeWeight(this.width);
		line(this.x, this.y, this.x + this.lenght * sin(angle), this.y + this.lenght * cos(angle));
	};

	update = (angle) => {
		this.x += (this.speed * (1.5 * mouseX / width)) * sin(angle);
		this.y += (this.speed * (1.5 * mouseX / width)) * cos(angle);
		if (this.y > height)
			this.initialize();
	};
}


setup = () => {
	createCanvas(windowWidth, windowHeight);
	strokeCap(SQUARE);
	angleMode(DEGREES);
	time = random(100);
	for (let i = 0; i < width; i++)
		raindrops.push(new Raindrop());
};


draw = () => {
	background(13, 13, 20); // midnight

	angleStrength = (width / 50) * (mouseY / width);
	angle = map(noise(time), 0, 1, -angleStrength, angleStrength);

	raindrops.forEach(drop => {
		drop.update(angle);
		drop.show(angle);
	});

	time += 0.002 * (1.5 * mouseX / width);
};


windowResized = () => {
	resizeCanvas(windowWidth, windowHeight);
};