var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    sheetImg = new Image();


    sheetImg.src = "./js/sheet.png"


    var runnerCells = [
          { left: 0,   top: 0, width: 47, height: 64 },
      { left: 55,  top: 0, width: 44, height: 64 },
      { left: 107, top: 0, width: 39, height: 64 },
      { left: 152, top: 0, width: 46, height: 64 },
      { left: 208, top: 0, width: 49, height: 64 },
      { left: 265, top: 0, width: 46, height: 64 },
      { left: 320, top: 0, width: 42, height: 64 },
      { left: 380, top: 0, width: 35, height: 64 },
      { left: 425, top: 0, width: 35, height: 64 },
    ],

    runInplace = {
        lastAdvance:0,
        PAGECLIP_INTERVAL:100,
        execute:function(sprite,context,time){
                   if(time - this.lastAdvance > this.PAGECLIP_INTERVAL){
                       sprite.painter.advance();
                       this.lastAdvance = time;
                   }
        }
    },
    moveLeftToRight={
        lastMove:0,
        execute:function(sprite,context,time){
           if(this.lastMove !==0){
               sprite.left -=sprite.vX*((time - this.lastMove)/1000);
               if(sprite.left < 0){
                   sprite.left = canvas.width;
               }
           }

           this.lastMove = time;
        }
    }


    sprite = new Sprite('runner',new SpriteSheetPainter(runnerCells),[runInplace,moveLeftToRight]);