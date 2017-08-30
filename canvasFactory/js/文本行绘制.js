var canvas = document.getElementById('haha'),
    context = canvas.getContext('2d');
var line, blinkingInterval;
var drawingSurfaceImageData;
var cursor = new TextCursor();

function saveSurfaceImageData() {
    drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.height);
    console.log(drawingSurfaceImageData);
}


function getLocation(x, y) {
    return {
        x: (x - canvas.getBoundingClientRect().left) > 0 ? (x - canvas.getBoundingClientRect().left) : 0,
        y: (y - canvas.getBoundingClientRect().top) > 0 ? (y - canvas.getBoundingClientRect().top) : 0,
    }
}

saveSurfaceImageData();
function moveCursor(loc) {
    context.putImageData(drawingSurfaceImageData,0,0);
    cursor.draw(context, loc.x, loc.y);
    blinkCursor(loc)
}

function blinkCursor(loc) {
    clearInterval(blinkingInterval);
    blinkingInterval = setInterval(function (e) {
        cursor.erase(context, drawingSurfaceImageData);
        setTimeout(function (e) {
            if (cursor.left == loc.x && cursor.top + cursor.getHeight(context) == loc.y) {
                cursor.draw(context, loc.x, loc.y);

            }
            //  cursor.draw(context,loc.x,loc.y);
            //  console.log(';;;')

            // console.log(cursor.left, loc.x);

        }, 200)
    }, 500)
}



canvas.onmousedown = function (e) {
    var loc = getLocation(e.clientX, e.clientY);
    moveCursor(loc);
}