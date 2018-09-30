/** implementation of Java's Processing PVector */
export class PVector {
    x: number;
    y: number;
    magnitude: number;
    constructor(X: number, Y: number) {
        this.x = X;
        this.y = Y;
        this.magnitude = Math.sqrt((X^2 + Y^2));
    }

    /** set x and y without allocating new PVector */
    set(X: number, Y: number) : void {
        this.x = X;
        this.y = Y;
        this.magnitude = Math.sqrt((X^2 + Y^2));
    }

    /** sets the magnitude (length) of vector
     *  finds new x and y coordinates
     */
    setMag(Magnitude: number) : void {
        const angle = Math.atan2(this.y, this.x);
        this.x = Math.cos(angle) * Magnitude;
        this.y = Math.sin(angle) * Magnitude;
        this.magnitude = Magnitude;
    }

    /** returns angle of vector */
    heading() : number {
        return Math.atan2(this.y, this.x);
    }

    /** multiplies the components of the vec by some number  */
    mult(Multiple: number) : void {
        this.x = this.x * Multiple;
        this.y = this.y * Multiple;
    }

    /** returns new vec of vec A plus vec B */
    static add(A: PVector, B: PVector) : PVector {
        const x = A.x + B.x;
        const y = A.y + B.y;
        return new PVector(x, y);
    }

    /** returns new vec of vec B subtracted from vec A */
    static sub(A: PVector, B: PVector) : PVector {
        const x = A.x - B.x;
        const y = A.y - B.y;
        return new PVector(x, y)
    }
}