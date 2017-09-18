/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-18 11:30:20 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-18 11:34:13
 * 多边形对象
 */

 var Point = function(x,y){
     this.x = x;
     this.y = y;
 };
 
 var Polygon = function(){
     this.points = [];
     this.strokeStyle = 'blue';
     this.fillStyle = 'white'
 }

 