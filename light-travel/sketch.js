var gui = new dat.GUI({ load: getPresetJSON() });

gui.useLocalStorage = true;

let variables = {
	depth: 7,
	opacity: 100,
	numStars: window.innerWidth,
	speed: 1,
};

let palette = {
	background: [0, 0, 0],
	rain: [255, 255, 255],
};

// gui.remember(variables);
// gui.remember(palette);

// let lenghtFolder = gui.addFolder("Drop lenght");
// let minLenghtListener = lenghtFolder.add(variables, "minLenght", 0, 50);
// let maxLenghtListener = lenghtFolder.add(variables, "maxLenght", 0, 500);

// let widthFolder = gui.addFolder("Drop width");
// let minWidthListener = widthFolder.add(variables, "minWidth", 0, 10);
// let maxWidthListener = widthFolder.add(variables, "maxWidth", 0, 60);

// let speedFolder = gui.addFolder("Drop speed");
// let minSpeedListener = speedFolder.add(variables, "minSpeed", 0, 20);
// let maxSpeedListener = speedFolder.add(variables, "maxSpeed", 0, 120);

// let distantFolder = gui.addFolder("Distant drops");
// let opacityListener = distantFolder.add(variables, "opacity", 0, 255);
// let depthListener = distantFolder.add(variables, "depth", 0.01, 15);

// let colorsFolder = gui.addFolder("Colors");
// colorsFolder.addColor(palette, "background");
// colorsFolder.addColor(palette, "rain");

gui.add(variables, "numStars", 0, 10000).listen();
gui.add(variables, "speed", 1, 100);

stars = [];


class Star {

	constructor() {
		this.x = random(-width, width);
		this.y = random(-height, height);
		this.z = random(width);
		this.pz = this.z;
	}

	update() {
		this.z = this.z - variables.speed;
		if (this.z < 1) {
			this.z = width;
			this.x = random(-width, width);
			this.y = random(-height, height);
			this.pz = this.z;
		}
	}

	show() {
		fill(palette.rain);
		noStroke();

		let sx = map(this.x / this.z, 0, 1, 0, width);
		let sy = map(this.y / this.z, 0, 1, 0, height);

		let r = map(this.z, 0, width, 4, 0);
		ellipse(sx, sy, r, r);

		let px = map(this.x / this.pz, 0, 1, 0, width);
		let py = map(this.y / this.pz, 0, 1, 0, height);

		this.pz = this.z;

		stroke(255);
		strokeWeight(r);
		line(px, py, sx, sy);

	}
}

setup = () => {
	createCanvas(windowWidth, windowHeight);
	strokeCap(SQUARE);
	angleMode(DEGREES);
	// time = random(100);
	for (let i = 0; i < variables.numStars; i++)
		stars.push(new Star());
};


draw = () => {
	background(palette.background);

	while (stars.length < variables.numStars)
		stars.push(new Star());

	while (stars.length > variables.numStars)
		stars.pop();

	// angle = map(noise(time), 0, 1, -variables.maxAngle, variables.maxAngle);

	translate(width / 2, height / 2);
	stars.forEach(star => {
		star.update();
		star.show();
	});

	// time += 0.002 * (1.5 * variables.speed);

	// rainSound.rate(variables.speed);
	// rainSound.setVolume(variables.volume);
};

// minLenghtListener.onChange(() => {
// 	raindrops.forEach(drop => { drop.lenght = map(drop.z, 1, drop.maxDepth, variables.minLenght, variables.maxLenght); });
// });

// maxLenghtListener.onChange(() => {
// 	raindrops.forEach(drop => { drop.lenght = map(drop.z, 1, drop.maxDepth, variables.minLenght, variables.maxLenght); });
// });

// maxWidthListener.onChange(() => {
// 	raindrops.forEach(drop => { drop.width = map(drop.z, 1, drop.maxDepth, variables.minWidth, variables.maxWidth); });
// });

// minWidthListener.onChange(() => {
// 	raindrops.forEach(drop => { drop.width = map(drop.z, 1, drop.maxDepth, variables.minWidth, variables.maxWidth); });
// });

// minSpeedListener.onChange(() => {
// 	raindrops.forEach(drop => { drop.speed = map(drop.z, 1, drop.maxDepth, variables.minSpeed, variables.maxSpeed); });
// });

// maxSpeedListener.onChange(() => {
// 	raindrops.forEach(drop => { drop.speed = map(drop.z, 1, drop.maxDepth, variables.minSpeed, variables.maxSpeed); });
// });

// opacityListener.onChange(() => {
// 	raindrops.forEach(drop => { drop.opacity = map(drop.z, 1, drop.maxDepth, variables.opacity, 255); });
// });

// depthListener.onChange(() => {
// 	raindrops.forEach(drop => {
// 		drop.maxDepth = exp(variables.depth);
// 		drop.z = exp(random(0, variables.depth));
// 		drop.lenght = map(drop.z, 1, drop.maxDepth, variables.minLenght, variables.maxLenght);
// 		drop.width = map(drop.z, 1, drop.maxDepth, variables.minWidth, variables.maxWidth);
// 		drop.speed = map(drop.z, 1, drop.maxDepth, variables.minSpeed, variables.maxSpeed);
// 		drop.opacity = map(drop.z, 1, drop.maxDepth, variables.opacity, 255);
// 	});
// });



// windowResized = () => {
// 	resizeCanvas(windowWidth, windowHeight);
// 	variables.maxAngle = map(width, 0, 2000, 0, 40);
// 	variables.numStars = width;
// 	console.log(maxLenghtListener.getValue());
// };

// mousePressed = () => {
// 	rainSound.loop();
// };

// keyPressed = () => {
// 	rainSound.loop();
// };

// touchStarted = () => {
// 	rainSound.loop();
// };


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
					"numStars": window.innerWidth,
					"speed": 1,
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