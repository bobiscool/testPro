var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),

    eraseAllbutton = document.getElementById('eraseAllButton'),
    strokeStyleSelect = document.getElementById('strokeStyleSelect'),
    guideWireCheckBox = document.getElementById('guidewireCheckbox'),
    instructions = document.getElementById('instructions'),

    A_M = 40,
    H_T_S = 10,
    V_T_S = 10,
    T_S = 10,

    A_O = {
        x: A_M,
        y: canvas.height - A_M
    },
    A_T = A_M,
    A_W = canvas.width - A_M,
    A_H = A_O.y - A_T,

    N_V_T_T = A_H / V_T_S,
    N_H_T = A_W / H_T_S,

    G_S_S = 'lightblue',
    G_S = 10,

    C_P_R = 5,
    C_P_S_S = 'blue',
    C_P_F_S = 'rgba(255,255,0,0.5)',

    E_P_S_S = 'navy',
    E_P_F_S = 'rgba(0,255,0,0.5)',

    G_S_S = 'rgba(0,0,230,0.4)',
    drawImageData,
    mousedown = {},
    rubberbandRect = {},

    dragging = false,
    draggingPoint = false,

    endPoints = [{}, {}],
    controlPoints = [{}, {}],
    editing = false;
console.log(guideWireCheckBox);
var guidewires = guideWireCheckBox.checked;


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

function windowToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)//这一个比值看得我云里雾里
    }
}

