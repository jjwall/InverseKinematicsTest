import { Segment } from "./Segment";

class LegTarget {
    x: number;
    y: number;
    len: number;
    reachCount;
    constructor(X: number, Y: number) {
        this.len = 40;
        this.reachCount = 25;
        this.x = X;
        this.y = Y;
    }

    reach() {
        if (this.reachCount > 0) {
            this.reachCount--;
            this.x += 2;
        }
    }
}

export class Entity {
    x: number;
    y: number;
    h: number;
    w: number;
    leg1seg1: Segment;
    leg1seg2: Segment;
    leg1Target: LegTarget;
    ticks: number;
    constructor(X: number, Y: number, H: number, W: number) {
        this.ticks = 1;
        this.x = X;
        this.y = Y;
        this.h = H;
        this.w = W
        this.leg1seg1 = new Segment(this.x + this.w, this.y, 20, 225 * Math.PI/180);
        this.leg1seg2 = new Segment(0, 0, 20, 0, this.leg1seg1);
        this.leg1Target = new LegTarget(X + this.w + 10, Y - 10); 
    }

    update() : void {
        this.ticks++;
        this.x++;
        this.leg1seg1.a.x++;
        this.leg1seg2.follow(this.leg1Target.x, this.leg1Target.y);
        this.leg1seg2.update();
        this.leg1seg1.follow(this.leg1seg2.a.x, this.leg1seg2.a.y, this.leg1seg2);
        this.leg1seg1.update();
        // move leg test code
        if (this.calculateLegDistance(this.leg1seg1, this.leg1seg2) < 12) {// && this.leg1Target.reachCount === 0) {
            this.leg1Target.reachCount = 25;
        }
        this.leg1Target.reach();
    }

    calculateLegDistance(Seg1: Segment, Seg2: Segment): number {
        var v1 = Seg2.b.x - Seg1.a.x;
        var v2 = Seg2.b.y - Seg1.a.y;
        var dist = Math.sqrt(v1*v1 + v2*v2);
        console.log(dist);
        return dist;
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