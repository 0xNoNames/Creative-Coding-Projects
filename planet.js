class Planet {
    constructor(radius, distance, npoints, orbitSpeed, color, x = cos(this.orbitAngle) * this.distance, y = sin(this.orbitAngle) * this.distance, orbitAngle = random(TWO_PI)) {
        this.radius = radius;
        this.orbitAngle = orbitAngle;
        this.distance = distance;
        this.npoints = npoints;
        this.orbitSpeed = orbitSpeed;
        // this.rotationSpeed = rotationSpeed;
        this.color = color;
        this.x = x;
        this.y = y;
    }

    polygon(x, y, radius, npoints) {
        let angle = TWO_PI / npoints;
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = x + cos(a) * radius;
            let sy = y + sin(a) * radius;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }

    show() {
        push();
        fill(this.color);
        this.x = cos(this.orbitAngle) * this.distance;
        this.y = sin(this.orbitAngle) * this.distance;
        // translate(this.x, this.y);
        // rotate(this.orbitSpeed);
        this.polygon(this.x, this.y, this.radius, this.npoints);
        pop();
    }

    orbit() {
        this.orbitAngle += this.orbitSpeed;
    }

    // rotate() {
    //     this.rotateAngle += this.rotationSpeed;
    // }
}