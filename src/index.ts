import { Segment } from "./Segment";
import { Entity } from "./Entity";
// set up state
const canvas = <HTMLCanvasElement> document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();
let mouseY = 0;
let mouseX = 0;
let seg1 = new Segment(300, 200, 100, 0);
let seg2 = new Segment(0, 0, 100, 0, seg1);
let ent = new Entity(250, 250, 25, 25);

function update() : void {
    ent.update();
    seg2.follow(mouseX, mouseY);
    // seg2.lockToChildB(seg1);
    seg2.update();
    seg1.follow(seg2.a.x, seg2.a.y);
    // seg1.calculateB(250, 250);
    seg1.update();
}

function draw() : void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ent.draw(ctx);
    seg1.draw(ctx);
    seg2.draw(ctx);
}

// main loop
setInterval(function() {
    update();
    draw();
}, 12);

canvas.addEventListener('mousemove', function (evt) {
    mouseX = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    mouseY = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
}, false);
