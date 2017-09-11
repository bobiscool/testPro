var G = 9.8;
var fps = 10;
var lastTime = new Date;

function calcFps(now) {
    var fps = 1000 / (now - lastTime);
    // console.log(fps);
    lastTime = now;
    if (fps < 0) {
        fps = 100;
    }
    return fps;
}

function Ball(x, y, vX, vY) {
    this.x = x;
    this.y = y;
    this.vX = vX;
    this.vY = vY;
}

Ball.prototype = {
    updatePosition: function () {
        this.x += this.vX;
        this.y += this.vY;
    },
    updateVy: function () {
        let now = new Date();
        this.vY += G / calcFps(now);
    },
    paint: function (context) {
        context.save();
        context.beginPath();
        context.fillStyle = "rgb(0,0,0)";
        context.arc(this.x, this.y, 10, 0, Math.PI * 2);
        context.fill();
        context.restore();
    }

}