var SpriteAnimator = function(painters,elapsedCallback){
    this.painters = painters||[];
    this.elapsedCallback = elapsedCallback;
    this.duration  =1000;
    this.stratTime =0;
    this.index = 0;
}

SpriteAnimator.prototype={
    
}