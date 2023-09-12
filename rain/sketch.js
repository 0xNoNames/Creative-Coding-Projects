var gui = new dat.GUI({ load: getPresetJSON() });

// gui.useLocalStorage = true;

let variables = {
	depth: 7,
	opacity: 100,
	maxAngle: window.innerWidth > 2000 ? 40 : window.innerWidth * 0.02,
	volume: 0.5,
	numDrops: window.innerWidth,
	slowMotion: 1,
	minLenght: 3,
	maxLenght: 100,
	minWidth: 1,
	maxWidth: 20,
	minSpeed: 3,
	maxSpeed: 60,
};

let palette = {
	background: [13, 13, 20],
	rain: [82, 104, 191],
};

gui.remember(variables);
gui.remember(palette);

let lenghtFolder = gui.addFolder("Drop lenght");
let minLenghtListener = lenghtFolder.add(variables, "minLenght", 0, 50);
let maxLenghtListener = lenghtFolder.add(variables, "maxLenght", 0, 500);

let widthFolder = gui.addFolder("Drop width");
let minWidthListener = widthFolder.add(variables, "minWidth", 0, 10);
let maxWidthListener = widthFolder.add(variables, "maxWidth", 0, 60);

let speedFolder = gui.addFolder("Drop speed");
let minSpeedListener = speedFolder.add(variables, "minSpeed", 0, 20);
let maxSpeedListener = speedFolder.add(variables, "maxSpeed", 0, 120);

let distantFolder = gui.addFolder("Distant drops");
let opacityListener = distantFolder.add(variables, "opacity", 0, 255);
let depthListener = distantFolder.add(variables, "depth", 0.01, 15);

let colorsFolder = gui.addFolder("Colors");
colorsFolder.addColor(palette, "background");
colorsFolder.addColor(palette, "rain");

gui.add(variables, "maxAngle", 0, 90).listen();
gui.add(variables, "numDrops", 0, 5000).listen();
gui.add(variables, "volume", 0, 1);
gui.add(variables, "slowMotion", 0, 2);

raindrops = [];

class Raindrop {
	constructor() {
		this.initialize();
		this.y = random(-height, height);
	}

	initialize = () => {
		this.maxDepth = exp(variables.depth);
		this.x = random(-width / 4, width * 1.25);
		this.y = random(-height);
		this.z = exp(random(0, variables.depth));
		this.lenght = map(this.z, 1, this.maxDepth, variables.minLenght, variables.maxLenght);
		this.width = map(this.z, 1, this.maxDepth, variables.minWidth, variables.maxWidth);
		this.speed = map(this.z, 1, this.maxDepth, variables.minSpeed, variables.maxSpeed);
		this.opacity = map(this.z, 1, this.maxDepth, variables.opacity, 255);
	};

	show = (angle) => {
		stroke(palette.rain[0], palette.rain[1], palette.rain[2], this.opacity);
		strokeWeight(this.width);
		line(this.x, this.y, this.x + this.lenght * sin(angle), this.y + this.lenght * cos(angle));
	};

	update = (angle) => {
		this.x += (this.speed * (1.5 * variables.slowMotion)) * sin(angle);
		this.y += (this.speed * (1.5 * variables.slowMotion)) * cos(angle);
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
	for (let i = 0; i < variables.numDrops; i++)
		raindrops.push(new Raindrop());
};


draw = () => {
	background(palette.background);

	while (raindrops.length < variables.numDrops)
		raindrops.push(new Raindrop());

	while (raindrops.length > variables.numDrops)
		raindrops.pop();

	angle = map(noise(time), 0, 1, -variables.maxAngle, variables.maxAngle);

	raindrops.forEach(drop => {
		drop.update(angle);
		drop.show(angle);
	});

	time += 0.002 * (1.5 * variables.slowMotion);

	rainSound.rate(variables.slowMotion);
	rainSound.setVolume(variables.volume);
};

minLenghtListener.onChange(() => {
	raindrops.forEach(drop => { drop.lenght = map(drop.z, 1, drop.maxDepth, variables.minLenght, variables.maxLenght); });
});

maxLenghtListener.onChange(() => {
	raindrops.forEach(drop => { drop.lenght = map(drop.z, 1, drop.maxDepth, variables.minLenght, variables.maxLenght); });
});

maxWidthListener.onChange(() => {
	raindrops.forEach(drop => { drop.width = map(drop.z, 1, drop.maxDepth, variables.minWidth, variables.maxWidth); });
});

minWidthListener.onChange(() => {
	raindrops.forEach(drop => { drop.width = map(drop.z, 1, drop.maxDepth, variables.minWidth, variables.maxWidth); });
});

minSpeedListener.onChange(() => {
	raindrops.forEach(drop => { drop.speed = map(drop.z, 1, drop.maxDepth, variables.minSpeed, variables.maxSpeed); });
});

maxSpeedListener.onChange(() => {
	raindrops.forEach(drop => { drop.speed = map(drop.z, 1, drop.maxDepth, variables.minSpeed, variables.maxSpeed); });
});

opacityListener.onChange(() => {
	raindrops.forEach(drop => { drop.opacity = map(drop.z, 1, drop.maxDepth, variables.opacity, 255); });
});

depthListener.onChange(() => {
	raindrops.forEach(drop => {
		drop.maxDepth = exp(variables.depth);
		drop.z = exp(random(0, variables.depth));
		drop.lenght = map(drop.z, 1, drop.maxDepth, variables.minLenght, variables.maxLenght);
		drop.width = map(drop.z, 1, drop.maxDepth, variables.minWidth, variables.maxWidth);
		drop.speed = map(drop.z, 1, drop.maxDepth, variables.minSpeed, variables.maxSpeed);
		drop.opacity = map(drop.z, 1, drop.maxDepth, variables.opacity, 255);
	});
});



windowResized = () => {
	resizeCanvas(windowWidth, windowHeight);
	variables.maxAngle = map(width, 0, 2000, 0, 40);
	variables.numDrops = width;
	console.log(maxLenghtListener.getValue());
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


function getPresetJSON() {
	return {
		"preset": "Default",
		"closed": false,
		"remembered": {
			"Default": {
				"0": {
					"depth": 7,
					"opacity": 100,
					"maxAngle": window.innerWidth > 2000 ? 40 : window.innerWidth * 0.02,
					"volume": 0.5,
					"numDrops": window.innerWidth,
					"slowMotion": 1,
					"minLenght": 3,
					"maxLenght": 100,
					"minWidth": 1,
					"maxWidth": 20,
					"minSpeed": 3,
					"maxSpeed": 60
				},
				"1": {
					"background": [13, 13, 20],
					"rain": [82, 104, 191]
				}
			},
		},
	};
};