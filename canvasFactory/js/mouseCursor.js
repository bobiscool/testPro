var canvas = document.getElementById('haha'),
    context = canvas.getContext('2d');

    TextCursor = function(){
        this.fillStyle = fillStyle||'rgba(0,0,0,0.5)';
        this.width = width||2;
        this.left = 0;
        this.top = 0;
    }

    TextCursor.prototype = {
        getHeight :function(){
            var h=context.measureText('W').width;
            return h+h/6;
        }
    }