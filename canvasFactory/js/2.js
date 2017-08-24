var canvas = document.getElementById('haha')
canvas.width = 800;
canvas.height = 800;
var context = canvas.getContext('2d');
context.fillStyle = "blue";
context.shadowOffsetX = 2;
context.shadowOffsetY = 2;
context.shadowBlur = 4;

context.lineWidth = 20;
context.lineCap='round';
context.beginPath();
context.moveTo(120,130);
context.bezierCurveTo(16,130,300,170,10,280)

context.stroke();