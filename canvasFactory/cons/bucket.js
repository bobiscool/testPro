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

function bucket(x, y) {
    this.x = x;
    this.y = y;
}

bucket.prototype = {
    paint:function(context){
      Ellipse(context,this.x,this.y,3,5);
      cntext.rect(x,y,10,20);
    }
}