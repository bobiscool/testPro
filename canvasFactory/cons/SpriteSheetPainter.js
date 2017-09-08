/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-08 10:16:33 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-08 10:29:01
 */

 /**
  * 而把不同的命令 -不同的动画 那是命令模式的应用 
  * 把一个动画里面要素分解为不同的对象  是策略模式的一种应用  
  * 
  * 
  * 
  *
  */

var SpriteSheetPainter = function (cells) {
    this.cells = cells || [];
    this.cellIndex = 0;
}

SpriteSheetPainter.prototype = {
    advance: function () {
        if (this.cellIndex = this.cells.length - 1) {
            this.cellIndex = 0;
        } else {
            this.cellIndex++;
        }
    },
    paint: function (sprite, context) {
        var cell = this.cells[this.cellIndex];
        context.drawImage(spriteSheet, cell.x, cell.y, cell.w, cell.h, sprite.left, sprite.top, cell.w, cell.h);
    }
}