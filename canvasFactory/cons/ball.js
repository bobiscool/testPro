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
        context.arc(this.x, this.y, 7, 0, Math.PI * 2);
        context.fill();
        context.restore();
        this.drawLine(context);
    },
    drawLine:function(context){
        //绘制函数线
        var _temB = this.y - this.vY/this.vX*this.x;

        
          context.save();
          context.beginPath();
          context.strokeStyle = "green";
          for(var i =0;i<canvas.width;i +=0.1){
              context.lineTo(i,_temB+this.vY/this.vX*i);
          }

          context.stroke();
          context.restore();
        
    },
        getColissionElement:function(){
            var _self = this;
            return {x:_self.x,y:_self.y,k:_self.vY/this.vX,b:this.y - this.vY/this.vX*this.x}
        }

}