var canvas = document.getElementById('haha'),
    context = canvas.getContext('2d');
var sky = new Image();
    var skyOffset = 0;
    var fps=10;
    var lastTime =new Date;

    function calcFps (now){
        var fps = 1000/(now - lastTime);
        console.log(fps);
        lastTime = now;
        return fps;
    }

    function draw(){
        // context.clearRect(0,0,canvas.width,canvas.height);
        context.save();
       skyOffset = skyOffset<canvas.width?skyOffset+0.1/fps:0;
       context.save();
       console.log(skyOffset);

       context.translate(-skyOffset,0);

       context.drawImage(sky,0,0);
       context.drawImage(sky,sky.width-2,0);
       context.restore();

    }


    function animate(now){
         if(!now){
             now = +new Date();
         }
            fps = calcFps(now);
            
            draw();
            requestNextAnimationFrame(animate);
    }



    sky.src ="./js/2.png";

    // sky.onload = function(){
  animate();
    // }