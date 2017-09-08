var canvas = document.getElementById('canvas');
canvas.width=800;
canvas.height=800;
var context = document.getElementById('canvas').getContext('2d');


RANDIUS = 75;

ball = new Sprite('ball', {
    paint: function (sprite, context) {
        context.beginPath();
        // context.arc(sprite.left + sprite.width / 2, sprite.top + sprite.height / 2, RANDIUS, 0, Math.PI * 2, false);
        context.arc(sprite.left + sprite.width / 2, sprite.top + sprite.height / 2, RANDIUS, 0, Math.PI * 2, false);
        context.clip();

        context.shadowColor = 'rgb(0,0,0)';
        context.shadowOffsetX = -4;
        context.shadowOffsetY = -4;
        context.shadowBlur = 8;

        context.lineWidth = 2;

        context.strokeStyle = 'rgb(100,100,195)';
        context.fillStyle = "rgb(30,144,255)";


        context.fill();
        context.stroke();

    }
});

ball.left = 320;
ball.top = 160;

ball.paint(context);
