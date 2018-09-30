import { PVector } from "./PVector";

export class Segment {
    a: PVector;
    angle: number;
    len: number;
    b: PVector;
    parent: Segment;
    constructor(X: number, Y: number, Len: number, Angle: number, Parent?: Segment) {
        this.a = new PVector(X, Y);
        this.len = Len;
        this.angle = Angle;

        const dx: number = this.len * Math.cos(this.angle);
        const dy: number = this.len * Math.sin(this.angle);
        this.b = new PVector(this.a.x + dx, this.a.y + dy);

        if (Parent !== undefined) {
            this.parent = Parent
            this.a = new PVector(this.parent.b.x, this.parent.b.y);
        }
        else {
            this.parent = null;
        }

        this.calculateB();
    }

    follow(targetX: number, targetY: number, child?: Segment) {
        let target = new PVector(targetX, targetY);
        let dir = PVector.sub(target, this.a);
        this.angle = dir.heading();


        if (this.parent !== null) {
            dir.setMag(this.len);
            dir.mult(-1);
            this.a = PVector.add(target, dir);
        }
        else {
            if (child !== undefined) {
                // this.a.x = child.b.x;
                // this.a.y = child.b.y;
                child.a.x = this.b.x;
                child.a.y = this.b.y;
                // child.a.setMag(Math.sqrt((this.a.x)^2 + (this.a.y)^2));
                // child.b.setMag(Math.sqrt((this.b.x)^2 + (this.b.y)^2));
            }
        }
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