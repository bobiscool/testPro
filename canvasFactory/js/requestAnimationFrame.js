/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-04 09:45:05 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-05 09:19:51
 */

window.requestNextAnimationFrame = (function () {
    console.log('初始化--')
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
            console.log('webkit');
            self.callback(time)
        };


        originalWebkitMethod = window.webkitRequestAnimationFrame;

        window.wekitRequestAnimationFrame = function (callback, element) {
            self.callback = callback;

            originalWebkitMethod(wrapper, element);
        }
    }

    if (window.mozRequestAnimationFrame) {
        index = userAgent.indexOf('rv:');

        if (userAgent.indexOf('Gecko') != -1) {
            geckoVersion = userAgent.substr(index + 3, 3);
            if (geckoVersion === '2.0') {
                window.mozRequestAnimationFrame = undefined;
            }
        }


    }


    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame || function (callback, element) {
            var start,
                finish;

            window.setTimeout(function () {
                start = +new Date();
                callback(start);
                finish = +new Date();

                self.timeout = 1000 / 60 - (finish - start);
            }, self.timeout)
        }



})();