var canvas = document.getElementById('haha'),
    context = canvas.getContext('2d');
var line, blinkingInterval;
var drawingSurfaceImageData;
var cursor = new TextCursor();

function saveSurfaceImageData() {
    drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.height);
    // console.log(drawingSurfaceImageData);
}


function getLocation(x, y) {
    return {
        x: (x - canvas.getBoundingClientRect().left) > 0 ? (x - canvas.getBoundingClientRect().left) : 0,
        y: (y - canvas.getBoundingClientRect().top) > 0 ? (y - canvas.getBoundingClientRect().top) : 0,
    }
}

saveSurfaceImageData();
function moveCursor(loc) {
    console.log('换位置');
    context.putImageData(drawingSurfaceImageData, 0, 0);
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
    console.log('闪呀闪');

        }, 200)
    }, 500)
}



canvas.onmousedown = function (e) {
    var loc = getLocation(e.clientX, e.clientY);

    // 创建 文字 
    line = new Textline(loc.x, loc.y);
    moveCursor(loc);
}


document.onkeydown = function (e) {
    if (e.keyCode == 8 || e.keyCode == 13) {
        e.preventDefault();
    }
    // console.log(e.keyCode);

    if (e.keyCode == 8) {
        context.save();

        line.erase(context, drawingSurfaceImageData);
        line.removeCharacterBeforeCaret();// 删除 

        moveCursor({x:line.left + line.getWidth(context),y:line.bottom});
        line.draw(context);
        context.restore();
    }
}


document.onkeypress = function (e) {
    var key = String.fromCharCode(e.which);
    if (e.keyCode !== 8 && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        context.save();

        line.erase(context, drawingSurfaceImageData);
        line.insert(key);
        console.log(line.bottom);

        moveCursor({x:line.left + line.getWidth(context),y:line.bottom});
        context.shadowColor = 'rgba(0,0,0,0.5)';
        // context.shadowOffsetX = 1;
        // context.shadowOffsety = 1;
        // context.shadowBlur = 2;
        line.draw(context);
        context.restore();
    }


}