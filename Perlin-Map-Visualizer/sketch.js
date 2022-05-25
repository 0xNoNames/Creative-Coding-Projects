var pixelSizeSlider = document.getElementById("pixelSizeSlider");
var pixelSizeLabel = document.getElementById("pixelSizeLabel");

pixelSizeLabel.innerHTML = 5;

pixelSizeSlider.oninput = function () {
    pixelSize = parseInt(this.value);
    pixelSizeLabel.innerHTML = this.value;
    redraw();
}


const seed = 5; // Seed noise
const noiseZoom = .015;  // Scale of the noise
const noiseOctaves = 4;  // Number of octaves aka level of details (LoD)
const noiseFalloff = .5; // Falloff of the strengh of succeccives octaves (1 -> 0.5 -> 0.25 etc.)
let pixelSize = 5; // Size of a pixel


function setup() {
    createCanvas(window.innerWidth / 3, window.innerWidth / 3);
    noLoop();
}


function draw() {
    // ######################### DEBUG #########################
    let drawTime = millis()                                // #
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

    // ######################################### DEBUG ##########################################
    let endTime = millis();                                                                  // #
    console.log("Duration since draw start : " + (endTime - drawTime).toFixed(2) + " ms\n"); // #
    // ##########################################################################################
}