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

var b = new Polygon(200,200,50,7,0,"#000","red",false);

b.fill(context);