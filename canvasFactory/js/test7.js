/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-11 10:31:01 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-11 11:27:12
 */

 var canvas = document.getElementById('ball'),
     context = canvas.getContext('2d');

     var ball = new Ball(0,0,5,0.1);
     


 function getLocation(x, y) {
    return {
        x: (x - canvas.getBoundingClientRect().left) > 0 ? (x - canvas.getBoundingClientRect().left) : 0,
        y: (y - canvas.getBoundingClientRect().top) > 0 ? (y - canvas.getBoundingClientRect().top) : 0,
    }
}


canvas.onclick = function(e){
    var loc = getLocation(e.clientX,e.clientY);
    let _temVx = 10/Math.sqrt(1+Math.pow((loc.y/loc.x),2));
    let _temVy = Math.sqrt(100-Math.pow(_temVx,2));
    ball = new Ball(0,0,_temVx,_temVy);   
}
     

    
function animate(){
    // context.clearRect(0,0,800,800);
    ball.updateVy();    
    ball.updatePosition();
    ball.paint(context);
    requestNextAnimationFrame(animate);
}


animate();