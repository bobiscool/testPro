/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-19 12:47:19 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-19 15:00:09
 * calc.js
 * 用于计算的js库
 */

 var expRank = {
     "/":1,
     "*":1,
      "+":2,
      "-":2
 }


function Calc(exp){
  
}



function _Calc(exp){
 // Calc 随身携带的包
   this.exp = exp;
   this.rightStack = [];
   //左右两边的栈
   this.leftStack = [];
}


_Calc.prototype = {
    _init:function(exp){
        //初始化解析
        
    },

}