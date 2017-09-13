/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-13 10:05:58 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-13 10:20:11
 * 绘制椭圆
 */


function Ellipse(context, x, y, a, b) {
    var step = (a > b) ? 1 / a : 1 / b;
    context.beginPath();
    context.moveTo(x + a, y);
    for (var i = 0; i < 2 * Math.PI; i += step) {
        context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
    }

    context.closePath();
    context.fill();
}