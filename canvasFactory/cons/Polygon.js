/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-18 11:30:20 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-19 09:42:33
 * 多边形对象
 */

var Point = function (x, y) {
    this.x = x;
    this.y = y;
};

var Polygon = function () {
    this.points = [];
    this.strokeStyle = 'blue';
    this.fillStyle = 'white';
};

Polygon.prototype = new Shape();

Polygon.prototype.getAxes = function () {
    var v1 = new Vector(),
        v2 = new Vector(),
        axes = [];


    for (var i = 0; i < this.points.length - 1; i++) {
        v1.x = this.points[i].x;
        v1.y = this.points[i].y;

        v2.x = this.points[i + 1].x;
        v2.y = this.points[i + 1].y;


        axes.push(v1.edge(v2).normal());

        return axes;
    }

}

