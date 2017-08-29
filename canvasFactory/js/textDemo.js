var canvas = document.getElementById('haha'),
    context = canvas.getContext('2d');
var drawingSurfaceImageData;
var cursor = new TextCursor();

function saveSurfaceImageData(){
    drawingSurfaceImageData = context.getImageData(0,0,canvas.width,canvas.height);
    console.log(drawingSurfaceImageData);
}

function getLocation(x, y) {
    return {
        x: (x - canvas.getBoundingClientRect().left) > 0 ? (x - canvas.getBoundingClientRect().left) : 0,
        y: (y - canvas.getBoundingClientRect().top) > 0 ? (y - canvas.getBoundingClientRect().top) : 0,
    }
}

saveSurfaceImageData();
function moveCursor(loc){
    cursor.erase(context,drawingSurfaceImageData);
    cursor.draw(context,loc.x,loc.y);
}

canvas.onmousedown = function(e){
    var loc = getLocation(e.clientX,e.clientY);
    moveCursor(loc);
}