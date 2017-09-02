/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-08-31 09:25:53 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-02 17:25:21
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
    isPointInside: function (loc) {
        // 是不是 在 paragraph里面
        var c = this.context;

        c.beginPath();
        c.rect(this.left, this.top, this.getWidth(), this.getHeight());
        return c.isPointInPath(loc.x, loc.y);
    },
    getHeight() {
        var h = 0;
        this.lines.forEach(function (element) {
            h += line.getHeight(this.context);
        });

        return h;
    },
    getWidth() {
        var w = 0,
            widest = 0;
        this.lines.forEach(function (line) {
            w = line.getWidth(this.context);
            if (w > widest) {
                widest = w;
            }
        });

        return widest;
    },
    draw: function () {
        this.lines.forEach(function (lines) {
            line.draw(this.context);
        });
    },
    erase: function (context, imagedata) {
        context.putImageData(imagedata, 0, 0);
    },
    blinkCursor: function () {
        var _self = this,
            BLINK_OUT = 200,
            BLINK_INTERVAL = 900;

        this.blinkingInterval = setInterval(function (e) {
            _self.cursor.erase(context, _self.drawingSurface);
            setTimeout(function (e) {
                _self.cursor.draw(context, cursor.left, cursor.top + cursor.getHeight(context));
            }, BLINK_OUT);
        }, BLINK_INTERVAL);

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
    newline: function () {
        var textBeforeCursor = this.activeLine.text.substring(0, this.activeLine.caret),
            textAfterCursor = this.activeLine.text.substring(this.activeLine.caret),
            height = this.context.measureText('W').width + this.context.measureText('W').width / 6;
        bottom = this.activeLine.bottom + height,
            activeIndex,
            line;

        this.erase(this.context, this.drawingSurface);
        //擦除掉文本行
        this.activeLine.text = textBeforeCursor;
        // 记录下以前的文字 
        // 新建一个文本行

        line = new Textline(this.activeLine.left, bottom);
        line.insert(textAfterCursor);

        this.lines.splice(activeIndex + 1, 0, line);
        this.activeLine = line;
        this.activeLine.caret = 0;

        activeIndex = this.lines.indexOf(this.activeIndex);
        for (var i = activeIndex + 1; i < this.lines.length; ++i) {
            line = this.lines[i];
            line.bottom += height;
        }

        this.draw();
        this.cursor.draw(this.context, this.activeLine.left, this.activeLine.bottom);

    },
    getLine: function (y) {
        var line;
        for (i = 0; i < this.lines.length; ++i) {
            line = this.lines[i];
            if (y > line.bottom - line.getHeight(context) && y < line.bottom) {
                return line;
            }

            return undefined;
        }
    },
    backspace: function () {
        var lastActiveline,
            activeIndex,
            t, w;

        this.context.save();

        if (this.activeLine.caret === 0) {
            if (!this.activeLineIsTopLine()) {
                this.erase();
                this.moveUpOneLine();// 向上推退一格
                this.draw();
            }

        } else {
            this.activeLine.erase(this.context, drawingSurfaceImageData);
            this.activeLine.removeCharacterBeforeCaret();

            t = this.activeLine.text.slice(0, this.activeLine.caret);
            w = this.context.measureText(t).width;

            this.moveCursor(this.activeLine.left + w, this.activeLine.bottom);

            this.activeLine.draw(this.context);
        }
        this.context.restore();
    },
    getColumn: function (line, x) {
        var found = false;
        before,
            after,
            tempLine,
            column;

        tempLine = new TextLine(line.left, line.bottom);
        tempLine.insert(line.text);

        while (!found && tempLine.text.length > 0) {
            before = tempLine.left + tempLine.getWidth(context);
            tempLine.removeCharacterBeforeCaret();
            after = tempLine.left + tempLine.getWidth(context);

            if (after < x) {
                closest = x - after < before - x ? after : before;
                column = closest === before ? tempLine.text.length + 1 : tempLine.text.length;
                found = true;
            }
        }

        return column;

        // tempLine = new Text
    },
    activeLineIsOutOfText: function () {
        return this.activeLine.text.length === 0;
    },
    activeLineIsTopLine: function () {
        return this.lines[0] === this.activeLine;
    },
    moveUpOneLine: function () {
        var lastActiveText, line, before, after;

        lastActiveline = this.activeLine;
        lastActiveText = '' + lastActiveline.text;

        activeIndex = this.lines.indexOf(this.activeLine);

        this.activeLine = this.lines[activeIndex - 1];
        this.activeLine.caret = this.activeLine.text.length;;

        this.lines.splice(activeIndex, 1);

        this.moveCursor(this.activeLine.left, this.activeLine.getWidth(this.context), this.activeLine.bottom);

        this.activeLine.text += lastActiveText;
        
        for(var i=activeIndex;i<this.lines.length;++i){
            line = this.lines[i];
            line.bottom -= line.getHeight(this.context);
        }

    }

}