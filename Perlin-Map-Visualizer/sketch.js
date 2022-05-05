
let noiseValue;
const noiseScale = .015;
const noiseOctaves = 4; // Number of octaves aka level of details
const noiseFalloff = .5; // Falloff of the strengh of succeccives octaves (1 -> 0.5 -> 0.25 etc.)


let min = 300;
let max = 0;
let moyenne = 0;
let totalPixels = 0;


function setup() {
    createCanvas(window.innerWidth / 4, window.innerWidth / 4);

    // noiseSeed(seed);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            noiseDetail(noiseOctaves, noiseFalloff);
            noiseValue = noise(x * noiseScale, y * noiseScale);
            pixelHeight = noiseValue * 255;

            if (noiseValue < min)
                min = noiseValue;
            if (noiseValue > max)
                max = noiseValue;
            moyenne += noiseValue;

            totalPixels += 1;

            if (pixelHeight < 50)       // Eau profonde
                stroke(25, 25, 255);
            else if (pixelHeight < 90)  // Eau peu profonde
                stroke(75, 75, 255);
            else if (pixelHeight < 100)  // Sable
                stroke(255, 255, 0);
            else if (pixelHeight < 150) // Herbe
                stroke(0, 200, 0);
            else if (pixelHeight < 180) // Montagnes
                stroke(100, 100, 100);
            else                        // Neige
                stroke(255, 255, 255);

            // stroke(pixelHeight);

            point(x, y);
        }
    }
    console.log("min : " + min * 255);
    console.log("max : " + max * 255);
    console.log("moyenne : " + (moyenne / totalPixels) * 255);
    // moyenne = 0;
    // totalPixels = 0;
}

function draw() {
    // background(0);
    // for (let y = 0; y < height; y++) {
    //     for (let x = 0; x < width; x++) {
    //         noiseDetail(noiseOctaves, noiseFalloff);
    //         noiseValue = noise(x * noiseScale, y * noiseScale);
    //         pixelHeight = noiseValue * 255;

    //         if (noiseValue < min)
    //             min = noiseValue;
    //         if (noiseValue > max)
    //             max = noiseValue;

    //         moyenne += noiseValue;
    //         totalPixels += 1;

    //         if (pixelHeight < 50)
    //             stroke(0, 0, 255);
    //         else if (pixelHeight < 100)
    //             stroke(255, 255, 0);
    //         else if (pixelHeight < 150)
    //             stroke(0, 255, 0);
    //         else if (noiseValue < 175)
    //             stroke(100, 100, 100);
    //         else
    //             stroke(255, 255, 255);

    //         // stroke(pixelHeight);

    //         point(x, y);
    //     }
    // }
    // console.log("min : " + min * 255);
    // console.log("max : " + max * 255);
    // console.log("moyenne : " + (moyenne / totalPixels) * 255);
    // console.log("")
    // moyenne = 0;
    // totalPixels = 0;
}