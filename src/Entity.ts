import { Segment } from "./Segment";

export class Entity {
    x: number;
    y: number;
    h: number;
    w: number;
    leg1seg1: Segment;
    leg1seg2: Segment;
    ticks: number;
    constructor(X: number, Y: number, H: number, W: number) {
        this.ticks = 1;
        this.x = X;
        this.y = Y;
        this.h = H;
        this.w = W;
        this.leg1seg1 = new Segment(this.x + this.w, this.y, 20, 225 * Math.PI/180);
        this.leg1seg2 = new Segment(0, 0, 20, 0, this.leg1seg1);
    }

    update() : void {
        this.ticks++;
        this.x++;
        this.leg1seg2.follow(this.lungeLeg() + this.w, this.y);
        this.leg1seg2.update();
        this.leg1seg1.follow(this.leg1seg2.a.x, this.leg1seg2.a.y);
        this.leg1seg1.update();
        // this.leg1seg1.calculateB(1);
        // if (this.x % 100 === 0) {
        //     this.leg1seg1.b.x += 10;
        //     this.leg1seg1.b.y -= 10;
        //     this.leg1seg1.a.x += 10;
        //     this.leg1seg1.a.y += 10;
        // }
    }

    lungeLeg() : number {
        return this.x + this.ticks;
    }

    draw (ctx: CanvasRenderingContext2D) : void {
        this.leg1seg1.draw(ctx);
        this.leg1seg2.draw(ctx);
        ctx.fillStyle = "grey";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}