var canvas = document.getElementById('haha'),
    context = canvas.getContext('2d');


R_W = 100;
R_H = 100;

// context.translate(canvas.width/2,canvas.height/2);// 切换 坐标系
context.fillStyle = "#000";
    context.fillRect(0, 0, 800, 800);


function getLocation(x, y) {
    return {
        x: (x - canvas.getBoundingClientRect().left) > 0 ? (x - canvas.getBoundingClientRect().left) : 0,
        y: (y - canvas.getBoundingClientRect().top) > 0 ? (y - canvas.getBoundingClientRect().top) : 0,
    }
}


canvas.onmousemove = function (e) {
    var loc = {
        x: e.clientX,
        y: e.clientY
    }
    var mouseToWindow = getLocation(loc.x, loc.y);
    // console.log(mouseToWindow.x);
    context.save();
    context.beginPath();
    context.arc(mouseToWindow.x, mouseToWindow.y, 10, 0, Math.PI * 2,false);
    context.clip();
    context.fillStyle = "#fff";
    context.fillRect(0, 0, 800, 800);
    context.restore();

}