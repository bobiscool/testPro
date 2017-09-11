/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-11 14:06:42 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-11 14:43:01
 * 缓动效果 动画控制器 
 */
Stopwatch.prototype = {
    startTime:0,
    running:fasle,
    elapased: undefined,
    elapasedTime: 0,
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
        
    }
}