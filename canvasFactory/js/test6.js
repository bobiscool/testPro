var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    sheetImg = new Image();
var ANIMATION_ID = null;

sheetImg.src = "./js/sheet.png"

var ANIMATION_DURATION = 10000;

var animationTimer = new AnimationTimer(ANIMATION_DURATION, AnimationTimer.prototype.makeEaseIn(1));


// console.log(animationTimer);

var runnerCells = [
    { left: 0, top: 0, width: 47, height: 64 },
    { left: 55, top: 0, width: 44, height: 64 },
    { left: 107, top: 0, width: 39, height: 64 },
    { left: 152, top: 0, width: 46, height: 64 },
    { left: 208, top: 0, width: 49, height: 64 },
    { left: 265, top: 0, width: 46, height: 64 },
    { left: 320, top: 0, width: 42, height: 64 },
    { left: 380, top: 0, width: 35, height: 64 },
    { left: 425, top: 0, width: 35, height: 64 },
],

    runInplace = {
        lastAdvance: 0,
        PAGECLIP_INTERVAL: 100,
        execute: function (sprite, context, time) {
            var elapsed = animationTimer.getElapsedTime();
            // console.log('out - last ',elapsed - this.lastAdvance);
            if (this.lastAdvance == 0) {
                console.log('初始化')
                this.lastAdvance = elapsed;
                   console.log(this.lastAdvance);
                   console.log(elapsed);
            } else if (this.lastAdvance != 0 && elapsed - this.lastAdvance>this.PAGECLIP_INTERVAL){
                sprite.painter.advance();
                // console.log('更新步伐');
                this.lastAdvance = time;
            }



        }
    },
    moveLeftToRight = {
        lastMove: 0,
        execute: function (sprite, context, time) {
            var elapsed = animationTimer.getElapsedTime()
            if (this.lastMove !== 0) {
                sprite.left -= sprite.vX * ((elapsed - this.lastMove) / 1000) ? sprite.vX * ((time - this.lastMove) / 1000) : 0;
                if (sprite.left < 0) {
                    sprite.left = canvas.width;
                }

                //    console.log(sprite.left);
            }
            this.lastMove = elapsed;
        }
    }


sprite = new Sprite('runner', new SpriteSheetPainter(runnerCells), [runInplace, moveLeftToRight]);


animationTimer.start();
function animate(time) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // console.log('time',time);
    context.drawImage(sheetImg, 0, 0);

    sprite.updated(context, time);

    sprite.paint(context, sheetImg);


    ANIMATION_ID =requestAnimationFrame(animate);


    if(animationTimer.isOver()){
        cancelAnimationFrame(ANIMATION_ID);
    }
}

sheetImg.onload = function () {
    context.drawImage(sheetImg, 0, 0);
}

sprite.vX =2;
sprite.top = 200;
sprite.left = 100;

animate();