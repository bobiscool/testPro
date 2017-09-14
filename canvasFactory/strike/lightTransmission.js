var canvas = document.getElementById('ball')
canvas.width = 800;
canvas.height = 800;
var context = canvas.getContext('2d');

var bu = new Bucket(600, 600);
var ball = new Ball(0, 600);

 function getLocation(x, y) {
    return {
        x: (x - canvas.getBoundingClientRect().left) > 0 ? (x - canvas.getBoundingClientRect().left) : 0,
        y: (y - canvas.getBoundingClientRect().top) > 0 ? (y - canvas.getBoundingClientRect().top) : 0,
    }
}

canvas.onclick = function(e){
    var loc = getLocation(e.clientX,e.clientY);
    let _temVx = 10/Math.sqrt(1+Math.pow((loc.y/loc.x),2));
    let _temVy = - Math.sqrt(100-Math.pow(_temVx,2));
    ball = new Ball(0,600,_temVx,_temVy);   
}


function animate(time) {
    context.clearRect(0,0,canvas.width,canvas.height);
    ball.updatePosition()
    ball.updateVy()
    ball.paint(context);
    bu.paint(context);
    requestNextAnimationFrame(animate);
}


animate();



