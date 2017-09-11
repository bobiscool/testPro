/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-11 14:06:42 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-11 15:45:37
 * 缓动效果 动画控制器 
 */
Stopwatch.prototype = {
    startTime:0,
    running:fasle,
    elapased: undefined,
    elapasedTime: 0,
    DEFAULT_ELASTIC_PASSES:3,
    start:function(){
        this.startTime = +new Date();
        this.elapasedTime = undefined;
        this.running = true;
    },

    stop:function(){
        this.elapsed =(+new Date())-this.startTime;
        this.running = false;
    },

    getElapsedTime:function(){
        if(this.running){
            return (+new Date()) - this.startTime;
        }else{
            return this.elapsed;
        }
    },
    isRunning:function(){
        return this.running;
    },
    reset: function(){
        this.elapsed = 0;
    }
}




var ANIMATION_DURATION = 1000;

// animationTimer = new

AnimationTimer = function(duration,timeWrap){
  if(timeWrap!==undefined) this.timeWrap = timeWrap;
  if(duration!==undefined) this.duration = duration;
  
  this.stopwatch = new Stopwatch();
}

AnimationTimer.prototype = {
    start:function(){
        this.stopwatch.start();
    },
    stop:function(){
        this.stopwatch.stop();
    },
    getElapsedTime:function(){
        var elapasedTime = this.stopwatch.getElapsedTime(),
        percentComplete = elapasedTime/this.duration;

        if(!this.stopwatch.running) return undefined;
        if(this.timeWrap === undefined) return elapasedTime;

        return elapasedTime*(this.timeWrap(percentComplete)/percentComplete);
    },
    isRunning:function(){
        return this.stopwatch.running;
    },
    idOver:function(){
        return this.stopwatch.getElapsedTime() > this.duration;
    },
    /**
     * 以下是缓动函数
     */
    makeEaseIn:function(strength){
         return function(percentComplete){
               return Math.pow(percentComplete,strength*2)
         }
    },
    makeEaseOut:function(){
         return function(percentComplete){
              return 1 - Math.pow(1 - percentComplete,strength*2);
         }
    }



}