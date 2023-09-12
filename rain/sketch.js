let gui = new dat.GUI();

let variables = {
	depth: 10,
	distantOpacity: 100,
	maxAngle: (window.innerWidth / 25),
	volume: 0.5,
	numRaindrops: window.innerWidth,
	speed: 1
};

gui.add(variables, "depth", 0, 15);
gui.add(variables, "distantOpacity", 0, 255);
gui.add(variables, "maxAngle", 0, 90).listen();
gui.add(variables, "volume", 0, 1);
gui.add(variables, "numRaindrops", 0, 5000).listen();
gui.add(variables, "speed", 0, 1);

let palette = {
	background: [13, 13, 20],
	rain: [82, 104, 191],
};
gui.addColor(palette, "background");
gui.addColor(palette, "rain");

raindrops = [];

class Raindrop {
	constructor() {
		this.initialize();
		this.y = random(-height, height);
	}

	initialize = () => {
		let maxDepth = exp(variables.depth);
		this.x = random(-width / 4, width * 1.25);
		this.y = random(-height);
		this.z = exp(random(0, variables.depth));
		this.lenght = map(this.z, 1, maxDepth, 5, 100);
		this.width = map(this.z, 1, maxDepth, 1, 20);
		this.speed = map(this.z, 1, maxDepth, 3, 60);
		this.opacity = map(this.z, 1, maxDepth, variables.distantOpacity, 255);
	};

	show = (angle) => {
		stroke(palette.rain[0], palette.rain[1], palette.rain[2], this.opacity);
		strokeWeight(this.width);
		line(this.x, this.y, this.x + this.lenght * sin(angle), this.y + this.lenght * cos(angle));
	};

	update = (angle) => {
		this.x += (this.speed * (1.5 * variables.speed)) * sin(angle);
		this.y += (this.speed * (1.5 * variables.speed)) * cos(angle);
		if (this.y > height)
			this.initialize();
	};
}

preload = () => {
	rainSound = loadSound("rain.mp3");
	rainSound.playMode("untilDone");
};

setup = () => {
	createCanvas(windowWidth, windowHeight);
	strokeCap(SQUARE);
	angleMode(DEGREES);
	time = random(100);
	for (let i = 0; i < variables.numRaindrops; i++)
		raindrops.push(new Raindrop());
};


draw = () => {
	background(palette.background); // midnight

	angle = map(noise(time), 0, 1, -variables.maxAngle, variables.maxAngle);

	raindrops.forEach(drop => {
		drop.update(angle);
		drop.show(angle);
	});

	time += 0.002 * (1.5 * variables.speed);

	while (raindrops.length < variables.numRaindrops)
		raindrops.push(new Raindrop());

	while (raindrops.length > variables.numRaindrops)
		raindrops.pop();

	rainSound.rate(variables.speed);
	rainSound.setVolume(variables.volume);
};


windowResized = () => {
	resizeCanvas(windowWidth, windowHeight);
	variables.maxAngle = (width / 25);
	variables.numRaindrops = width;
};


mousePressed = () => {
	rainSound.loop();
};

keyPressed = () => {
	rainSound.loop();
};

touchStarted = () => {
	rainSound.loop();
};