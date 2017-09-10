var SpriteAnimator = function (painters, elapsedCallback) {
    this.painters = painters || [];
    this.elapsedCallback = elapsedCallback;
    this.duration = 1000;
    this.stratTime = 0;
    this.index = 0;
}

SpriteAnimator.prototype = {
    end: function (sprite, originalPainter) {
        sprite.animating = false;
        if(this.elapsedCallback)this.elapsedCallback(sprite);
        else                    sprite.painter = originalPainter;
    },
    start:function(sprite,duration){
        var endTime = +new Date()+duration;
        period = duration/(this.painter.length);
        animator = this;
        originalPainter = sprite.painter;
        lastUpdate = 0;

        this.index = 0;
        sprite.painter = this.painters[this.index];
        requestNextAnimationFrame(function spriteAnimationAnimate(time){
            if(time < endTime){
                if((time - lastUpdate)>period){
                    sprite.painter = animator.painters[++animator.index];
                    lastUpdate = time;
                }
                requestNextAnimationFrame(spriteAnimationAnimate);
            }else{
                animator.end(sprite,originalPainter);
            }
        })
    }
}