function saveDrawingSurface() {
    drawImageData = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreDrawingSurface() {
    context.putImageData(drawImageData, 0, 0);
}

//拖动框 部分

function updateRubberbandReactangle(loc) {
    rubberbandRect.width = Math.abs(loc.x - mousedown.x);
    rubberbandRect.height = Math.abs(loc.y - mousedown.y);
    loc.x > mousedown.x ? rubberbandRect.left = mousedown.x : rubberbandRect.left = loc.x;
    loc.y > mousedown.y ? rubberbandRect.top = mousedown.y : rubberbandRect.top = loc.y;
}

function drawBezierCurve() {
    context.beginPath();
    context.moveTo(endPoints[0].x, endPoints[0].y);
    context.bezierCurveTo(controlPoints[0].x, controlPoints[0].y,
        controlPoints[1].x, controlPoints[1].y,
        endPoints[1].x, endPoints[1].y);

    context.stroke();
}


function updateEndAndControlPoints() {
    endPoints[0].x = rubberbandRect.left;
    endPoints[0].y = rubberbandRect.top;

    endPoints[1].x = rubberbandRect.left + rubberbandRect.width;
    endPoints[1].y = rubberbandRect.top + rubberbandRect.height;

    controlPoints[0].x = rubberbandRect.left;
    controlPoints[0].y = rubberbandRect.top + rubberbandRect.height;

    controlPoints[1].x = rubberbandRect.left + rubberbandRect.width;
    controlPoints[1].y = rubberbandRect.top;
}

function drawRubberbandShape(loc){
    updateEndAndControlPoints();
    drawBezierCurve()
}

function updateRubberband(loc){
   updateRubberbandReactangle(loc);
   drawRubberbandShape(loc);
}


function drawRubberbandShape(loc) {
    updateEndAndControlPoints();
    drawBezierCurve();
}


function drawHorizontalBuidewire(x) {
    context.beginPath();
    context.moveTo(x + 0.5,0);
    context.lineTo( x + 0.5,context.canvas.height);
    context.stroke();
}



function drawVerticalGuideWire(y) {
    context.beginPath();
    context.moveTo(0, y + 0.5);
    context.lineTo(context.canvas.width, y + 0.5);
    context.stroke();
}

function drawGuidewires(x, y) {
    drawHorizontalBuidewire(x);
    drawVerticalGuideWire(y);
}

function drawControlPonit(index) {
    context.beginPath();
    context.arc(controlPoints[index].x, controlPoints[index].y, C_P_R, 0, Math.PI * 2, false);
    context.stroke();
    context.fill();
}



function drawControlPonits() {
    context.save();
    context.strokeStyle = C_P_S_S;
    context.fillStyle = C_P_F_S;
    drawControlPonit(0);
    drawControlPonit(1);

    context.stroke();
    context.fill();
    context.restore();

}


function drawEndPoints() {
    context.save();
    context.strokeStyle = E_P_S_S;
    context.fillStyle = E_P_F_S;
    drawEndPonit(0);
    drawEndPonit(1);

    context.stroke();
    context.fill();
    context.restore();

}

function drawEndPonit(index) {
    context.beginPath();
    context.arc(endPoints[index].x, endPoints[index].y, C_P_R, 0, Math.PI * 2, false);
    context.stroke();
    context.fill();
}

function drawControlAndEndPonits() {
    drawControlPonits();
    drawEndPoints();
}

function coursorInEndPoint() {
    var pt;

    endPoints.forEach(function (point) {
        context.beginPath();
        context.arc(point.x, point.y, C_P_R, 0, Math.PI * 2, false);
        /**
         * 难道每次判断之前 必须重绘一下 然后再去判断。。。有点醉啊
         */
        if (context.isPointInPath(loc.x, loc.y)) {
            pt = point;
        }

    });

    //这是干嘛？
    return pt;
}


function cursorInControlPoint(loc) {
    var pt;

    controlPoints.forEach(function (point) {
        context.beginPath();
        context.arc(point.x, point.y, C_P_R, 0, Math.PI * 2, false);
        /**
         * 难道每次判断之前 必须重绘一下 然后再去判断。。。有点醉啊
         */
        if (context.isPointInPath(loc.x, loc.y)) {
            pt = point;
        }

    });

    //这是干嘛？
    return pt;
}

function updateDraggingPoint(loc) {
    draggingPoint.x = loc.x;
    draggingPoint.y = loc.y;
}


//好了 开始 处理canvas点击事件了

canvas.onmousedown = function (e) {
    var loc = windowToCanvas(e.clientX, e.clientY);
    e.preventDefault();

    if (!editing) {
        saveDrawingSurface();
        mousedown.x = loc.x;
        mousedown.y = loc.y;
        updateRubberbandReactangle(loc);
        dragging = true;
    } else {
        draggingPoint = cursorInControlPoint(loc);
        if (!draggingPoint) {
            draggingPoint = cursorInEndPoint(loc);
        }
    }
}


canvas.onmousemove = function (e) {
    var loc = windowToCanvas(e.clientX, e.clientX);
    if (dragging || draggingPoint) {
        e.preventDefault();
        restoreDrawingSurface();

        if (guidewires) {
            drawGuidewires(loc.x, loc.y);
        }
    }

    if (dragging) {
        updateRubberband(loc);
        drawControlAndEndPonits();
    } else if (draggingPoint) {
        updateDraggingPoint(loc);
        drawControlAndEndPonits();
        drawBezierCurve();
    }
}


canvas.onmouseup = function (e) {
    loc = windowToCanvas(e.clientX, e.clientY);

    restoreDrawingSurface();

    if (!editing) {
        updateRubberband(loc);
        drawControlPonits();
        dragging = false;
        editing = true;
        // if( showInstructions){
        //     instru
        // }
    } else {
        if (draggingPoint) drawControlAndEndPonits()
        else editing = false;

        drawBezierCurve();
        draggingPoint = undefined;
    }
}


eraseAllButton.onclick = function (e) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(GRID_STROKE_STYLE, GRID_SPACING, GRID_SPACING);

    saveDrawingSurface();

    editing = false;
    dragging = false;
    draggingPoint = undefined;
};

strokeStyleSelect.onchange = function (e) {
    context.strokeStyle = strokeStyleSelect.value;
};

guidewireCheckbox.onchange = function (e) {
    guidewires = guidewireCheckbox.checked;
};

context.strokeStyle = strokeStyleSelect.value;
drawGird(G_S_S, G_S, G_S);