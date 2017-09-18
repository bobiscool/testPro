/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-15 15:29:40 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-18 10:58:51
 * 形状对象 
 * 
 */

function Shape() {
    this.x = undefined;
    this.y = undefined;
    this.strokeStyle = "rgba(255,253,208,0.9)";
    this.fillStyle = "rgba(147,197,114,0.8)";
}


Shape.prototype = {
    //碰撞 检测

    collidesWith: function (shape) {
        var axes = this.getAxes().concat(shape.getAxes());
        return !this.separationOnAxes(axes, shape);
    },
    separationOnAxes: function (axes, shape) {
        // 检测两个 投影 是否重叠
        for (var i = 0; i < axes.length; ++i) {
            axis = axes[i];
            projection1 = shape.project(axis);
            projection2 = shape.project(axis);

            if (!projection1.overlaps(projection2)) {
                return true;
            };

        }
    },

}