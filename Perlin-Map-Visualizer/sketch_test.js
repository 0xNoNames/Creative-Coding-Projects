const scaling = 10;
var mapWidt, mapHeight, noiseMap;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();
  mapWidth = width;
  mapHeight = height;
  // noiseSeed(1)
  noiseMap = generateNoiseMap(mapHeight, mapWidth, scaling);
  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      let color = 255 * noiseMap[x, y];
      fill(color);
      rect(x, y, scaling, scaling);
    }
  }
}

function draw() {
  // for (let y = 0; y < mapHeight; y++) {
  //   for (let x = 0; x < mapWidth; x++) {
  //     let color = 255 * noiseMap[x, y];
  //     fill(color);
  //     rect(x, y, scaling, scaling);
  //   }
  // }
}

function generateNoiseMap(mapWidth, mapHeight, scaling) {
  var noiseMap = [];

  if (scaling <= 0)
    scaling = 0.0001;

  for (var y = 0; y < mapHeight; y++) {
    for (var x = 0; x < mapWidth; x++) {
      let sampleX = x / scaling;
      let sampleY = y / scaling;

      let perlinValue = noise(sampleX, sampleY);

      noiseMap[x, y] = perlinValue;

      // var c = 255 * noise((scaleX / 1000) * x, (scaleY / 1000) * y);
      // fill(c);
      // rect(x, y, scaleX, scaleY);
    }
  }
  return noiseMap;
}