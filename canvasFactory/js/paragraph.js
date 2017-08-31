/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-08-31 09:25:53 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-08-31 09:52:16
 * 段落对象
 */

paragraph = function (context, left, top, imagedata, cursor) {
    this.context = context;
    this.left = left;
    this.top = top;
    this.drawingSurface = imagedata;
     this.cursor = cursor;
    this.lines = [];
    this.activeLine = undefined;
    this.blinkingInterval = undefined;
}



paragraph.prototype = {
    addLine:function(line){
          this.lines.push(line);
          this.activeLine = line;
          this.moveCursor(line.left,line.bottom)
    },
    moveCursor:function(){
        this.cursor.erase(this.context,this.drawingSurface);
        htis.cursor.draw(this.context,x,y);
         
    }    

}