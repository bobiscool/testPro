var canvas = document.getElementById('haha')
canvas.width = 800;
canvas.height = 800;
var context = canvas.getContext('2d'),

    C_R = 100,
    C_S_S = 'rgba(0,0,0,0.5)',
    C_F_S = 'rgba(90,190,240,0.6)',

    R_I_R = 35,
    R_O_R = 55,



    A_F_S = 'rgba(0,0,230,0.9)',
    A_T_S = 'rgba(100,140,230,0.7)',
    T_W = 10,
    T_L_S_S = 'rgba(100,140,230,0.9)',
    T_S_S_S = 'rgba(100,140,230,0.7)',

    T_D_S_S = 'rgba(100,140,230,0.5)',

    G_S_S = 'goldenrod',

    G_F_S = 'rgba(250,250,0,0.6)',

    circle = {
        x: canvas.width / 2,
        y: canvas.width / 2,
        radius: 150
    };


var loc = {
    x: circle.x,
    y: circle.y
}

function drawGird(color, stepx, stepy) {
    context.save();
    context.shadowColor = undefined;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.strokeStyle = color;
    context.fillStyle = '#ffffff';
    context.lineWidth = 0.5;
    // context.fillRect(0, 0, context.canvas.width / 2, context.canvas.height / 2);

    for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, context.canvas.height);
        context.stroke();
    }

    for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(context.canvas.width, i);
        context.stroke();
    }

    context.restore();
}

// drawGird("red",50,20);

function drawDial() {

    drawCentriod();
    drawCentriodGuiwire();
    drawRing();
    drawTicksInnerCircle();
    drawTicks();
    drawAnnotations();
}

function drawCentriod() {
    context.beginPath();
    context.save();
    context.strokeStyle = C_S_S;
    context.fillStyle = C_F_S;
    context.arc(circle.x, circle.y, C_R, 0, Math.PI * 2, false);
    context.stroke();
    context.fill();
    context.restore()
}

function drawCentriodGuiwire() {
    var angle = -Math.PI / 4,
        radius, endpt;

    radius = circle.radius + R_O_R;
    if (loc.x >= loc.y) {
        endpt = {
            x: circle.x + radius * Math.cos(angle),
            y: circle.y + radius * Math.sin(angle)
        };
    } else {
        endPt = {
            x: circle.x - radius * Math.cos(angle),
            y: circle.y - radius * Math.sin(angle)
        }
    }

    context.save();

    context.strokeStyle = G_S_S;
    context.fillStyle = G_F_S;
    context.beginPath();
    context.moveTo(circle.x, circle.y);
    context.lineTo(endpt.x, endpt.y);
    context.stroke()

    context.beginPath();
    context.strokeStyle = T_L_S_S;
    context.arc(endpt.x, endpt.y, 5, 0, Math.PI * 2, false);
    context.fill();

    context.restore();
}


function drawRing() {
    drawRingOuterCircle();
    context.save();
    context.strokeStyle = 'rgba(0,0,0,0.1)';
    context.arc(circle.x, circle.y, circle.radius + R_I_R, 0, Math.PI * 2, false);
    context.fill();
    context.stroke();
    context.restore();
}

function drawRingOuterCircle() {
    context.shadowColor = "rgba(0,0,0,0.7)";
    context.shadowOffsetX = 3;
    context.shadowOffsetY = 3;
    context.shadowBlur = 6;
    context.strokeStyle = T_D_S_S;
    context.beginPath();
    context.arc(circle.x, circle.y, circle.radius + R_O_R, 0, Math.PI * 2, true);
    context.stroke();
    context.restore();
}

function drawTicksInnerCircle() {
    context.save();
    context.beginPath();
    context.strokeStyle = "rgba(0,0,0,0.1)";
    context.arc(circle.x, circle.y, circle.radius + R_I_R - T_W, 0, Math.PI * 2, false);
    context.stroke();
    context.restore();
}


function drawTick(angle, radius, cnt) {
    var tickWidth = cnt % 4 === 0 ? T_W : T_W / 2;
    context.beginPath();
    context.moveTo(circle.x + Math.cos(angle) * (radius - tickWidth), circle.y + Math.sin(angle) * (radius - tickWidth));
    context.lineTo(circle.x + Math.cos(angle) * radius, circle.y + Math.sin(angle) * radius);
    context.strokeStyle = T_S_S_S;
    context.stroke();

}

function drawTicks() {
    var radius = circle.radius + R_I_R,
        A_M = 2 * Math.PI,
        A_D = Math.PI / 64,
        tickWidth;

    for (var angle = 0, cnt = 0; angle < A_M; angle += A_D, cnt++) {
        drawTick(angle, radius, cnt++);
    }
    context.restore();
}


function drawAnnotations() {
    var radius = circle.radius + R_I_R;
    context.save();
    context.fillStyle = A_F_S;
    context.font = A_T_S + 'px Helvetica';

    for (var angle = 0; angle < 2 * Math.PI; angle += Math.PI / 8) {
        context.beginPath();
        context.fillText((angle*180/Math.PI).toFixed(0),circle.x + Math.cos(angle) * (radius - T_W*2), circle.y - Math.sin(angle) * (radius -  T_W*2))
    }

    context.restore();
};

context.shadowColor = 'ragba(0,0,0,0.4)';
context.shadowOffsetX = 2;
context.shadowOffsetY = 2;
context.shadowBlur = 4;

context.textAlign = 'center';
context.textBaseline = 'middle';

drawGird('lightgray',10,10);




drawDial();