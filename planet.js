class Planet {
    constructor(radius, distance, npoints, orbitSpeed, color) {
        this.radius = radius;
        this.angle = random(TWO_PI);
        this.distance = distance;
        this.npoints = npoints;
        this.orbitSpeed = orbitSpeed;
        this.color = color;
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
        rotate(this.angle);
        translate(this.distance, 0);
        this.polygon(0, 0, this.radius, this.npoints);
        pop();
    }

    orbit() {
        this.angle += this.orbitSpeed;
    }

    // rotation() {
    //     push();
    //     pop();
    // }
}