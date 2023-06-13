draw = () => {
    const generateTriangle = (a, b, triangleSize, orientation, depth) => {
        const a1 = orientation == 0 ? -120 : orientation == 1 ? 120 : 0;
        const c = new Point(a.x + cos(radians(a1)) * triangleSize, a.y + sin(radians(a1)) * triangleSize);
        const tmp = new Triangle(a, b, c);
        // innerTriangle(tmp, 5, 5 ** 5);
        triangle(a.x, a.y, b.x, b.y, c.x, c.y);
        if (depth) {
            depth -= 1;
            generateTriangle(a.clone(), c.clone(), triangleSize, (orientation + 1) % 2, depth);
            generateTriangle(c.clone(), a.clone(), triangleSize, (orientation - 1) % 2, depth);
        }
    };


    const a0 = 60;//randint(30, 120);
    const a1 = 60;//randint(30, 60);
    const triangleSize = 75;

    const a = new Point(SIZE / 2, (SIZE / 2) - triangleSize / 2);
    const b = new Point(a.x - cos(radians(a0)) * triangleSize, a.y + sin(radians(a0)) * triangleSize);
    const c = new Point(a.x + cos(radians(a1)) * triangleSize, a.y + sin(radians(a1)) * triangleSize);
    const t = new Triangle(a.clone(), b.clone(), c.clone());

    innerTriangle(t, 5, 5 ** 5);

    stroke(255, 0, 0);
    generateTriangle(b.clone(), a.clone(), triangleSize, 0, 3);
    stroke(0, 255, 0);
    generateTriangle(c.clone(), b.clone(), triangleSize, 1, 3);
    stroke(0, 0, 255);
    generateTriangle(a.clone(), c.clone(), triangleSize, 2, 3);

}; 