/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-08-31 09:25:53 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-08-31 18:12:26
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
    addLine: function (line) {
        this.lines.push(line);
        this.activeLine = line;
        this.moveCursor(line.left, line.bottom)
    },
    moveCursor: function () {
        this.cursor.erase(this.context, this.drawingSurface);
        this.cursor.draw(this.context, x, y);
        this.blinkCursor(x, y);
    },
    moveCursorCloseTo: function () {
        var line = this.getLine(y);// 获取在第几行
        if (line) {
            line.caret = this, getColumn(line, x);
            this.active
        }
    },
    insert: function (text) {
        var t = this.activeLine.text.substring(0, this.activeLine.caret),
            w = this.activeLine.measureText(t).width;

        this.activeLine.erase(this.context, this.drawingSurface);
        this.activeLine.insert(text);
        this.moveCursor(this.activeLine.left + w, this.activeLine.bottom);
        this.activeLine.draw(this.context);
    },
   newline:function(){
       var textBeforeCursor = this.activeLine.text.substring(0,this.activeLine.caret),
       textAfterCursor = this.activeLine.text.substring(this.activeLine.caret),
       height = this.context.measureText('W').width+this.context.measureText('W').width/6;
       bottom = this.activeLine.bottom + height,
       activeIndex,
       line;

       this.erase(this.context,this.drawingSurface);
       //擦除掉文本行
       this.activeLine.text = textBeforeCursor;
       // 记录下以前的文字 
       // 新建一个文本行

       line = new Textline(this.activeLine.left,bottom);
       line.insert(textAfterCursor);

       activeIndex = this.lines.indexOf(this.activeIndex);
       for(var i = activeIndex+1;i<this.lines.length;++i){
           line = this.lines[i];
           line.bottom +=height;
       }
   } 

}