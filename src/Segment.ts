import { PVector } from "./PVector";

export class Segment {
    a: PVector;
    angle: number;
    len: number;
    b: PVector;
    constructor(X: number, Y: number, Len: number, Angle: number) {
        this.a = new PVector(X, Y);
        this.len = Len;
        this.angle = Angle;

        const dx: number = this.len * Math.cos(this.angle);
        const dy: number = this.len * Math.sin(this.angle);
        this.b = new PVector(this.a.x + dx, this.a.y + dy);
    }

    follow(targetX: number, targetY: number) {
        let target = new PVector(targetX, targetY);
        let dir = PVector.sub(target, this.a);
        this.angle = dir.heading();

        dir.setMag(this.len);
        dir.mult(-1);

        this.a = PVector.add(target, dir);
    }

    calculateB() : void {
        const dx: number = this.len * Math.cos(this.angle);
        const dy: number = this.len * Math.sin(this.angle);
        this.b.set(this.a.x + dx, this.a.y + dy);
    }

    update() : void {
        this.calculateB();
    }

    draw(ctx: CanvasRenderingContext2D) : void {
        ctx.beginPath();
        ctx.moveTo(this.a.x, this.a.y);
        ctx.lineTo(this.b.x, this.b.y);
        ctx.stroke();
    }
}