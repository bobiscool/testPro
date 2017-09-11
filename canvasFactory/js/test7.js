/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-11 10:31:01 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-11 11:10:24
 */

 var canvas = document.getElementById('ball'),
     context = canvas.getContext('2d');

     var ball = new Ball(0,0,5,0.1);


    
function animate(){
    // context.clearRect(0,0,800,800);
    ball.updateVy();    
    ball.updatePosition();
    ball.paint(context);
    requestNextAnimationFrame(animate);
}


animate();