/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-11 14:06:42 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-12 15:01:11
 * 缓动效果 动画控制器 
 */

function Stopwatch() {
    this.startTime= 0;
    this.running=false;
    this.elapased=undefined;
    this.elapasedTime=0;
    this.DEFAULT_ELASTIC_PASSES=3;
}

Stopwatch.prototype = {
    start: function () {
        this.startTime = +new Date();
        this.elapasedTime = undefined;
        this.running = true;
    },

    stop: function () {
        this.elapsed = (+new Date()) - this.startTime;
        this.running = false;
    },

    getElapsedTime: function () {
        
      
        if (this.running) {
            var _tem =(+new Date()) - this.startTime;
            console.log(_tem)
            return (_tem>1)&&!isNaN(_tem)?_tem:0;
        } else {
            return this.elapsed;
        }
    },
    isRunning: function () {
        return this.running;
    },
    reset: function () {
        this.elapsed = 0;
    }
}




var ANIMATION_DURATION = 1000;

// animationTimer = new

AnimationTimer = function (duration, timeWrap) {
   this.timeWrap = timeWrap?timeWrap:null;
    this.duration = duration?duration:1000;
    this.stopwatch = new Stopwatch();
   
}

AnimationTimer.prototype = {
    start: function () {
        this.stopwatch.start();
    },
    stop: function () {
        this.stopwatch.stop();
    },
    getElapsedTime: function () {
        var elapsedTime = this.stopwatch.getElapsedTime(),
            percentComplete = elapsedTime / this.duration;
   
            
        console.log('elapsedTime',elapsedTime);
        if (!this.stopwatch.running) return undefined;
        if (this.timeWrap === undefined) return elapsedTime;

        /**
         * here we calculate time distorted 
         * the percent i come to 
         * the time I distorted to pass
         */


         //HERE IS THE KEY POINT !!
        return percentComplete?elapsedTime * (this.timeWrap(percentComplete) / percentComplete):0;
    },
    isRunning: function () {
        return this.stopwatch.running;
    },
    isOver: function () {
        return this.stopwatch.getElapsedTime() > this.duration;
    },
    makeEaseIn: function (strength) {
        return function (percentComplete) {
            return Math.pow(percentComplete, strength * 2)
        }
    },
    makeEaseOut: function (strength) {
        return function (percentComplete) {
            return 1 - Math.pow(1 - percentComplete, strength * 2);
        }
    }

}