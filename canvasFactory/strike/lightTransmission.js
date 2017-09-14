var canvas = document.getElementById('ball')
canvas.width = 800;
canvas.height = 800;
var context = canvas.getContext('2d');

var bu = new Bucket(100, 100);
var ball = new Ball(0, 0);



function animate(time) {
    ball.updatePosition()
    ball.updateVy()
    ball.paint(context);
    bu.paint(context);


}




