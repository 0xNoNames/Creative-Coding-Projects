raindrops = [];
maxDrops = 1000;
depth = 8;
maxDepth = Math.exp(depth);

class Raindrop {
	constructor() {
		this.initialize();
	}

	initialize = () => {
		this.x = random(width);
		this.y = random(-maxDrops);
		this.z = exp(random(0, depth));
		this.lenght = map(this.z, 0, maxDepth, 10, 100);
		this.width = map(this.z, 0, maxDepth, 1, 20);
		this.speed = map(this.z, 0, maxDepth, 1, 10);
		this.strength = map(this.z, 0, maxDepth, 50, 230);
	};

	show = () => {
		stroke(129, 120, 152, this.strength);
		strokeWeight(this.width);
		line(this.x, this.y, this.x, this.y + this.lenght);
	};

	update = () => {
		this.y += this.speed;
		if (this.y > height)
			this.initialize();
	};
}


setup = () => {
	createCanvas(windowWidth, windowHeight);
	strokeCap(SQUARE);
	for (let i = 0; i < maxDrops; i++)
		raindrops.push(new Raindrop());
	raindrops.forEach(drop => drop.show());
};

draw = () => {
	background(13, 13, 20); // midnight
	// background(93, 101, 140); //snow
	raindrops.forEach(drop => {
		drop.update();
		drop.show();
	});
};

windowResized = () => {
	resizeCanvas(windowWidth, windowHeight);
};

// mouseClicked = () => {
// 	color = hsl2rgb();
// 	effect = (effect + 1) % 8;
// };

// mouseWheel = (event) => {
// 	fract = (event.deltaY > 0 && fract < 14) ? fract += 1 : (event.deltaY < 0 && fract > 1) ? fract -= 1 : fract;
// };

// touchStarted = (event) => {
// 	if (event.touches != null) {
// 		zooming = (fract >= 7 || fract <= 1) ? !zooming : zooming;
// 		fract = (event.touches.length == 2 && zooming) ? fract + 1 :
// 			(event.touches.length == 2 && !zooming) ? fract - 1 : fract;
// 	}
// };