var canvas = document.getElementById('haha'),
    context = canvas.getContext('2d');
var ball = {
    x: 150,
    y: 250,
    lastX: 150,
    lastY: 250,
    vX: -3.2,
    vY: 3.5,
    r: 35
},
    width = context.canvas.width,
    height = context.canvas.height;


function update() {
    if (ball.x + ball.vX + ball.r > width || ball.x < 0 + ball.vX - ball.r < 0) {

        ball.x = -ball.x;
    }

    if (ball.y + ball.vY + ball.r > height || ball.y < 0 + ball.vY - ball.r < 0) {y
        ball.y = -ball.y;
    }

    ball.x +=ball.vX;
    ball.y +=ball.vY;
}


function draw(){

context.save();
context.beiginPath();
context.arc(ball.x,ball.y,ball.r,0,Math.PI*2,false);
context.fillStyle="#000";
context.fill();
contex.restore();
}



function animate(time){
    context.clearRect(0,0,width,height);
    update();
    draw();
    window.requetNestAnimationFrame(animate);
}

animate();