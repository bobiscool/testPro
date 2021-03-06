Textline = function (x, y) {
    this.text = '';
    this.left = x;
    this.bottom = y;
    this.caret = 0;
    console.log('初始化 textline')
}

Textline.prototype = {
    insert: function (text) {
        this.text = this.text.substr(0, this.caret) + text +
            this.text.substr(this.caret);
        console.log(this.text);
        this.caret += text.length;
    },
    removeCharacterBeforeCaret: function () {

        if (this.caret === 0) {
            return;
        }

        this.text = this.text.substring(0, this.caret - 1) + this.text.substring(this.caret);
        this.caret--;
        console.log('--', this.caret);
    },
    getWidth: function (context) {
        return context.measureText(this.text).width;
    },
    getHeight(context) {
        var h = context.measureText('W').width;
        return h + h / 6;
    },
    draw: function () {
        context.save();
        context.textAlign = 'start';
        context.textBaseline = 'bottom';
        context.strokeText(this.text, this.left, this.bottom);
        context.fillText(this.text, this.left, this.bottom);
        context.restore();
    },
    erase: function (context, imageData) {
        context.putImageData(imageData, 0, 0);
    }

}