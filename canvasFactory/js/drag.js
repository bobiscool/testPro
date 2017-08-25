var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),

    eraseAllbutton = document.getElementById('easeAllButton'),
    strokeStyleSelect = document.getElementById('strokeStyleSelect'),
    guideWireCheckBox = document.getElementById('guideWireCheckBox'),
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
    editing = false,
    guidewires = guideWireCheckBox.checked;


function drawGird(color,stepx,stepy) {
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

function windowToCanvas(x,y){
    var bbox = canvas.getBoundingClientRect();
    return {
        x:x-bbox.left*(canvas.width/bbox.width),
        y:y-bbox.top*(canvas.height/bbox.height)//这一个比值看得我云里雾里
    }
}

function saveDrawingSurface(){
    drawImageData = context.getImagedata(0,0,canvas.width,canvas.height);
}

function restoreDrawingSurface(){
    context.putImageData(drawImageData,0,0);
}

//拖动框 部分

function updateRubberbandReactangle(loc){
    rubberbandRect.width = Math.abs(loc.x - mousedown.x);
    rubberbandRect.height = Math.abs(loc.y - mousedown.y);
    
}



