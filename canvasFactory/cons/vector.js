/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-15 10:07:55 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-15 15:18:56
 * 向量对象
 */

function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype = {
    getMagnitude() {
        // 获取向量长度 get vector length
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    },
    add: function (vector) {
        // 向量相加  vector add
        var _tem = new Vector(0, 0);
        _tem.x = this.x + vector.x;
        _tem.y = this.y + vector.y;

        return _tem;
    },
    substract: function (context) {
    // 向量 相减 vector substract
        var _tem = new Vector(0, 0);
        _tem.x = this.x - vector.x;
        _tem.y = this.y - vector.y;

        return _tem;
    },
    pointProduct:function(vector){
     // 点乘  point multiple

     return this.x*vector.x + this.y*vector.y;
    },
    crossProduct:function(){
      // 叉乘  
    },
    perpendicular:function(){
    // 获取向量的垂直向量
        var v = new Vector(0,0);
        v.x = this.y;
        v.y = 0 - this.x;
        return v;
    },
    nomalize:function(){
        // 获取单位向量
        var v = new Vector(0,0),
            m = this.getMagnitude();

            if(m != 0){
                v.x = this.x/m;
                v.y = this.y/m;
            }

            return v;
    },
    nomal:function(){
        // 获取 垂直 向量的单位向量
        var p = this.perpendicular();
        return p.nomalize();
    }


}

