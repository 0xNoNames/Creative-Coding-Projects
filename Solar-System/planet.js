class Planet {
    constructor(color, npoints, radius, distance, orbitSpeed, rotationSpeed, satellites = []) {
        this.color = color;
        this.npoints = npoints;
        this.radius = radius;
        this.distance = distance;
        this.orbitSpeed = orbitSpeed;
        this.rotationSpeed = rotationSpeed;
        this.satellites = satellites;
        this.orbitAngle = 0;
        this.rotationAngle = random(TWO_PI);
    }

    polygon(x, y, radius, npoints) {
        let angle = TWO_PI / npoints;
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = x + cos(a) * radius / 2;
            let sy = y + sin(a) * radius / 2;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }

    show() {
        push();

        fill(this.color);

        // Put the planet on its orbit
        const planetPos = [cos(radians(this.orbitAngle)) * this.distance, sin(radians(this.orbitAngle)) * this.distance];

        // Rotate the planet based on its rotation speed
        translate(planetPos[0], planetPos[1]);
        rotate(radians(this.rotationAngle));

        // Show the planet
        this.polygon(0, 0, this.radius, this.npoints);

        pop();

        // Show satellites
        this.satellites.forEach(satellite => {
            satellite.show(planetPos);
            satellite.update();
        });
    }

    update() {
        // Update angles
        this.rotationAngle = (this.rotationAngle + this.rotationSpeed) % 360;
        this.orbitAngle = (this.orbitAngle + this.orbitSpeed) % 360;
    }
}