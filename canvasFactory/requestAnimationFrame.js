/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-04 09:45:05 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-04 23:24:21
 */

window.requestNextAnimationFrame = (function () {
    var originalWebkitMethod,
        wrapper = undefined,
        callback = undefined,
        geckoVersion = 0,
        userAgent = navigator.userAgent,
        index = 0,
        self = this;

    //避免 chrome10的bug 在第一次调用 window。requestAnimationFrame时 不会chuantime值

    if (window.webkitRequestAnimationFrame) {
        wrapper = function (time) {
            if (time === undefined) {
                time = +new Date();

            }
            self.callback(time)
        };


        originalWebkitMethod = window.webkitRequestAnimationFrame;

        window.wekitRequestAnimationFrame = function (callback, element) {
            self.callback = callback;

            originalWebkitMethod(wrapper, element);
        }
    }

    if(window.mozRequestAnimationFrame){
        index = userAgent.indexOf('rv:');
        
        if(userAgent.indexOf('Gecko')!=-1){
            
        }
    }




})