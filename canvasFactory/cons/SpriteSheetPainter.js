/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-08 10:16:33 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-08 10:21:09
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