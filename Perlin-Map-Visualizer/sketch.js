var loadingDiv = document.getElementById("loading");


var seedInput = document.getElementById("seed-input");

seedInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        seed = seedInput.value || ~~random(10000);
        updateDraw();
    }
});


var pixelSizeSlider = document.getElementById("pixel-size-slider");
var pixelSizeLabel = document.getElementById("pixel-size-value-label");

pixelSizeLabel.innerHTML = 5;

pixelSizeSlider.oninput = function () {
    pixelSize = parseInt(this.value);
    pixelSizeLabel.innerHTML = this.value;
};

pixelSizeSlider.onmouseup = async function () {
    updateDraw();
};


var noiseZoomSlider = document.getElementById("noise-zoom-slider");
var noiseZoomLabel = document.getElementById("noise-zoom-value-label");

noiseZoomLabel.innerHTML = 0.015;

noiseZoomSlider.oninput = function () {
    noiseZoom = parseFloat(this.value);
    noiseZoomLabel.innerHTML = this.value;
    updateDraw();
};


var noiseOctavesSlider = document.getElementById("noise-octaves-slider");
var noiseOctavesLabel = document.getElementById("noise-octaves-value-label");

noiseOctavesLabel.innerHTML = 4;

noiseOctavesSlider.oninput = function () {
    noiseOctaves = parseInt(this.value);
    noiseOctavesLabel.innerHTML = this.value;
    updateDraw();
};

var noiseFalloffSlider = document.getElementById("noise-falloff-slider");
var noiseFalloffLabel = document.getElementById("noise-falloff-value-label");

noiseFalloffLabel.innerHTML = 0.5;

noiseFalloffSlider.oninput = function () {
    noiseFalloff = parseFloat(this.value);
    noiseFalloffLabel.innerHTML = this.value;
    updateDraw();
};


let seed;              // Seed noise
let pixelSize = 5;     // Size of a pixel
let noiseZoom = .015;  // Scale of the noise
let noiseOctaves = 4;  // Number of octaves aka level of details (LoD)
let noiseFalloff = .5; // Falloff of the strengh of succeccives octaves (1 -> 0.5 -> 0.25 etc.)


async function updateDraw() {
    loadingDiv.style = "display: block";
    await new Promise(r => setTimeout(r, 5));
    redraw();
}

function setup() {
    createCanvas(window.innerWidth / 2, window.innerWidth / 2);
    noLoop();
    seed = ~~random(10000);
    seedInput.value = seed;
}


function draw() {
    // ######################### DEBUG #########################
    let drawTime = millis();                                // #
    // #########################################################  

    background(255);

    noiseSeed(seed);

    noiseDetail(noiseOctaves, noiseFalloff);
    noStroke();

    for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
            pixelValue = 255 * noise(x * noiseZoom, y * noiseZoom);

            if (pixelValue < 50)       // Deeper water
                fill(50, 50, 255);
            else if (pixelValue < 90)  // Deep water
                fill(100, 100, 255);
            else if (pixelValue < 100) // Sand
                fill(255, 255, 0);
            else if (pixelValue < 150) // Grass
                fill(0, 200, 0);
            else if (pixelValue < 180) // Mountains
                fill(100, 100, 100);
            else                        // Snow
                fill(255, 255, 255);

            rect(x, y, pixelSize);
        }
    }

    loadingDiv.style = "display: hidden";

    // ######################################### DEBUG ##########################################
    let endTime = millis();                                                                  // #
    console.log("Duration since draw start : " + (endTime - drawTime).toFixed(2) + " ms\n"); // #
    // ##########################################################################################
}