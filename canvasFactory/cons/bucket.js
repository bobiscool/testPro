function Ellipse(context, x, y, a, b) {
    var step = (a > b) ? 1 / a : 1 / b;
    context.beginPath();
    context.moveTo(x + a, y);
    for (var i = 0; i < 2 * Math.PI; i += step) {
        context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
    }

    context.closePath();
    context.fill();
}

function Bucket(x, y) {
    this.x = x;
    this.y = y;
}

Bucket.prototype = {
    paint: function (context) {
        Ellipse(context, this.x, this.y, 50, 30);
        context.rect(this.x - 50, this.y + 10, 100, 200);
        this.drawLine(context);
        context.fill();
    },
    drawLine: function (context) {
        context.save();
        context.strokeStyle = "red";
        context.beginPath();
        context.moveTo(0,this.y);
        context.lineTo(canvas.width,this.y);
        context.stroke();
        context.restore();
    }
}