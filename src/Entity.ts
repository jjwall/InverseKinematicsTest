import { Segment } from "./Segment";

class Leg {
    targetX: number;
    targetY: number;
    len: number;
    reachCount: number;
    seg1: Segment;
    seg2: Segment;
    constructor(X: number, Y: number, Seg1: Segment, Seg2: Segment) {
        this.len = Seg1.len + Seg2.len;
        this.reachCount = 25;
        this.targetX = X;
        this.targetY = Y;
        this.seg1 = Seg1;
        this.seg2 = Seg2;
    }

    reach() {
        if (this.reachCount > 0) {
            this.reachCount--;
            this.targetX += 2;
        }
    }

    update() {
        // pass in vel of entity
        this.seg1.a.x++;
        this.seg2.follow(this.targetX, this.targetY);
        this.seg2.update();
        this.seg1.follow(this.seg2.a.x, this.seg2.a.y, this.seg2);
        this.seg1.update();
        // move leg test code
        if (calculateLegDistance(this.seg1, this.seg2) > this.len && this.targetX < this.seg2.a.x) {// && this.leg1Target.reachCount === 0) {
            this.reachCount = 40;
        }
        this.reach();
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.seg1.draw(ctx);
        this.seg2.draw(ctx);
    }
}

export class Entity {
    x: number;
    y: number;
    h: number;
    w: number;
    legs: Leg[];
    ticks: number;
    constructor(X: number, Y: number, H: number, W: number) {
        this.ticks = 1;
        this.x = X;
        this.y = Y;
        this.h = H;
        this.w = W
        this.legs = [];
        let leg1seg1 = new Segment(this.x + this.w, this.y, 10, 225 * Math.PI/180);
        let leg1seg2 = new Segment(0, 0, 10, 0, leg1seg1);
        let leg2seg1 = new Segment(this.x + this.w, this.y + this.h, 10, 90 * Math.PI/180);
        let leg2seg2 = new Segment(0, 0, 10, 0, leg2seg1);
        let leg3seg1 = new Segment(this.x, this.y + this.h, 10, 90 * Math.PI/180);
        let leg3seg2 = new Segment(0, 0, 10, 0, leg2seg1);
        let leg4seg1 = new Segment(this.x, this.y, 10, 225 * Math.PI/180);
        let leg4seg2 = new Segment(0, 0, 10, 0, leg1seg1);
        this.legs.push(new Leg(X + this.w + 10, Y - 5, leg1seg1, leg1seg2)); 
        this.legs.push(new Leg(X - this.w - 10, Y + this.h + 5, leg2seg1, leg2seg2));
        this.legs.push(new Leg(X - this.w - 10, Y + this.h + 5, leg3seg1, leg3seg2));
        this.legs.push(new Leg(X - this.w + 10, Y - 5, leg4seg1, leg4seg2));

        // leg2seg2.follow(X, Y);
    }

    update() : void {
        this.ticks++;
        // arbitray vel goes here
        this.x++;

        this.legs.forEach(leg => {
            leg.update();
        });
    }

    draw (ctx: CanvasRenderingContext2D) : void {
        ctx.fillStyle = "grey";
        ctx.fillRect(this.x, this.y, this.w, this.h);

        this.legs.forEach(leg => {
            leg.draw(ctx);
        });
    }
}

function calculateLegDistance(Seg1: Segment, Seg2: Segment): number {
    var v1 = Seg2.b.x - Seg1.a.x;
    var v2 = Seg2.b.y - Seg1.a.y;
    var dist = Math.sqrt(v1*v1 + v2*v2);
    return dist;
}