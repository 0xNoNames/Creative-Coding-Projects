class Satellite extends Planet {
    show(planetX, planetY) {
        push();
        fill(this.color);
        translate(planetX, planetY);

        this.x = cos(this.orbitAngle) * this.distance;
        this.y = sin(this.orbitAngle) * this.distance;

        translate(this.x, this.y);
        rotate(this.rotationAngle);
        this.polygon(0, 0, this.radius, this.npoints);

        pop();
    }
}