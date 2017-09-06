var canvas = document.getElementById('haha'),
    context = canvas.getContext('2d');
var sky = new Image();
    var skyOffset = 0;
    var a =0 ;
    var fps=10;
    var lastTime =new Date;
    var ani=null;

    function calcFps (now){
        var fps = 1000/(now - lastTime);
        // console.log(fps);
        lastTime = now;
        return fps;
    }

    function draw(){
        // console.log(a);
      
        // context.clearRect(0,0,canvas.width,canvas.height);
        context.save();
       console.log(fps);        
       skyOffset += (skyOffset<canvas.width)?30/fps:0;
       context.save();
      
       context.translate(-1*skyOffset,0);

       context.drawImage(sky,0,0);
       context.drawImage(sky,sky.width-2,0);
       context.restore();

    }


    function animate(now){
         if(!now){
             now = +new Date();
         }
         let tem = calcFps(now)
            if(tem>0)fps=tem;
            draw();
          ani = window.requestAnimationFrame(animate);
    }



    sky.src ="./js/2.png";

    // sky.onload = function(){
  animate();
    // }