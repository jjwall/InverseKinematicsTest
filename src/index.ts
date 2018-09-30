import { Segment } from "./Segment";

// set up game state
var canvas = <HTMLCanvasElement> document.getElementById('gameScreen');
var ctx = canvas.getContext('2d');
var rect = canvas.getBoundingClientRect();
var mouseY = 0;
var mouseX = 0;
var seg = new Segment(300, 200, 100, 0);

function update() : void {
    seg.follow(mouseX, mouseY);
    seg.update();
}

function draw() : void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    seg.draw(ctx);
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
